// Var
const
	_name = 'dotjs-cache',
	doc = document,
	head = doc.head,
	lS  = localStorage,
	cacheObj = JSON.parse(lS[_name] || '{}'),
	Datenow = Date.now(),

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
function main({
	url,
	withCredentials=false,
	cache=true,
	cors=false,
	exec=true,
	expire={date: 1},
	retry=true
}){
	const target = cacheObj[url];
	return new Promise( (resolve, reject)=>{
		if(typeof url!=='string'){
			reject(new TypeError('Invalid argument {url}'));
		}else if( target ){
			resolve(target.code);
		}else{
			const xhr = new XMLHttpRequest();
			xhr.open('GET', (
				cors===true ?
					`http://cors.io/?u=${url}`:
					url
			));
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
					expire: changeDate(expire).getTime(), // 期限日時 => ms
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

// dateインスタンスの日付変更
function changeDate(obj){
	if(typeof obj!=='object'){
		throw new TypeError('argument is only {...}');
	}
	const time = obj.instance ?
		new Date(obj.instance.getTime()):
		new Date();
	const year = obj.years || obj.year || obj.yrs || obj.yr || obj.y;
	const mon = obj.months || obj.month || obj.mon || obj.mo;
	const week = obj.weeks || obj.week || obj.wks || obj.wk || obj.w;
	const date = obj.dates || obj.date || obj.days || obj.day || obj.d;
	const hour = obj.hours || obj.hour || obj.hr || obj.h;
	const min = obj.minutes || obj.minute || obj.min || obj.m;
	const sec = obj.seconds || obj.second || obj.sec || obj.s;
	const ms = obj.milliseconds || obj.millisecond || obj.msec || obj.ms;
	typeof year==='number' && time.setFullYear(time.getFullYear() + year);
	typeof mon==='number' && time.setMonth(time.getMonth() + mon);
	typeof week==='number' && time.setDate(time.getDate() + (week*7));
	typeof date==='number' && time.setDate(time.getDate() + date);
	typeof hour==='number' && time.setHours(time.getHours() + hour);
	typeof min==='number' && time.setMinutes(time.getMinutes() + min);
	typeof sec==='number' && time.setSeconds(time.getSeconds() + sec);
	typeof ms==='number' && time.setMilliseconds(time.getMilliseconds() + ms);
	return time;
}

module.exports = main;
