# date-changer
[honeo/date-changer](https://github.com/honeo/date-changer)  
[date-changer](https://www.npmjs.com/package/date-changer)

## なにこれ
Dateインスタンスを変更して返す。

## 使い方
```sh
$ npm i -S date-changer
```
```js
import dateChanger from 'date-changer';

// 現在から1日戻って3時間進んだDateインスタンスを取得
const date_before1d_after3h = dateChanger({
	date: -1,
	hour: 3
});

// 1970.01.01のDateインスタンスを基準に、30年進めたインスタンスを返す
const date_2000 = dateChanger({year: 30}, new Date(0));
```

## API
### dateChanger(option [, date])
引数1に変更する対象をオブジェクトで指定する。  
引数2にdateインスタンスがあればそれを基準にする。
#### option
同じ単位のkeyが複数あった場合は左から優先。

| 単位 | key              |
| :------------- | :------------- |
| 年   | years, year, yrs, yr, y |
| 月   | months, month, mon, mo |
| 週   | weeks, week, wks, wk, w |
| 日   | dates, date, days, day, d |
| 時   | hours, hour, hr, h |
| 分   | minutes, minute, min, m |
| 秒   | seconds, second, sec, s |
| ミリ秒 | milliseconds, millisecond, msec, ms |
