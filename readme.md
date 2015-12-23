# dotjs-cache
[honeo/dotjs-cache](https://github.com/honeo/dotjs-cache)  
[dotjs-cache](https://www.npmjs.com/package/dotjs-cache)

## なにこれ
.jsファイルをXHRで取得して実行する。  
成功すればlocalStorageにキャッシュして次からはそれを使う。

## 使い方
Promiseインスタンスを返す。
```js
const dotjsCache = require('dotjs-cache');

dotjsCache({
	url: 'http://example.com/hoge.js'
}).then( (arg)=>{
	console.log('hoge');
});
```
設定は引数で渡すオブジェクトのプロパティから行う。  

|properties	| 初期設定, 説明	|
|:---------:|:---------------|
|	cache	| true, キャッシュ使用の有無        				|
|	cors	| false, [cors.io](http://cors.io/)使用の有無 |
|	exec	| true, .jsファイル実行の有無						 |
|	expire	| {date: 1}, キャッシュ期限を{year,mon,date,hour,min,sec}等で指定
|	retry	| true, 失敗時の通常読み込み(script要素.src)の有無|
|	url		| __必須__, 対象にする.jsファイルのアドレス |
