import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = "pages-dist";

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const html = readFileSync("index.html", "utf8")
  .replace(
    '<script type="module" src="/src/index.js"></script>',
    '<script src="./dist/kc-card.js"></script>'
  );

writeFileSync(join(outDir, "index.html"), html);
cpSync("dist", join(outDir, "dist"), { recursive: true });
cpSync("public", join(outDir, "public"), { recursive: true });
