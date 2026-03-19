import { exec } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(exec);

async function main() {
  console.log("Buduję projekt...");

  await run("npm run build:docs");
  await run("tsc --module ESNext --outDir dist/esm");
  await run("tsc --module CommonJS --outDir dist/cjs");

  console.log("Build zakończony!");
}

main().catch(err => {
  console.error("Błąd podczas builda:", err);
  process.exit(1);
});