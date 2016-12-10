import isComparisonOperator from './lib/is-comparison-operator.js';
import isSemVer from './lib/is-sem-ver.js';
import isVersion from './lib/is-version.js';

/*
	可変長引数に対応するものはbaseに
	そうでないものはisに登録する
*/
const base = {}
const is = {}

/*
	型チェック
*/
function isArray(arg){
	return Array.isArray(arg);
}
base.array = isArray;
base.arr = isArray;

function isBoolean(arg){
	return typeof arg==='boolean';
}
base.boolean = isBoolean;
base.bool = isBoolean;

function isFunction(arg){
	return typeof arg==='function';
}
base.function = isFunction;
base.func = isFunction;

function isNumber(arg){
	return typeof arg==='number';
}
base.number = isNumber;
base.num = isNumber;

function isRegExp(arg){
	return arg instanceof RegExp;
}
base.regexp = isRegExp;
base.re = isRegExp;

function isString(arg){
	return typeof arg==='string';
}
base.string = isString;
base.str = isString;

function isUndefined(arg){
	return arg===undefined;
}
base.undefined = isUndefined;

function isNull(arg){
	return arg===null;
}
base.null = isNull;

// arg!=argでいい気もするがPolyfill前提のコンセプトのため
function isNaN(arg){
	return Number.isNaN(arg);
}
base.nan = isNaN;

/*
	インスタンス判定
*/

function isDate(arg){
	return arg instanceof Date;
}
base.date = isDate;

function isEvent(arg){
	return arg instanceof Event;
}
base.event = isEvent;

function isEventTarget(arg){
	return arg instanceof EventTarget;
}
base.eventtarget = isEventTarget;

// typeofと違ってnullは弾く
function isObject(arg){
	return arg instanceof Object;
	// return !!arg && arg===Object(arg);
}
base.object = isObject;
base.obj = isObject;

// 引数がPromiseインスタンスか
function isPromise(arg){
	return arg instanceof Promise;
}
base.promise = isPromise;



/*
	Number
		数値じゃなければタイプエラーを投げたほうがいい気がする
*/

// 偶数判定（0含む)
function isOddNumber(num){
	return isNumber(num) &&	!(num % 2);
}
base.odd = isOddNumber;

// 奇数判定
function isEvenNumber(num){
	return isNumber(num) && !!(num % 2);
}
base.even = isEvenNumber;

// 倍数判定, AがBの倍数か
function isMultiple(A, B){
	return is.number(A, B) && !(A%B);
}
is.multiple = isMultiple;



/*
	DOM
*/
function isNode(arg){
	return !!arg && typeof arg==='object' && !!arg.nodeType;
}
base.node = isNode;

function isTextNode(arg){
	return isNode(arg) && arg.nodeType===3;
}
base.textnode = isTextNode;

function isElement(arg){
	return isNode(arg) && arg.nodeType===1;
}
base.element = isElement;

function isDocumentFragment(arg){
	return isNode(arg) && arg.nodeType===11;
}
base.documentfragment = isDocumentFragment;
base.df = isDocumentFragment;


/*
	その他
*/
function isTrue(arg){
	return arg===!0;
}
base.true = isTrue;

function isFalse(arg){
	return arg===!1;
}
base.false = isFalse;

function isTruthy(arg){
	return !!arg;
}
base.truthy = isTruthy;

function isFalsy(arg){
	return !arg;
}
base.falsy = isFalsy;

// 定義: truthyで、.lengthで数値を返すもの
function isArrayLike(arg){
	return !!arg && typeof arg.length==='number';
}
base.arraylike = isArrayLike;

base.comparisonoperator = isComparisonOperator;
base.semver = isSemVer;
base.version = isVersion;

/*
	is
		baseを可変長引数化
		引数があれば判定関数を渡してevery
		なければfalseを返す
*/
for(let [key, func] of Object.entries(base)){
	is[key] = (...args)=>{
		return args.length ?
			args.every(func):
			false;
	}
}

export default is;
