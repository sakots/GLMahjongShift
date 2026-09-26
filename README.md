# GLMahjongShift

## 何

麻雀牌フォントである[GL-MahjongTile](https://github.com/Gutenberg-Labo)を入力するための変換表です。
`1m`と入力して1mを表示するためにキーボードのどこを押せばいいのかがわかります。
麻雀表記と、GL-MahjongTile フォントに入力するキー文字列を相互変換します。

## 使い方

依存関係を入れた後、通常の麻雀表記を渡します。

```sh
pnpm install
pnpm start -- '123m 456p 789s 東南西北白發中'
# qwe vbn lkj 1234567
```

逆方向は `--from-gl` を付けます。

```sh
pnpm start -- --from-gl 'qwe vbn lkj 1234567'
# 123m 456p 987s 東南西北白發中
```

`pnpm build` は CLI 用 JavaScript とブラウザ版の `dist/web/index.html` を生成します。ローカルサーバーで `dist/web/` を配信して開いてください。

数牌は `123m`、`456p`、`789s` の形にまとめて入力できます。英字のスートを大文字にすると横倒し数牌を表し、`123M` は `QWE` になります。花牌（春夏秋冬・梅蘭竹菊）、ジョーカー、裏牌、および対応する Unicode 麻雀牌にも対応します。

## 更新履歴

### [2026/09/27] v0.1.0

- リポジトリ生やした
