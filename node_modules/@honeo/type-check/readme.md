# type-check
* [honeo/type-check](https://github.com/honeo/type-check)
* [@honeo/type-check](https://www.npmjs.com/package/@honeo/type-check)

## なにこれ
型・インスタンス等をチェックするやつ。  
Polyfill前提。

## 使い方
```sh
$ npm i -S @honeo/type-check
```
```js
import {is, not} from '@honeo/type-check';
// or
import is from '@honeo/type-check/is';

is.arr([]);
> true

not.num('hoge');
> false

is.obj({}, null);
> false
```

## API
is, not共用。

### Type

#### array(), arr()
```js
is.array([]);
> true

is.arr([], []);
> true
```

#### boolean(), bool()
```js
is.boolean(false);
> true

is.bool(true, false);
> true
```

#### function(), func()
```js
is.function(function(){});
> true

is.func(_=>_, _=>_);
> true
```

#### number(), num()
```js
is.number(1);
> true

is.num(0, 1);
> true
```

#### regexp(), re()
```js
is.regexp(/hoge/);
> true

is.re(/foo/, /bar/);
> true
```

#### string(), str()
```js
is.string('hoge');
> true

is.str('fuga', 'piyo');
> true
```

#### undefined()
```js
is.undefined(undefined);
> true
```

#### null()
```js
is.null(null);
> true
```

#### nan()
```js
is.nan(NaN);
> true
```

#### date()
```js
is.date(new Date());
> true
```

#### object(), obj()
```js
is.object({});
> true

is.obj({}, {});
> true

is.obj(null);
> false
```

#### promise()
```js
is.promise(new Promise(_=>_));
> true
```

### 数値

#### odd()
```js
is.odd(2);
> true
```

#### even()
```js
is.even(3);
> true
```

#### multiple(number, number)
```js
is.multiple(8080, 80);
> true
```

### DOM

#### node()
```js
is.node(document.createElement('a'), document.createTextNode('hoge'));
> true
```

#### textnode()
```js
is.textnode(document.createTextNode('hoge'));
> true
```

#### element()
```js
is.element(document.head, document.body);
> true
```

#### documentfragment(), df()
```js
is.df(document.createDocumentFragment());
> true
```


#### event()
```js
is.event( new Event("hoge") );
> true
```

#### eventtarget()
```js
is.eventtarget(document, window);
> true
```

### その他

#### true()
```js
is.true(true, !0);
> true
```

#### false()
```js
is.false(false !1);
> true
```

#### truthy()
```js
is.truthy(true, "hoge", 1, [], {});
> true
```

#### falsy()
```js
is.falsy(null, undefined, "", 0, NaN);
> true
```

#### arraylike()
```js
is.arraylike([], 'hoge');
> true
```

#### comparisonoperator()
有効な比較演算子の文字列か。
```js
is.comparisonoperator('<=');
> true
```

#### semver()
有効なSemVer文字列か。
```js
is.semver('1.2.3');
> true

is.semver('1.0.0-foo.bar');
> true
```

#### versiom()
有効な数字とdotからなるバージョン文字列か。
```js
is.version('7.7.4');
> true

is.version('1.2A');
> false
```
