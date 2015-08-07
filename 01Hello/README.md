# 01. Hello

p5.js はじめのコードです。

## Processing のコードを p5.js に移行するには

違いの一部を紹介します。

| 項目 | Processing | p5.js |
|:-----------|:-----------|:------------|
|サイズ| size(w,h); | createCanvas(w,h); |
|フレームレートの取得| framerate(変数) | framerate() (引数梨の関数) |
|マウスの状態| mousePressed | mouseIsPressed |
|座標変換| pushMatrix(); popMatrix(); | push(); pop(); |
|変数の型| int, float, Booleanなど | すべてvar |
|プリロード| - | void preload() {} |
|タッチイベント| - | touchX, touchY, touches[]など |
|名前空間| - | var myp5 = new p5(function(sketch) {});|
|p5.jsにないもの|3D, PShape, PFontなど| - |


## 参考リンク
- [p5.js 公式サイト](http://p5js.org/)
- [ダウンロード](http://p5js.org/download/)
- [p5.js リファレンス](http://p5js.org/reference/)
- [p5.js と Processing の違い](https://github.com/processing/p5.js/wiki/Processing-transition)