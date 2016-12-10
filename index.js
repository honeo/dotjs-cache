// Modules
import {is, not} from '@honeo/type-check';
import dateChanger from 'date-changer';

// Var
const
	_name = 'dotjs-cache',
	doc = document,
	head = doc.head,
	lS  = localStorage,
	cacheObj = JSON.parse(lS[_name] || '{}'),
	Datenow = Date.now();

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
	retry=true
}){
	// validation
	if( not.str(url) ){
		new TypeError(`Invalid argument: ${url}`);
	}

	const target = cacheObj[url];
	return new Promise( (resolve, reject)=>{
		if( target ){
			resolve(target.code);
		}else{
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
		retry && loadScript(url);
		Promise.reject(e);
	})
}

// 普通にscript要素を突っ込んで.js読み込み
function loadScript(url){
	const script = doc.createElement('script');
	script.defer = true;
	script.async = true;
	script.src = url;
	head.appendChild(script);
}


export default dotjsCache;
