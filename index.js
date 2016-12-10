// Modules
import {is, not} from '@honeo/type-check';
import dateChanger from 'date-changer';
import dotjsLoader from './dotjs-loader.js';

// Var
const
	_name = 'dotjs-cache',
	doc = document,
	head = doc.head,
	lS  = localStorage,
	cacheObj = JSON.parse(lS[_name] || '{}'),
	Datenow = Date.now(),
	debug = false;

// 期限チェック
for(let key in cacheObj){
	if( cacheObj[key].expire < Datenow ){
		delete cacheObj[key];
	}
}


/*
	モジュールの返り値になるやつ
		引数が不正ならreject()
		ログがあれば叩いてresolve()
		ログがなければXHRで取得して実行
			成功すればキャッシュ
			失敗すれば通常読み込み
*/
function dotjsCache(url, {
	withCredentials=false,
	cache=true,
	exec=true,
	expire={date: 1},
	fallback=false
}){
	debug && console.log('dotjsCache', url);
	// validation
	if( not.str(url) ){
		new TypeError(`Invalid argument: ${url}`);
	}

	const target = cacheObj[url];
	return new Promise( (resolve, reject)=>{
		if( target ){
			debug && console.log('mode: cache');
			resolve(target.code);
		}else{
			debug && console.log('mode: xhr');
			const xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onreadystatechange = ()=>{
				if(xhr.readyState===4 && xhr.status===200){
					resolve(xhr.responseText);
				}
			}
			xhr.onerror = (e)=>{
				reject(e);
			}
			xhr.withCredentials = withCredentials;
			xhr.send(null);
		}
	}).then( (code)=>{
		try{
			exec && new Function(`(function(){${code}}());`)();
			// ログがなかった場合は保存
			if( cache && !target ){
				cacheObj[url] = {
					expire: dateChanger(expire).getTime(), // 期限日時 => ms
					code
				}
				lS[_name] = JSON.stringify(cacheObj);
			}
		}catch(e){
			return Promise.reject(e);
		}
	}).catch( (e)=>{
		// 通常読み込み
		fallback && dotjsLoader(url);
		Promise.reject(e);
	})
}

debug && console.log(_name, cacheObj);
export default dotjsCache;
