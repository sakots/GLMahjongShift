import { cp, mkdir } from "node:fs/promises";

await mkdir("dist/web", { recursive: true });
await cp("web/index.html", "dist/web/index.html");
await cp("dist/web.js", "dist/web/web.js");
await cp("dist/converter.js", "dist/web/converter.js");
