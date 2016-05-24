module.exports = function overrideFn(context, fnName, fn) {
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

    context[fnName].toString = function () {
        return baseFn.toString();
    };

    return baseFn;
};