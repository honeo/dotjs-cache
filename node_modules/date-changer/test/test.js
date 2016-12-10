console.log('date-changer: test');

// babel
require('babel-polyfill');
require("babel-register")({
	ignore: false,
	presets: ['es2015', 'stage-0'] // registerでlatestを使うとコケる
});

const dateChanger = require('../').default;

// Var
const date = new Date(0); // 1970-01-01T00:00:00.000Z
const resultArray = [
	// 年
	1973===dateChanger({years: 3}, date).getFullYear(),
	// 月
	9===dateChanger({months: -3}, date).getMonth(),
	// 週
	22===dateChanger({weeks: 3}, date).getDate(),
	// 日
	29===dateChanger({dates: -3}, date).getDate(),
	// 時
	12===dateChanger({hours: 3}, date).getHours(),
	// 分
	57===dateChanger({minutes: -3}, date).getMinutes(),
	// 秒
	3===dateChanger({seconds: 3}, date).getSeconds(),
	// ms
	997===dateChanger({milliseconds: -3}, date).getMilliseconds()
];

// チェック
resultArray.forEach( (bool, index, arr)=>{
	if(bool){
		console.log(`${index+1}/${arr.length}: success`);
	}else{
		throw new Error(`${index+1}/${arr.length}: failed`);
	}
});
