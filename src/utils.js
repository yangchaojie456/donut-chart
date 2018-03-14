let class2type = {};
let toString = class2type.toString;
let hasOwn = class2type.hasOwnProperty;
let support = {};
module.exports = {
    // 百分比字符串转小数
    formatPercent(param, name) {
        if (typeof param == 'string' && param.indexOf('%') == param.length - 1) {
            return param.slice(0, -1) / 100
        }
        throw name + " 参数格式错误"
    },
    // 字体大小字符串去px
    formatPx(param, name) {
        if (typeof param == 'string' && param.indexOf('px') == param.length - 2) {
            return +param.slice(0, -2)
        }
        throw name + " 参数格式错误"
    },
    // 角度转弧度
    angelToRadian(param) {
        return param * Math.PI / 180
    },
    extend() {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !this.isFunction(target)) {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {

                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (this.isPlainObject(copy) ||
                            (copyIsArray = this.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && this.isArray(src) ? src : [];

                        } else {
                            clone = src && this.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = this.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    },
    isFunction(param) {
        return typeof param == 'function'
    }, 
    isPlainObject(obj) {
        var key;
    
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if (!obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)) {
            return false;
        }
    
        try {
    
            // Not own constructor property must be Object
            if (obj.constructor &&
                !hasOwn.call(obj, "constructor") &&
                !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
    
            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }
    
        // Support: IE<9
        // Handle iteration over inherited properties before own properties.
        if (!support.ownFirst) {
            for (key in obj) {
                return hasOwn.call(obj, key);
            }
        }
    
        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        for (key in obj) {}
    
        return key === undefined || hasOwn.call(obj, key);
    },
    type(obj) {
        if (obj == null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    },
    isWindow(obj) {
        /* jshint eqeqeq: false */
        return obj != null && obj == obj.window;
    },
    isArray(obj) {
        return this.type(obj) === "array";
    }
}

