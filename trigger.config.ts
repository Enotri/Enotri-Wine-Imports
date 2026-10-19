import { defineConfig } from "@trigger.dev/sdk";

// Project ref lives in env (cloud.trigger.dev → your project → Project settings → "proj_...")
const project = process.env.TRIGGER_PROJECT_REF;
if (!project) throw new Error("TRIGGER_PROJECT_REF is not set");

export default defineConfig({
  project,
  runtime: "node",
  logLevel: "log",
  maxDuration: 300,
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  dirs: ["./src/trigger"],
});
