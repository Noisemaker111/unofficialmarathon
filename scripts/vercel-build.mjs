#!/usr/bin/env node
import { spawn } from "node:child_process";

const MAX_DEPLOY_ATTEMPTS = 3;
const INITIAL_RETRY_DELAY_MS = 4000;
const backendCwd = new URL("../packages/backend/", import.meta.url);
const verbose = process.argv.includes("--verbose");

// Check for required env vars
if (!process.env.CONVEX_DEPLOY_KEY) {
  console.error("ERROR: CONVEX_DEPLOY_KEY environment variable is not set");
  console.error("Please set it in your Vercel project settings");
  process.exit(1);
}

console.log("Starting Vercel build with Convex deployment...");
console.log(`Backend directory: ${backendCwd.pathname}`);

function run(command, args, { cwd, env } = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, ...env },
      stdio: "inherit",
      shell: false,
    });

    child.on("close", (code, signal) => {
      resolve({ code: code ?? 1, signal });
    });

    child.on("error", (err) => {
      console.error(`Spawn error: ${err.message}`);
      resolve({ code: 1 });
    });
  });
}

async function runWithRetry(command, args, options = {}) {
  let attempt = 1;

  while (attempt <= MAX_DEPLOY_ATTEMPTS) {
    if (attempt > 1) {
      const delayMs = INITIAL_RETRY_DELAY_MS * 2 ** (attempt - 2);
      console.log(`\nRetrying deploy in ${delayMs / 1000}s (attempt ${attempt}/${MAX_DEPLOY_ATTEMPTS})...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    const result = await run(command, args, options);
    if (result.code === 0) {
      return 0;
    }

    if (attempt === MAX_DEPLOY_ATTEMPTS) {
      return result.code;
    }

    console.log(`Deploy attempt ${attempt} failed with exit code ${result.code}.`);
    attempt += 1;
  }

  return 1;
}

console.log("\n=== Step 1: Convex Codegen ===");
const codegenResult = await run("bunx", ["convex", "codegen"], { cwd: backendCwd });
if (codegenResult.code !== 0) {
  console.error("Codegen failed");
  process.exit(codegenResult.code);
}

console.log("\n=== Step 2: Convex Deploy + Web Build ===");
const deployArgs = [
  "convex",
  "deploy",
  "--cmd-url-env-var-name",
  "VITE_CONVEX_URL",
  "--cmd",
  "bun run --cwd ../../apps/web build",
];

if (verbose) {
  deployArgs.splice(2, 0, "--verbose");
}

const deployExitCode = await runWithRetry("bunx", deployArgs, { cwd: backendCwd });
if (deployExitCode !== 0) {
  console.error("Deploy failed");
}
process.exit(deployExitCode);
