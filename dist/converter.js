const suitKeys = {
    m: "qwertyuio",
    s: "asdfghjkl",
    p: "zxcvbnm,."
};
const honors = {
    "東": "1", "南": "2", "西": "3", "北": "4", "白": "5", "發": "6", "発": "6", "中": "7"
};
const specials = {
    "春": "@", "夏": ";", "秋": ":", "冬": "]",
    "梅": "-", "蘭": "^", "竹": "\\", "菊": "[",
    "ジョーカー": "/", "牌の裏": "9",
    "🀦": "@", "🀧": ";", "🀨": ":", "🀩": "]",
    "🀢": "-", "🀣": "^", "🀤": "\\", "🀥": "[",
    "🀪": "/", "🀫": "9"
};
const reverseHonors = {
    "1": "東", "2": "南", "3": "西", "4": "北", "5": "白", "6": "發", "7": "中"
};
const reverseSpecials = {
    "@": "春", ";": "夏", ":": "秋", "]": "冬",
    "-": "梅", "^": "蘭", "\\": "竹", "[": "菊", "/": "ジョーカー", "9": "牌の裏"
};
/**
 * 一般表記を GL-MahjongTile 用のキー文字列へ変換する。
 * `123m` のように数牌をまとめて書ける。大文字のスート (`123M`) は横倒し牌。
 */
export function mahjongToGL(input) {
    // 全角の数字・英字を扱いやすい形にして、入力中の区切りは維持する。
    let result = input.normalize("NFKC");
    result = result.replace(/([1-9]+)([mspMSP])/g, (_all, numbers, suit) => {
        const lowerSuit = suit.toLowerCase();
        const keys = suitKeys[lowerSuit];
        const converted = [...numbers].map((number) => keys[Number(number) - 1]).join("");
        return suit === lowerSuit ? converted : converted.toUpperCase();
    });
    // 長い別名を先に置換し、漢字・Unicode 牌も受け付ける。
    const names = Object.keys(specials).sort((a, b) => b.length - a.length);
    for (const name of names)
        result = result.split(name).join(specials[name]);
    for (const [name, key] of Object.entries(honors))
        result = result.split(name).join(key);
    return result;
}
function decodeSuit(char) {
    const lower = char.toLowerCase();
    for (const [suit, keys] of Object.entries(suitKeys)) {
        const index = keys.indexOf(lower);
        if (index >= 0)
            return { suit, number: String(index + 1), sideways: char !== lower };
    }
    return undefined;
}
/**
 * GL-MahjongTile 用のキー文字列を一般表記へ変換する。
 * 同じスート・向きが連続する数牌は `123m` / `123M` にまとめる。
 */
export function glToMahjong(input) {
    let result = "";
    let run = [];
    const flush = () => {
        if (!run.length)
            return;
        result += `${run.map((tile) => tile.number).join("")}${run[0].sideways ? run[0].suit.toUpperCase() : run[0].suit}`;
        run = [];
    };
    for (const char of input) {
        const tile = decodeSuit(char);
        if (tile) {
            if (run.length && (run[0].suit !== tile.suit || run[0].sideways !== tile.sideways))
                flush();
            run.push(tile);
            continue;
        }
        flush();
        result += reverseHonors[char] ?? reverseSpecials[char] ?? char;
    }
    flush();
    return result;
}
export function convert(input, direction) {
    return direction === "to-gl" ? mahjongToGL(input) : glToMahjong(input);
}
