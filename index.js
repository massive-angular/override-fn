function overrideFn(context, fnName, fn) {
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

    try {
        Object.defineProperties(context[fnName], {
            length: {
                get: function () {
                    return baseFn.length;
                }
            },
            name: {
                get: function () {
                    return baseFn.name;
                }
            }
        });
    }
    catch (ex) {
        console.warn(ex);
    }

    context[fnName].toString = function () {
        return baseFn.toString();
    };

    return baseFn;
}

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = overrideFn;
} else if (typeof define === 'function' && define.amd) {
    define('overrideFn', [], function () {
        return overrideFn;
    });
}