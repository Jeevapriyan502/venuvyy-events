import { readFileSync } from "fs";
import { spawnSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(root, ".env");

function parseEnv(content) {
  const vars = {};
  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

const vars = parseEnv(readFileSync(envPath, "utf8"));
const skip = new Set(["ADMIN_PASSWORD"]);

for (const [key, value] of Object.entries(vars)) {
  if (skip.has(key) || !value) continue;
  console.log(`\n→ ${key}`);
  spawnSync("npx", ["vercel", "env", "rm", key, "production", "-y"], {
    cwd: root,
    stdio: "inherit",
    shell: true,
  });
  const add = spawnSync("npx", ["vercel", "env", "add", key, "production"], {
    cwd: root,
    input: value,
    stdio: ["pipe", "inherit", "inherit"],
    shell: true,
  });
  if (add.status !== 0) {
    console.error(`Failed to set ${key}`);
    process.exitCode = 1;
  }
}

console.log("\nDone. Redeploy with: npx vercel --prod");
