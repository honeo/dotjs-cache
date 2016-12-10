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

// option
const promise = dotjsCache(url, {...});
```

## Options
|properties	| default | description |
|:---------:|:--------:| :----------:|
|	cache	| true   | キャッシュ使用の有無        				|
|	exec	| true | .jsファイル実行の有無						 |
|	expire	| {date: 1}| キャッシュ期限を{year,mon,week,date,hour,min,sec}等で指定|
|	retry	| true | 失敗時の通常読み込み(script要素.src)の有無|
|withCredentials| false | withCredentialsの有無|
