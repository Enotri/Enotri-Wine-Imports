// Kapso Function (Cloudflare Worker runtime). This file is deployed to Kapso, not Trigger.dev,
// and Kapso Functions only run plain JavaScript, so it is the one non-TypeScript file here.
//
// Kapso webhooks send the raw event, but Trigger.dev's trigger API expects { payload, options }.
// This relay wraps each `whatsapp.message.received` event and passes it to the
// `forward-whatsapp-message` task. It stores no secrets: the Kapso webhook sends the
// Trigger.dev secret key in the X-Trigger-Key header, and Trigger.dev rejects anything else.
async function handler(request, env) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const triggerKey = request.headers.get("X-Trigger-Key");
  if (!triggerKey) {
    return new Response("Missing X-Trigger-Key header", { status: 401 });
  }

  let event;
  try {
    event = await request.json();
  } catch (error) {
    return new Response("Body is not JSON", { status: 400 });
  }

  const messageId = event && event.message && event.message.id;

  const response = await fetch(
    "https://api.trigger.dev/api/v1/tasks/forward-whatsapp-message/trigger",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + triggerKey,
        "Content-Type": "application/json",
      },
      // WhatsApp message ID as the idempotency key, so Kapso's retries never email a message twice
      body: JSON.stringify({
        payload: event,
        options: messageId ? { idempotencyKey: messageId } : {},
      }),
    }
  );

  if (!response.ok) {
    // Any non-200 makes Kapso retry (after 10s, 40s and 90s)
    return new Response("Trigger.dev returned " + response.status, { status: 502 });
  }

  return new Response("OK", { status: 200 });
}
