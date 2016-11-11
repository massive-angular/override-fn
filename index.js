function overridePropertyGetter(baseFn, context, fnName, propertyName) {
    var descriptor = Object.getOwnPropertyDescriptor(context[fnName], propertyName);

    if (descriptor && descriptor.configurable) {
        Object.defineProperty(context[fnName], propertyName, {
            get: function () {
                return baseFn[propertyName];
            }
        });
    }
}

function overrideFn(context, fnName, fn) {
    if (typeof fnName === 'string') {
        return overrideFnInternal(context, fnName, fn);
    } else {
        var obj = arguments[1],
            keys = Object.keys(obj);

        return keys.reduce(function (result, key) {
            result[key] = overrideFnInternal(context, key, obj[key]);

            return result;
        }, {});
    }

    function overrideFnInternal(context, fnName, fn) {
        var baseFn = context[fnName] || function () {};

        context[fnName] = function overrideFunction() {
            var args = arguments,
                params = Array.prototype.slice.call(args),
                isCalledLikeConstructor = this instanceof overrideFunction;

            params.unshift(function () {
                var _args = arguments.length ? arguments : args,
                    _params = Array.prototype.slice.call(_args);

                if (isCalledLikeConstructor) {
                    _params.unshift(this);

                    return new (Function.prototype.bind.apply(baseFn, _params));
                }

                return baseFn.apply(this, _params);
            }.bind(this));

            return fn.apply(this, params);
        };

        overridePropertyGetter(baseFn, context, fnName, 'name');
        overridePropertyGetter(baseFn, context, fnName, 'length');

        context[fnName].toString = function () {
            return baseFn.toString();
        };

        return baseFn;
    }
}

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = overrideFn;
} else if (typeof define === 'function' && define.amd) {
    define('overrideFn', [], function () {
        return overrideFn;
    });
}