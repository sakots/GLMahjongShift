import assert from "node:assert/strict";
import test from "node:test";
import { glToMahjong, mahjongToGL } from "./converter.js";
test("数牌・字牌を GL-MahjongTile キーに変換する", () => {
    assert.equal(mahjongToGL("123m 456s 789p 東南西北白發中"), "qwe fgh m,. 1234567");
});
test("横倒し数牌は大文字スートで指定する", () => {
    assert.equal(mahjongToGL("159M 23p"), "QTO xc");
    assert.equal(glToMahjong("QTOxc"), "159M23p");
});
test("花牌・ジョーカー・裏牌と Unicode 牌を変換する", () => {
    assert.equal(mahjongToGL("春夏秋冬 梅蘭竹菊 ジョーカー 牌の裏 🀦"), "@;:] -^\\[ / 9 @");
    assert.equal(glToMahjong("@;:] -^\\[ /9"), "春夏秋冬 梅蘭竹菊 ジョーカー牌の裏");
});
test("GL 文字列は連続する同スートをまとめて戻す", () => {
    assert.equal(glToMahjong("qwe asd zxc1234567"), "123m 123s 123p東南西北白發中");
});
