/** GL-MahjongTile のキーボード入力と一般的な麻雀表記の相互変換。 */
export type Direction = "to-gl" | "to-mahjong";

const suitKeys = {
  m: "qwertyuio",
  s: "asdfghjkl",
  p: "zxcvbnm,."
} as const;

const honors: Record<string, string> = {
  "東": "1", "南": "2", "西": "3", "北": "4", "白": "5", "發": "6", "発": "6", "中": "7"
};

const specials: Record<string, string> = {
  "春": "@", "夏": ";", "秋": ":", "冬": "]",
  "梅": "-", "蘭": "^", "竹": "\\", "菊": "[",
  "ジョーカー": "/", "牌の裏": "9",
  "🀦": "@", "🀧": ";", "🀨": ":", "🀩": "]",
  "🀢": "-", "🀣": "^", "🀤": "\\", "🀥": "[",
  "🀪": "/", "🀫": "9"
};

const reverseHonors: Record<string, string> = {
  "1": "東", "2": "南", "3": "西", "4": "北", "5": "白", "6": "發", "7": "中"
};

const reverseSpecials: Record<string, string> = {
  "@": "春", ";": "夏", ":": "秋", "]": "冬",
  "-": "梅", "^": "蘭", "\\": "竹", "[": "菊", "/": "ジョーカー", "9": "牌の裏"
};

/**
 * 一般表記を GL-MahjongTile 用のキー文字列へ変換する。
 * `123m` のように数牌をまとめて書ける。大文字のスート (`123M`) は横倒し牌。
 */
export function mahjongToGL(input: string): string {
  // 全角の数字・英字を扱いやすい形にして、入力中の区切りは維持する。
  let result = input.normalize("NFKC");

  result = result.replace(/([1-9]+)([mspMSP])/g, (_all, numbers: string, suit: string) => {
    const lowerSuit = suit.toLowerCase() as keyof typeof suitKeys;
    const keys = suitKeys[lowerSuit];
    const converted = [...numbers].map((number) => keys[Number(number) - 1]).join("");
    return suit === lowerSuit ? converted : converted.toUpperCase();
  });

  // 長い別名を先に置換し、漢字・Unicode 牌も受け付ける。
  const names = Object.keys(specials).sort((a, b) => b.length - a.length);
  for (const name of names) result = result.split(name).join(specials[name]);
  for (const [name, key] of Object.entries(honors)) result = result.split(name).join(key);
  return result;
}

type Tile = { suit: keyof typeof suitKeys; number: string; sideways: boolean };

function decodeSuit(char: string): Tile | undefined {
  const lower = char.toLowerCase();
  for (const [suit, keys] of Object.entries(suitKeys) as [keyof typeof suitKeys, string][]) {
    const index = keys.indexOf(lower);
    if (index >= 0) return { suit, number: String(index + 1), sideways: char !== lower };
  }
  return undefined;
}

/**
 * GL-MahjongTile 用のキー文字列を一般表記へ変換する。
 * 同じスート・向きが連続する数牌は `123m` / `123M` にまとめる。
 */
export function glToMahjong(input: string): string {
  let result = "";
  let run: Tile[] = [];
  const flush = () => {
    if (!run.length) return;
    result += `${run.map((tile) => tile.number).join("")}${run[0].sideways ? run[0].suit.toUpperCase() : run[0].suit}`;
    run = [];
  };

  for (const char of input) {
    const tile = decodeSuit(char);
    if (tile) {
      if (run.length && (run[0].suit !== tile.suit || run[0].sideways !== tile.sideways)) flush();
      run.push(tile);
      continue;
    }
    flush();
    result += reverseHonors[char] ?? reverseSpecials[char] ?? char;
  }
  flush();
  return result;
}

export function convert(input: string, direction: Direction): string {
  return direction === "to-gl" ? mahjongToGL(input) : glToMahjong(input);
}
