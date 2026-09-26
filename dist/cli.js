import { convert } from "./converter.js";
// `pnpm start -- ...` の区切り記号は Node にも渡るため取り除く。
const args = process.argv.slice(2).filter((arg) => arg !== "--");
const direction = args[0] === "--from-gl" ? "to-mahjong" : "to-gl";
const text = args.filter((arg) => arg !== "--from-gl" && arg !== "--to-gl").join(" ");
if (!text) {
    console.error("使い方: pnpm start -- '123m 456p 東南西'\n        pnpm start -- --from-gl 'qwezx1'");
    process.exitCode = 1;
}
else {
    console.log(convert(text, direction));
}
