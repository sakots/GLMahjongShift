# AGENTS.md

## 概要

麻雀牌フォントである[GL-MahjongTile](https://github.com/Gutenberg-Labo)を入力するための
「1m 2m 3m / 1p / 1s / 東南西北白發中」みたいな麻雀表記 ⇄ GL-MahjongTile文字列へ自動変換するJavaScriptです。

## 実装

実装はtypescriptで行う。pnpm startで直接実行するjavascriptと、web上のHTML経由で実行するものを生成する。

## 対応表

```txt
萬子
q w e r t y u i o
1 2 3 4 5 6 7 8 9

索子
a s d f g h j k l
1 2 3 4 5 6 7 8 9

筒子
z x c v b n m , .
1 2 3 4 5 6 7 8 9

1 = 東
2 = 南
3 = 西
4 = 北

5 = 白
6 = 發
7 = 中

```

shiftで横に倒れる。

花牌等。

```txt
@ = 春 🀦
; = 夏 🀧
: = 秋 🀨
] = 冬 🀩

- = 梅 🀢
^ = 蘭 🀣
\ = 竹 🀤
[ = 菊 🀥

/ = ジョーカー 🀪
9 = 牌の裏 🀫
```
