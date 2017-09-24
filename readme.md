# dotjs-cache
* [honeo/dotjs-cache](https://github.com/honeo/dotjs-cache)  
* [dotjs-cache](https://www.npmjs.com/package/dotjs-cache)

## なにこれ
.jsファイルをXHRで取得して実行する。  
成功すればlocalStorageにキャッシュして次からはそれを使う。

## 使い方
```sh
$ npm i -s dotjs-cache
```

Promiseインスタンスを返す。
```js
import dotjsCache from 'dotjs-cache';

dotjsCache('http://example.com/hoge.js').then( (arg)=>{
	console.log('hoge');
});
```

## Options
第二引数のオブジェクトで指定する。
```js
const promise = dotjsCache(url, {
	expire: {hour: 3}
});
```

| key	| value (default) | description |
|:---------:|:--------:| :----------:|
|	cache	| true   | キャッシュ使用の有無        				|
|	exec	| true | .jsファイル実行の有無						 |
|	expire	| {date: 1}| キャッシュ期限を{key: number}で指定。詳しくは __[honeo/date-changer](https://github.com/honeo/date-changer#option)__|
| fallback	| false | 失敗時の通常読み込み(scriptElement.src)の有無|
|withCredentials| false | withCredentialsの有無|
