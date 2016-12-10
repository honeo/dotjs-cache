/*
	特になし
*/

// Modules
import {is, not} from '@honeo/type-check';

/*
	本体
		引数1のオブジェクトに応じてdateインスタンスを操作して返す
		引数2にdateインスタンスがあればそれを基準にする
*/
function dateChanger(obj, instance){
	if( not.obj(obj) ){
		throw new TypeError('Invalid argument');
	}
	const _date = is.date(instance) ?
		new Date(instance.getTime()): // 一応新しく作る
		new Date();
	const year = obj.years || obj.year || obj.yrs || obj.yr || obj.y;
	const mon = obj.months || obj.month || obj.mon || obj.mo;
	const week = obj.weeks || obj.week || obj.wks || obj.wk || obj.w;
	const date = obj.dates || obj.date || obj.days || obj.day || obj.d;
	const hour = obj.hours || obj.hour || obj.hr || obj.h;
	const min = obj.minutes || obj.minute || obj.min || obj.m;
	const sec = obj.seconds || obj.second || obj.sec || obj.s;
	const ms = obj.milliseconds || obj.millisecond || obj.msec || obj.ms;
	is.num(year) && _date.setFullYear(_date.getFullYear() + year);
	is.num(mon) && _date.setMonth(_date.getMonth() + mon);
	is.num(week) && _date.setDate(_date.getDate() + (week*7));
	is.num(date) && _date.setDate(_date.getDate() + date);
	is.num(hour) && _date.setHours(_date.getHours() + hour);
	is.num(min) && _date.setMinutes(_date.getMinutes() + min);
	is.num(sec) && _date.setSeconds(_date.getSeconds() + sec);
	is.num(ms) && _date.setMilliseconds(_date.getMilliseconds() + ms);
	return _date;
}

export default dateChanger;
