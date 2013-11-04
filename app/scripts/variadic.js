/*global define */
define([], function() {
    'use strict';

    var __slice = Array.prototype.slice;

    return function variadic (fn) {
        var fnLength = fn.length;

        if (fnLength < 1) {
            return fn;
        }
        else if (fnLength === 1)  {
            return function () {
                return fn.call(
                    this, __slice.call(arguments, 0));
            };
        }
        else {
            return function () {
                var numberOfArgs = arguments.length,
                    namedArgs = __slice.call(arguments, 0, fnLength - 1),
                    numberOfMissingNamedArgs = Math.max(fnLength - numberOfArgs - 1, 0),
                    argPadding = new Array(numberOfMissingNamedArgs),
                    variadicArgs = __slice.call(
        arguments, fn.length - 1);

                return fn.apply(
                        this, namedArgs
                        .concat(argPadding)
                        .concat([variadicArgs]));
            };
        }
    };
});