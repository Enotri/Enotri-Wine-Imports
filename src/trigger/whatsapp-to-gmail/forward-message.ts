import { AbortTaskRunError, logger, task } from "@trigger.dev/sdk";
import nodemailer from "nodemailer";

// Gmail rejects emails over 25 MB once attachments are encoded (~33% larger), so cap raw files at 18 MB
const MAX_ATTACHMENT_BYTES = 18 * 1024 * 1024;

type KapsoMedia = {
  url?: string;
  filename?: string;
  content_type?: string;
  byte_size?: number;
};

// Kapso webhook payload (v2) for `whatsapp.message.received` — only the fields this task reads
export type WhatsAppMessageEvent = {
  phone_number_id: string;
  message: {
    id: string;
    timestamp: string;
    type: string;
    text?: { body?: string };
    location?: { latitude?: number; longitude?: number; name?: string; address?: string };
    kapso?: {
      direction?: string;
      origin?: string;
      content?: string;
      transcript?: { text?: string };
      media_data?: KapsoMedia;
      message_type_data?: { caption?: string };
    };
  };
  conversation: {
    phone_number: string;
    kapso?: { contact_name?: string };
  };
};

type Attachment = { filename: string; content: Buffer; contentType?: string };

export const forwardWhatsAppMessage = task({
  id: "forward-whatsapp-message",
  run: async (payload: WhatsAppMessageEvent) => {
    const kapsoApiKey = process.env.KAPSO_API_KEY;
    if (!kapsoApiKey) throw new Error("KAPSO_API_KEY is not set");
    const gmailUser = process.env.GMAIL_USER;
    if (!gmailUser) throw new Error("GMAIL_USER is not set");
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    if (!gmailAppPassword) throw new Error("GMAIL_APP_PASSWORD is not set");
    const forwardTo = process.env.FORWARD_TO_EMAIL;
    if (!forwardTo) throw new Error("FORWARD_TO_EMAIL is not set");

    const { message, conversation } = payload ?? {};
    if (!message?.id || !conversation?.phone_number) {
      // Retrying won't fix a malformed payload
      throw new AbortTaskRunError("Payload is not a Kapso whatsapp.message.received event");
    }

    const skipReason = getSkipReason(message);
    if (skipReason) {
      logger.info("Skipping message", { messageId: message.id, reason: skipReason });
      return { forwarded: false, reason: skipReason };
    }

    const contactName = conversation.kapso?.contact_name;
    const sender = contactName ? `${contactName} (${conversation.phone_number})` : conversation.phone_number;

    const lines = [`From: ${sender}`, "", describeMessage(message)];

    const transcript = message.kapso?.transcript?.text;
    if (transcript) lines.push("", `Voice note transcript: "${transcript}"`);

    const attachments: Attachment[] = [];
    const media = message.kapso?.media_data;
    if (media?.url) {
      const filename = media.filename ?? `${message.type}-${message.id}`;
      const file = await downloadMedia(media, kapsoApiKey);
      if (file === "too-large") {
        lines.push("", `${filename} is too large to email. Open it in the WhatsApp Business app.`);
      } else if (!file) {
        lines.push("", `Couldn't attach ${filename}. Open it in the WhatsApp Business app.`);
      } else {
        attachments.push({ filename, content: file, contentType: media.content_type });
      }
    }

    lines.push("", "—", "Forwarded automatically from your WhatsApp Business number.");

    const sentAtSeconds = Number(message.timestamp);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: gmailUser, pass: gmailAppPassword },
    });

    // Same subject per sender, so Gmail threads each person's messages together
    const info = await transporter.sendMail({
      from: `"WhatsApp" <${gmailUser}>`,
      to: forwardTo,
      subject: `WhatsApp: ${sender}`,
      text: lines.join("\n"),
      attachments,
      // Show the time it was sent on WhatsApp, not the time the email went out
      date: sentAtSeconds ? new Date(sentAtSeconds * 1000) : new Date(),
    });

    logger.info("Forwarded to Gmail", {
      messageId: message.id,
      type: message.type,
      attachments: attachments.length,
    });

    return { forwarded: true, emailMessageId: info.messageId };
  },
});

function getSkipReason(message: WhatsAppMessageEvent["message"]): string | undefined {
  if (message.kapso?.direction === "outbound") return "outbound message";
  // Coexistence imports up to 6 months of old chats — don't email those
  if (message.kapso?.origin === "history_sync") return "imported chat history";
  if (message.type === "reaction") return "emoji reaction";
  return undefined;
}

function describeMessage(message: WhatsAppMessageEvent["message"]): string {
  const caption = message.kapso?.message_type_data?.caption;

  switch (message.type) {
    case "text":
      return message.text?.body ?? "";
    case "image":
    case "video":
    case "document":
    case "sticker":
      return caption ?? `(${message.type}, no caption)`;
    case "audio":
      return "(voice note)";
    case "location": {
      const { latitude, longitude, name, address } = message.location ?? {};
      const mapLink =
        latitude !== undefined && longitude !== undefined
          ? `https://maps.google.com/?q=${latitude},${longitude}`
          : undefined;
      return ["(shared location)", name, address, mapLink].filter(Boolean).join("\n");
    }
    default:
      return (
        message.kapso?.content ??
        `(${message.type} message — open the WhatsApp Business app to view it)`
      );
  }
}

async function downloadMedia(
  media: KapsoMedia,
  kapsoApiKey: string
): Promise<Buffer | "too-large" | undefined> {
  if (!media.url) return undefined;
  if ((media.byte_size ?? 0) > MAX_ATTACHMENT_BYTES) return "too-large";

  // Only send the Kapso key to Kapso's own host
  const headers: Record<string, string> =
    new URL(media.url).hostname === "api.kapso.ai" ? { "X-API-Key": kapsoApiKey } : {};

  try {
    const response = await fetch(media.url, { headers });
    if (!response.ok) {
      logger.warn("Media download failed", { status: response.status });
      return undefined;
    }
    const file = Buffer.from(await response.arrayBuffer());
    return file.length > MAX_ATTACHMENT_BYTES ? "too-large" : file;
  } catch (error) {
    // Still email the text rather than lose the whole message over one attachment
    logger.warn("Media download failed", { error: String(error) });
    return undefined;
  }
}
