import fs from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";
import { JSDOM } from "jsdom";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// katalog wejściowy i wyjściowy
const SRC = "./";
const OUT = "docs";

// upewnij się, że docs istnieje
if (!fs.existsSync(OUT)) {
  fs.mkdirSync(OUT);
}

// pobierz wszystkie pliki .md z bieżącego katalogu
const files = fs
  .readdirSync(SRC)
  .filter(f => f.endsWith(".md") && !f.startsWith("docs"));

// CSS do wstrzyknięcia
const STYLE = `
  body {
    font-family: system-ui, sans-serif;
    margin: 0;
    padding: 0;
    background: #fafafa;
    color: #222;
  }

  nav {
    background: #222;
    color: white;
    padding: 12px 20px;
    font-size: 18px;
    font-weight: bold;
  }

  main {
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  h1, h2, h3 {
    margin-top: 32px;
  }

  pre {
    background: #1e1e1e;
    color: #eee;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
  }

  code {
    background: #eee;
    padding: 2px 4px;
    border-radius: 4px;
  }

  a.anchor {
    margin-left: 8px;
    text-decoration: none;
    opacity: 0.4;
  }

  a.anchor:hover {
    opacity: 1;
  }
`;

for (const file of files) {
  const inputPath = path.join(SRC, file);
  const outputPath = path.join(OUT, file.replace(".md", ".html"));

  const markdown = fs.readFileSync(inputPath, "utf8");
  const htmlBody = md.render(markdown);

  // Tworzymy DOM
  const html = `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${file}</title>
      <style>${STYLE}</style>
    </head>
    <body>
      <nav>Documentation</nav>
      <main>${htmlBody}</main>
    </body>
    </html>
  `



  // Zapisz wynik
  fs.writeFileSync(outputPath, html);
  fs.writeFileSync("ping.txt", crypto.randomUUID())
  console.log("Generated:", outputPath);
}