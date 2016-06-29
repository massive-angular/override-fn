# override-fn
util function to override any other function

## Quick start
Several quick start options are available:

* [Download the latest release](https://github.com/massive-angular/override-fn/archive/v1.0.8.zip)
* Clone the repo: `git clone https://github.com/massive-angular/override-fn.git`
* Install with [bower](http://bower.io): `bower install override-fn`
* Install with [npm](https://npmjs.com): `npm install override-fn`

## Examples
Use original parameters
```js
var overrideFn = require('override-fn');

var context = {
    fn: function (a, b, c) {
        console.log('hello from fn: ', a, b, c);
    }
};

var originalFn = overrideFn(context, 'fn', function (baseFn) {
    console.log('hello from override-fn');
    baseFn();
});

context.fn(1, 2, 3);
// output:
// hello from override-fn
// hello from fn: 1, 2, 3

originalFn(1, 2, 3);
// output:
// hello from fn: 1, 2, 3
```

Use custom parameters
```js
var overrideFn = require('override-fn');

var context = {
    fn: function (a, b, c) {
        console.log('hello from fn: ', a, b, c);
    }
};

var originalFn = overrideFn(context, 'fn', function (baseFn, a, b, c) {
    console.log('hello from override-fn');
    baseFn(a + 1, b + 1, c + 1);
});

context.fn(1, 2, 3);
// output:
// hello from override-fn
// hello from fn: 2, 3, 4

originalFn(1, 2, 3);
// output:
// hello from fn: 1, 2, 3
```

Override class
```js
var overrideFn = require('override-fn');

var originalDate = overrideFn(global, 'Date', function (baseFn) {
    console.log('hello from override-fn');
    return baseFn(); // important to return created instance
});

var date = new Date();
console.log(date);
console.log(date instanceof Date);
console.log(date instanceof originalDate);
// output:
// hello from override-fn
// Tue May 24 2016 16:00:54 GMT+0300 (EEST)
// false
// true
```

## Creators
**Slava Matvienco**
* <https://github.com/felix-wfm>

**Alexandr Dascal**
* <https://github.com/adascal>

## License
Code released under [the MIT license](http://spdx.org/licenses/MIT).
