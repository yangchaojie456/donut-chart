(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DonutChart"] = factory();
	else
		root["DonutChart"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = __webpack_require__(2);
/**
 * @description 创建环形图
 * @author yangCJ
 * @param {object} option 
 * @param {string} option.x 圆心横坐标 百分比
 * @param {string} option.y 圆心纵坐标 百分比
 * @param {string} radius 圆环半径 百分比
 * @param {string} lineWidth 圆环宽度 百分比
 * @param {number} startAngle 起始角度 0到360
 * @param {string} capType 圆弧拼接类型 "round"
 * @param {string} fontStyle 文本描述样式
 * @param {object} title 标题样式及位置
 * @param {object} tooltip 提示框的样式
 * @param {object} label 标签的样式及显示
 * @param {array} data 圆弧数据
 * @param {string} data[i].name 数据名称
 * @param {number} data[i].value 数据值
 * @param {object} selectedStyle 选中的圆弧样式
 * @param {string} selectedStyle.color 选中的圆弧边界颜色
 * @param {number} selectedStyle.borderWidth 选中的圆弧边界宽度
 * @param {array} color 圆弧的分配颜色
 * @param {string} backgroundArc 数值为空时的圆圈颜色
 */
module.exports = DonutChart;
function DonutChart(canvasId, option) {
    this.option = {
        title: {
            show: true,
            text: {
                value: '',
                color: '#999',
                fontSize: '30px',
                fontFamily: 'Arial'
            },
            secondText: {
                value: '',
                color: '#666',
                fontSize: '30px',
                fontFamily: 'Arial'
            },
            x: "50%",
            y: "50%"
        },
        tooltip: {
            show: true,
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: 'normal',
            fontSize: "24px",
            lineHeight: "30px",
            fontFamily: 'Arial',
            color: 'white'
        },
        x: "50%",
        y: "50%",
        radius: "30%",
        lineWidth: "5%",
        startAngle: 0,
        endAngle: 360,
        data: [],
        label: {
            show: true,
            firstTextStyle: {
                fontSize: '30px',
                fontFamily: 'Arial',
                color: "#999"
            },
            secondTextStyle: {
                fontSize: '30px',
                fontFamily: 'Arial',
                color: "#666"
            }
        },
        capType: "round",
        selectedStyle: {
            color: "white",
            borderWidth: 10
        },
        color: ["#FF7F00", "#FFFF00 ", "#00FF00 ", "#00FFFF ", "#0000FF", "#8B00FF", "#FF0000 "],
        labelCoverTitle: true,
        backgroundArc: '#999'
    };
    this.option = utils.extend(true, this.option, option);
    if (this.option.color.length < this.option.data.length) {
        throw 'option.color 颜色少于 option.data';
    }
    this.canvas = document.getElementById(canvasId);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.circleX = utils.formatPercent(option.x, "option.x") * this.width;
    this.circleY = utils.formatPercent(option.y, "option.x") * this.height;
    this.lineWidth = utils.formatPercent(option.lineWidth, 'option.lineWidth') * (this.width > this.height ? this.height : this.width);
    this.label = option.label;
    this.radius = utils.formatPercent(option.radius, 'option.radius') * (this.width > this.height ? this.height : this.width);
    this.data = option.data;
    this.color = option.color;
}
DonutChart.prototype.drawArc = function (startAngle, endAngle, color, lineWidth) {

    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, utils.angelToRadian(startAngle), utils.angelToRadian(endAngle), false); // 坐标为90的圆，这里起始角度是0，结束角度是Math.PI*2
    if (lineWidth) {
        this.ctx.lineWidth = lineWidth;
    }
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.ctx.closePath();
};
DonutChart.prototype.drawTitle = function (titleFlag) {
    if (!this.option.title.show) {
        return false;
    }
    if (this.option.title && !titleFlag) {
        // title 主标题
        if (!this.option.title.text.value) {
            return false;
        }
        this.ctx.beginPath();
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = this.option.title.text.color;
        this.ctx.font = this.option.title.text.fontSize + ' ' + this.option.title.text.fontFamily;
        // 副标题
        if (!this.option.title.secondText.value) {
            this.ctx.fillText(this.option.title.text.value, utils.formatPercent(this.option.title.x, 'option.title.x') * this.width, utils.formatPercent(this.option.title.y, 'option.title.y') * this.height);
            return false;
        }
        this.ctx.fillText(this.option.title.text.value, utils.formatPercent(this.option.title.x, 'option.title.x') * this.width, utils.formatPercent(this.option.title.y, 'option.title.y') * this.height - 2 * utils.formatPx(this.option.title.text.fontSize, 'option.title.text.fontSize') / 3);
        this.ctx.beginPath();
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = this.option.title.secondText.color;
        this.ctx.font = this.option.title.secondText.fontSize + ' ' + this.option.title.secondText.fontFamily;
        this.ctx.fillText(this.option.title.secondText.value, utils.formatPercent(this.option.title.x, 'option.title.x') * this.width, utils.formatPercent(this.option.title.y, 'option.title.y') * this.height + 2 * utils.formatPx(this.option.title.secondText.fontSize, 'option.title.secondText.fontSize') / 3);
    }
};
DonutChart.prototype.drawTip = function (param) {
    var _this2 = this;

    if (!this.option.tooltip.show) {
        return false;
    }
    this.ctx.save();
    this.ctx.rotate(utils.angelToRadian(90 + this.option.startAngle));
    this.ctx.beginPath();
    var default_font = this.option.tooltip.fontStyle + " " + this.option.tooltip.fontVariant + " " + this.option.tooltip.fontWeight + " " + this.option.tooltip.fontSize + (this.option.tooltip.lineHeight ? "/" + this.option.tooltip.lineHeight : '') + " " + this.option.tooltip.fontFamily;
    this.ctx.font = default_font;
    this.ctx.fillStyle = this.option.tooltip.color;
    this.ctx.textAlign = "start";
    this.ctx.textBaseline = "bottom";
    // tip_back 需要知道 左上角（x,y）width （maxWidth 最长的一行宽度） 和 height(每一行的行高总和)
    // 判定是含富文本的还是普通文本 (计算宽高的方式有所区别) 当有一个富文本的时候，则普通文本也会被包装成对象 所以可选像下面这样判断
    var totalHeigth = 0;
    var maxWidth = 0;
    var rowWidth = 0;
    var maxLineHeight = 0;
    var rowLineHeight = [];
    if (_typeof(param.content[0]) == "object") {
        // 部分含有富文本的情况
        // 分行 可以得到 本行我最大宽度 maxWidth 
        param.content.forEach(function (rowObj, i) {
            rowWidth = 0;
            // 一行中的每小段 可以 得到 这一行的最大行高 maxLineHeight 和每小段 的 文本宽度
            for (var key in rowObj) {
                var text = rowObj[key];

                if (!_this2.option.tooltip.rich[key]) {
                    _this2.option.tooltip.rich[key] = {};
                }
                var fontStyle = _this2.option.tooltip.rich[key].fontStyle ? _this2.option.tooltip.rich[key].fontStyle : _this2.option.tooltip.fontStyle;
                var fontVariant = _this2.option.tooltip.rich[key].fontVariant ? _this2.option.tooltip.rich[key].fontVariant : _this2.option.tooltip.fontVariant;
                var fontWeight = _this2.option.tooltip.rich[key].fontWeight ? _this2.option.tooltip.rich[key].fontWeight : _this2.option.tooltip.fontWeight;
                var fontSize = _this2.option.tooltip.rich[key].fontSize ? _this2.option.tooltip.rich[key].fontSize : _this2.option.tooltip.fontSize;
                var lineHeight = _this2.option.tooltip.rich[key].lineHeight ? _this2.option.tooltip.rich[key].lineHeight : _this2.option.tooltip.lineHeight;
                var fontFamily = _this2.option.tooltip.rich[key].fontFamily ? _this2.option.tooltip.rich[key].fontFamily : _this2.option.tooltip.fontFamily;
                _this2.ctx.font = fontStyle + " " + fontVariant + " " + fontWeight + " " + fontSize + (lineHeight ? "/" + lineHeight : '') + " " + fontFamily;
                _this2.ctx.fillStyle = _this2.option.tooltip.rich[key].color ? _this2.option.tooltip.rich[key].color : _this2.option.tooltip.color;
                rowWidth += _this2.ctx.measureText(text).width;

                if (utils.formatPx(lineHeight) > maxLineHeight) {
                    maxLineHeight = utils.formatPx(lineHeight);
                }
            }
            rowLineHeight[i] = maxLineHeight;
            totalHeigth += maxLineHeight;
            if (rowWidth > maxWidth) {
                maxWidth = rowWidth;
            }
        });
        // 画浮层
        this.ctx.rect(param.x - 5, param.y, maxWidth + 10, totalHeigth);
        this.ctx.fillStyle = '#00000088';
        this.ctx.fill();
        // 填写文字
        totalHeigth = 0;
        param.content.forEach(function (rowObj, i) {
            rowWidth = 0;
            rowLineHeight[i] = maxLineHeight;
            totalHeigth += maxLineHeight;
            // 一行中的每小段 可以 得到 这一行的最大行高 maxLineHeight 和每小段 的 文本宽度
            for (var key in rowObj) {
                var text = rowObj[key];

                if (!_this2.option.tooltip.rich[key]) {
                    _this2.option.tooltip.rich[key] = {};
                }
                var fontStyle = _this2.option.tooltip.rich[key].fontStyle ? _this2.option.tooltip.rich[key].fontStyle : _this2.option.tooltip.fontStyle;
                var fontVariant = _this2.option.tooltip.rich[key].fontVariant ? _this2.option.tooltip.rich[key].fontVariant : _this2.option.tooltip.fontVariant;
                var fontWeight = _this2.option.tooltip.rich[key].fontWeight ? _this2.option.tooltip.rich[key].fontWeight : _this2.option.tooltip.fontWeight;
                var fontSize = _this2.option.tooltip.rich[key].fontSize ? _this2.option.tooltip.rich[key].fontSize : _this2.option.tooltip.fontSize;
                var lineHeight = _this2.option.tooltip.rich[key].lineHeight ? _this2.option.tooltip.rich[key].lineHeight : _this2.option.tooltip.lineHeight;
                var fontFamily = _this2.option.tooltip.rich[key].fontFamily ? _this2.option.tooltip.rich[key].fontFamily : _this2.option.tooltip.fontFamily;
                _this2.ctx.font = fontStyle + " " + fontVariant + " " + fontWeight + " " + fontSize + (lineHeight ? "/" + lineHeight : '') + " " + fontFamily;
                _this2.ctx.fillStyle = _this2.option.tooltip.rich[key].color ? _this2.option.tooltip.rich[key].color : _this2.option.tooltip.color;

                _this2.ctx.fillText(text, param.x + rowWidth, param.y + totalHeigth);

                rowWidth += _this2.ctx.measureText(text).width;
            }
        });
    } else {
        // 普通文字
        var default_lineHeight = this.option.tooltip.lineHeight;
        param.content.forEach(function (text, i) {
            totalHeigth += utils.formatPx(default_lineHeight);
            rowWidth = _this2.ctx.measureText(text).width;
            if (rowWidth > maxWidth) {
                maxWidth = rowWidth;
            }
        });
        this.ctx.rect(param.x - 5, param.y, maxWidth + 10, totalHeigth);
        this.ctx.fillStyle = '#00000088';
        this.ctx.fill();
        // 画完底部浮层 填上文字
        this.ctx.fillStyle = this.option.tooltip.color;
        totalHeigth = 0;
        param.content.forEach(function (text, i) {
            totalHeigth += utils.formatPx(default_lineHeight);
            _this2.ctx.fillText(text, param.x, param.y + totalHeigth);
        });
    }

    this.ctx.restore();
};
DonutChart.prototype.drawLabel = function (param) {
    if (!this.option.label.show) {
        return false;
    }

    // 添加字体
    this.ctx.save();
    this.ctx.rotate(utils.angelToRadian(90 + this.option.startAngle));
    this.ctx.beginPath();
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = this.label.firstTextStyle.color;
    this.ctx.font = this.label.firstTextStyle.fontSize + ' ' + this.label.firstTextStyle.fontFamily;
    this.ctx.fillText(param.name, 0, -2 * utils.formatPx(this.label.firstTextStyle.fontSize, 'label.firstTextStyle.fontSize') / 3);

    this.ctx.fillStyle = this.label.secondTextStyle.color;
    this.ctx.font = this.label.secondTextStyle.fontSize + ' ' + this.label.secondTextStyle.fontFamily;
    this.ctx.fillText(param.value, 0, 2 * utils.formatPx(this.label.secondTextStyle.fontSize, 'label.secondTextStyle.fontSize') / 3);
    this.ctx.restore();
};
DonutChart.prototype.init = function (callback, titleFlag) {
    if (callback && typeof callback != 'function') {
        throw 'init() 第一个参数必须是函数';
    }
    if (titleFlag && typeof titleFlag != 'boolean') {
        throw 'labelCoverTitle 必须是boolean';
    }
    this.canvas.width = this.canvas.width;
    this.drawTitle(titleFlag);
    this.ctx.translate(this.circleX, this.circleY);

    this.ctx.rotate(utils.angelToRadian(-90 + this.option.startAngle));
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = this.option.capType;
    var _this = this;
    this.arcArray = [];
    var total = 0;
    this.data.forEach(function (item, index) {
        total += item.value;
    });
    if (total == 0) {
        this.drawArc(0, 360, this.option.backgroundArc);
        return false;
    }
    if (this.option.type == "progress") {
        total = 1;
        this.drawArc(0, 360, this.option.backgroundArc);
    }
    var lastAngel = 0;
    this.data.forEach(function (item, index) {
        var arr = (item.value / total).toFixed(4).toString().slice(2).split('');
        arr.splice(2, 0, '.');
        var num = arr.join('');

        _this.arcArray[index] = {
            index: index,
            name: item.name,
            value: item.value,
            startAngle: lastAngel,
            endAngle: item.value / total * 360 + lastAngel,
            percent: num + '%'
        };
        lastAngel = _this.arcArray[index].endAngle;
    });
    this.data.forEach(function (item, index) {
        _this.drawArc(_this.arcArray[index].startAngle, _this.arcArray[index].endAngle, _this.color[index]);
    });
    for (var i = 0, l = this.data.length; i < l; i++) {
        if (this.data[i].value != 0) {
            this.drawArc(0, 0.05, this.color[i]);
            break;
        }
    }

    // 绑定事件
    this.canvas.onmousemove = function (e) {

        var rate = _this.canvas[this.width > this.height ? "offsetHeight" : "offsetWidth"] / this[this.width > this.height ? "height" : "width"];

        var x = e.offsetX - this.offsetWidth / 2;
        var y = e.offsetY - this.offsetHeight / 2;
        var x2 = x * x;
        var y2 = y * y;
        // 选中圆环
        if (Math.sqrt(x2 + y2) > (_this.radius - _this.lineWidth) * rate && Math.sqrt(x2 + y2) < (_this.radius + _this.lineWidth) * rate) {
            var angle = Math.atan2(x, -y) / (Math.PI / 180) > 0 ? Math.atan2(x, -y) / (Math.PI / 180) : 360 + Math.atan2(x, -y) / (Math.PI / 180);
            // 选中某段，显示某段

            for (var i = 0, l = _this.arcArray.length; i < l; i++) {
                if (angle < _this.arcArray[i].endAngle) {
                    _this.init(callback, _this.option.labelCoverTitle);
                    _this.drawArc(_this.arcArray[i].startAngle, _this.arcArray[i].endAngle, _this.option.selectedStyle.color, _this.option.selectedStyle.borderWidth + _this.lineWidth);
                    _this.drawArc(_this.arcArray[i].startAngle, _this.arcArray[i].endAngle, _this.color[i], _this.lineWidth);

                    // show label
                    _this.drawLabel(_this.arcArray[i]);
                    // show tip
                    var content;
                    if (typeof _this.option.tooltip.formatter == "function") {
                        content = utils.formatterToObject(_this.option.tooltip.formatter(_this.arcArray[i]));
                    } else {
                        content = [_this.arcArray[i].name, _this.arcArray[i].value];
                    }
                    _this.drawTip({
                        x: x / rate,
                        y: y / rate,
                        content: content
                    });

                    callback(_this.arcArray[i]);
                    break;
                } else {
                    _this.init(callback);
                }
            }
        } else {
            _this.init(callback);
        }
    };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
var support = {};
module.exports = {
    // 百分比字符串转小数
    formatPercent: function formatPercent(param, name) {
        if (typeof param == 'string' && param.indexOf('%') == param.length - 1) {
            return param.slice(0, -1) / 100;
        }
        throw name + " 参数格式错误";
    },

    // 字体大小字符串去px
    formatPx: function formatPx(param, name) {
        if (typeof param == 'string' && param.indexOf('px') == param.length - 2) {
            return +param.slice(0, -2);
        }
        throw name + " 参数格式错误";
    },

    // 富文本格式"{a|水电费}"=》 object {a:水电费}
    formatterToObject: function formatterToObject(param) {

        if (param === undefined) {
            return false;
        }
        if (typeof param != "string") {
            throw "formatter 必须返回一个字符串";
        }
        try {
            var rowTexts = param.split('\n');
            var textObjs = [];
            // 富文本格式

            if (/\{(\w+)\|([\s\S]*?)\}/g.test(param)) {
                rowTexts.forEach(function (element, index) {

                    var str = '';
                    var arr = element.replace(/\{(\w+)\|([\s\S]*?)\}/g, ',"$1":"$2",').split(',');

                    arr.forEach(function (e, i) {
                        if (e.indexOf(':') > -1) {
                            str += e + ',';
                        } else {
                            str += '"default_' + i + '":"' + e + '",';
                        }
                    });

                    // 得到要渲染的对象
                    textObjs.push(JSON.parse("{" + str.slice(0, -1) + "}"));
                });
                // 普通格式
            } else {
                rowTexts.forEach(function (element) {
                    textObjs.push(element);
                });
            }
            return textObjs;
        } catch (error) {
            throw "formatter 的格式不正确";
        }
    },


    // 角度转弧度
    angelToRadian: function angelToRadian(param) {
        return param * Math.PI / 180;
    },
    extend: function extend() {
        var src,
            copyIsArray,
            copy,
            name,
            options,
            clone,
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
        if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object" && !this.isFunction(target)) {
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
                    if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {

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
    isFunction: function isFunction(param) {
        return typeof param == 'function';
    },
    isPlainObject: function isPlainObject(obj) {
        var key;

        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if (!obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)) {
            return false;
        }

        try {

            // Not own constructor property must be Object
            if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
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
    type: function type(obj) {
        if (obj == null) {
            return obj + "";
        }
        return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    },
    isWindow: function isWindow(obj) {
        /* jshint eqeqeq: false */
        return obj != null && obj == obj.window;
    },
    isArray: function isArray(obj) {
        return this.type(obj) === "array";
    }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=donut-chart.js.map