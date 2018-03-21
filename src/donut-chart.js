const utils = require('./utils')
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
module.exports = DonutChart

function DonutChart(canvasId, option) {
    this.option = {
        x: "50%",
        y: "50%",
        radius: "30%",
        lineWidth: "5%",
        startAngle: 0,
        title: {
            show: true,
            text: undefined,
            textStyle: {
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: 'bold',
                fontSize: "24px",
                lineHeight: "30px",
                fontFamily: 'Arial',
                color: '#9f9f9f',
            },
            subtext: undefined,
            subtextStyle: {
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: 'bold',
                fontSize: "24px",
                lineHeight: "30px",
                fontFamily: 'Arial',
                color: '#e53344'
            },
            x: '50%',
            y: "50%",
        },
        tooltip: {
            show: true,
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: 'normal',
            fontSize: "24px",
            lineHeight: "30px",
            fontFamily: 'Arial',
            color: 'white',
            backgroundColor: '#00000099'
        },
        max:100,
        data: [],
        label: {
            show: true,
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: 'normal',
            fontSize: "24px",
            lineHeight: "30px",
            fontFamily: 'Arial',
            color: '#999'
        },
        capType: "round",
        selectedStyle: {
            color: "white",
            borderWidth: 10
        },
        color: ["#FF7F00", "#FFFF00 ", "#00FF00 ", "#00FFFF ", "#0000FF", "#8B00FF", "#FF0000 "],
        labelCoverTitle: true,
        backgroundArc: '#999'
    }
    this.option = utils.extend(true, this.option, option)
    if (this.option.color.length < this.option.data.length) {
        throw 'option.color 颜色少于 option.data'
    }
    this.canvas = document.getElementById(canvasId);
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.ctx = this.canvas.getContext('2d');
    this.circleX = utils.formatPercent(option.x, "option.x") * this.width
    this.circleY = utils.formatPercent(option.y, "option.x") * this.height
    this.lineWidth = utils.formatPercent(option.lineWidth, 'option.lineWidth') * (this.width > this.height ? this.height : this.width)
    this.label = option.label
    this.radius = utils.formatPercent(option.radius, 'option.radius') * (this.width > this.height ? this.height : this.width)
    this.data = option.data
    this.color = option.color
    this.rate = this.canvas[this.width > this.height ? "offsetHeight" : "offsetWidth"] / this[this.width > this.height ? "height" : "width"]
}
DonutChart.prototype.drawArc = function (startAngle, endAngle, color, lineWidth) {

    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, utils.angelToRadian(startAngle), utils.angelToRadian(endAngle), false); // 坐标为90的圆，这里起始角度是0，结束角度是Math.PI*2
    if (lineWidth) {
        this.ctx.lineWidth = lineWidth
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
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.textAlign = "start";
        this.ctx.textBaseline = "bottom";
        // 计算主标题和副标题行高总和
        var _totalLineHeight = 0 
        _totalLineHeight = utils.formatPx(this.option.title.textStyle.lineHeight,'option.title.textStyle.lineHeight') + utils.formatPx(this.option.title.subtextStyle.lineHeight,'option.title.subtextStyle.lineHeight')
        this.ctx.translate(utils.formatPercent(this.option.title.x,'option.title.x') * this.width, utils.formatPercent(this.option.title.y,'option.title.y') * this.height-_totalLineHeight/2);


        // 主标题
        if (this.option.title.text !== undefined) {
            this.ctx.font = this.option.title.textStyle.fontStyle + " " + this.option.title.textStyle.fontVariant + " " + this.option.title.textStyle.fontWeight + " " + this.option.title.textStyle.fontSize + (this.option.title.textStyle.lineHeight ? "/" + this.option.title.textStyle.lineHeight : '') + " " + this.option.title.textStyle.fontFamily
            this.ctx.fillStyle = this.option.title.textStyle.color;
            
            this.ctx.fillText(this.option.title.text,-this.ctx.measureText(this.option.title.text).width/2,utils.formatPx(this.option.title.textStyle.lineHeight,'option.title.textStyle.lineHeight'));
        }

        // 副标题
        if (this.option.title.subtext !== undefined) {
            this.ctx.font = this.option.title.subtextStyle.fontStyle + " " + this.option.title.subtextStyle.fontVariant + " " + this.option.title.subtextStyle.fontWeight + " " + this.option.title.subtextStyle.fontSize + (this.option.title.subtextStyle.lineHeight ? "/" + this.option.title.subtextStyle.lineHeight : '') + " " + this.option.title.subtextStyle.fontFamily
            this.ctx.fillStyle = this.option.title.subtextStyle.color;
            
            this.ctx.fillText(this.option.title.subtext,-this.ctx.measureText(this.option.title.subtext).width/2,utils.formatPx(this.option.title.textStyle.lineHeight,'option.title.textStyle.lineHeight')+utils.formatPx(this.option.title.subtextStyle.lineHeight,'option.title.subtextStyle.lineHeight'));
        }
        this.ctx.restore();        
    }
}
DonutChart.prototype.drawTip = function (param) {
    if (!this.option.tooltip.show) {
        return false;
    }
    this.ctx.save()
    this.ctx.rotate(utils.angelToRadian(90 + this.option.startAngle))
    this.ctx.beginPath();
    var default_font = this.option.tooltip.fontStyle + " " + this.option.tooltip.fontVariant + " " + this.option.tooltip.fontWeight + " " + this.option.tooltip.fontSize + (this.option.tooltip.lineHeight ? "/" + this.option.tooltip.lineHeight : '') + " " + this.option.tooltip.fontFamily
    this.ctx.font = default_font
    this.ctx.fillStyle = this.option.tooltip.color;
    this.ctx.textAlign = "start";
    this.ctx.textBaseline = "bottom";
    // tip_back 需要知道 左上角（x,y）width （maxWidth 最长的一行宽度） 和 height(每一行的行高总和)
    // 判定是含富文本的还是普通文本 (计算宽高的方式有所区别) 当有一个富文本的时候，则普通文本也会被包装成对象 所以可选像下面这样判断
    var totalHeigth = 0;
    var maxWidth = 0;
    var rowWidth = 0;
    var maxLineHeight = 0;
    var rowLineHeight = []
    if (typeof param.content[0] == "object") {
        // 部分含有富文本的情况
        // 分行 可以得到 本行我最大宽度 maxWidth 
        param.content.forEach((rowObj, i) => {
            rowWidth = 0;
            // 一行中的每小段 可以 得到 这一行的最大行高 maxLineHeight 和每小段 的 文本宽度
            for (const key in rowObj) {
                var text = rowObj[key]

                if (!this.option.tooltip.rich[key]) {
                    this.option.tooltip.rich[key] = {}
                }
                let fontStyle = this.option.tooltip.rich[key].fontStyle ? this.option.tooltip.rich[key].fontStyle : this.option.tooltip.fontStyle
                let fontVariant = this.option.tooltip.rich[key].fontVariant ? this.option.tooltip.rich[key].fontVariant : this.option.tooltip.fontVariant
                let fontWeight = this.option.tooltip.rich[key].fontWeight ? this.option.tooltip.rich[key].fontWeight : this.option.tooltip.fontWeight
                let fontSize = this.option.tooltip.rich[key].fontSize ? this.option.tooltip.rich[key].fontSize : this.option.tooltip.fontSize
                let lineHeight = this.option.tooltip.rich[key].lineHeight ? this.option.tooltip.rich[key].lineHeight : this.option.tooltip.lineHeight
                let fontFamily = this.option.tooltip.rich[key].fontFamily ? this.option.tooltip.rich[key].fontFamily : this.option.tooltip.fontFamily
                this.ctx.font = fontStyle + " " + fontVariant + " " + fontWeight + " " + fontSize + (lineHeight ? "/" + lineHeight : '') + " " + fontFamily
                this.ctx.fillStyle = this.option.tooltip.rich[key].color ? this.option.tooltip.rich[key].color : this.option.tooltip.color;
                rowWidth += this.ctx.measureText(text).width

                if (utils.formatPx(lineHeight,'option.tooltip.lineHeight') > maxLineHeight) {
                    maxLineHeight = utils.formatPx(lineHeight,'option.tooltip.lineHeight')
                }
            }
            rowLineHeight[i] = maxLineHeight
            totalHeigth += maxLineHeight
            if (rowWidth > maxWidth) {
                maxWidth = rowWidth
            }
        })

        // 画浮层
        this.ctx.rect(param.x + 15, param.y+10, maxWidth + 10, totalHeigth);
        this.ctx.fillStyle = this.option.tooltip.backgroundColor;
        this.ctx.fill();
        // 填写文字
        totalHeigth = 0;
        param.content.forEach((rowObj, i) => {
            rowWidth = 0;
            maxLineHeight = rowLineHeight[i]
            totalHeigth += maxLineHeight
            // 一行中的每小段 可以 得到 这一行的最大行高 maxLineHeight 和每小段 的 文本宽度
            for (const key in rowObj) {
                var text = rowObj[key]

                if (!this.option.tooltip.rich[key]) {
                    this.option.tooltip.rich[key] = {}
                }
                let fontStyle = this.option.tooltip.rich[key].fontStyle ? this.option.tooltip.rich[key].fontStyle : this.option.tooltip.fontStyle
                let fontVariant = this.option.tooltip.rich[key].fontVariant ? this.option.tooltip.rich[key].fontVariant : this.option.tooltip.fontVariant
                let fontWeight = this.option.tooltip.rich[key].fontWeight ? this.option.tooltip.rich[key].fontWeight : this.option.tooltip.fontWeight
                let fontSize = this.option.tooltip.rich[key].fontSize ? this.option.tooltip.rich[key].fontSize : this.option.tooltip.fontSize
                let lineHeight = this.option.tooltip.rich[key].lineHeight ? this.option.tooltip.rich[key].lineHeight : this.option.tooltip.lineHeight
                let fontFamily = this.option.tooltip.rich[key].fontFamily ? this.option.tooltip.rich[key].fontFamily : this.option.tooltip.fontFamily
                this.ctx.font = fontStyle + " " + fontVariant + " " + fontWeight + " " + fontSize + (lineHeight ? "/" + lineHeight : '') + " " + fontFamily
                this.ctx.fillStyle = this.option.tooltip.rich[key].color ? this.option.tooltip.rich[key].color : this.option.tooltip.color;

                this.ctx.fillText(text, param.x+20 + rowWidth, param.y+10 + totalHeigth)

                rowWidth += this.ctx.measureText(text).width

            }

        })

    } else {
        // 普通文字
        var default_lineHeight = this.option.tooltip.lineHeight
        param.content.forEach((text, i) => {
            totalHeigth += utils.formatPx(default_lineHeight,'option.tooltip.lineHeight or option.tooltip.rich[].lineHeight')
            rowWidth = this.ctx.measureText(text).width
            if (rowWidth > maxWidth) {
                maxWidth = rowWidth
            }
        })
        this.ctx.rect(param.x - 5, param.y, maxWidth + 10, totalHeigth);
        this.ctx.fillStyle = '#00000088'
        this.ctx.fill();
        // 画完底部浮层 填上文字
        this.ctx.fillStyle = this.option.tooltip.color;
        totalHeigth = 0;
        param.content.forEach((text, i) => {
            totalHeigth += utils.formatPx(default_lineHeight,'option.tooltip.lineHeight  or option.tooltip.rich[].lineHeight')
            this.ctx.fillText(text, param.x, param.y + totalHeigth)
        })
    }

    this.ctx.restore();
}
DonutChart.prototype.drawLabel = function (content) {

    if (!this.option.label.show) {
        return false;
    }
    this.ctx.save()
    this.ctx.rotate(utils.angelToRadian(90 + this.option.startAngle))
    this.ctx.beginPath();
    var default_font = this.option.label.fontStyle + " " + this.option.label.fontVariant + " " + this.option.label.fontWeight + " " + this.option.label.fontSize + (this.option.label.lineHeight ? "/" + this.option.label.lineHeight : '') + " " + this.option.label.fontFamily
    this.ctx.font = default_font
    this.ctx.fillStyle = this.option.label.color;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "bottom";
    // tip_back 需要知道 左上角（x,y）width （maxWidth 最长的一行宽度） 和 height(每一行的行高总和)
    // 判定是含富文本的还是普通文本 (计算宽高的方式有所区别) 当有一个富文本的时候，则普通文本也会被包装成对象 所以可选像下面这样判断
    var totalHeigth = 0;
    var rowWidth = 0;
    var maxWidth = 0;
    var maxLineHeight = 0;
    var rowLineHeight = []
    var rowWidths = [];
    if (typeof content[0] == "object") {
        // 部分含有富文本的情况
        // 分行 可以得到 本行最大宽度 maxWidth 
        content.forEach((rowObj, i) => {
            rowWidth = 0;
            // 一行中的每小段 可以 得到 这一行的最大行高 maxLineHeight 和每小段 的 文本宽度
            for (const key in rowObj) {
                var text = rowObj[key]

                if (!this.option.label.rich[key]) {
                    this.option.label.rich[key] = {}
                }
                let fontStyle = this.option.label.rich[key].fontStyle ? this.option.label.rich[key].fontStyle : this.option.label.fontStyle
                let fontVariant = this.option.label.rich[key].fontVariant ? this.option.label.rich[key].fontVariant : this.option.label.fontVariant
                let fontWeight = this.option.label.rich[key].fontWeight ? this.option.label.rich[key].fontWeight : this.option.label.fontWeight
                let fontSize = this.option.label.rich[key].fontSize ? this.option.label.rich[key].fontSize : this.option.label.fontSize
                let lineHeight = this.option.label.rich[key].lineHeight ? this.option.label.rich[key].lineHeight : this.option.label.lineHeight
                let fontFamily = this.option.label.rich[key].fontFamily ? this.option.label.rich[key].fontFamily : this.option.label.fontFamily
                this.ctx.font = fontStyle + " " + fontVariant + " " + fontWeight + " " + fontSize + (lineHeight ? "/" + lineHeight : '') + " " + fontFamily
                this.ctx.fillStyle = this.option.label.rich[key].color ? this.option.label.rich[key].color : this.option.label.color;
                rowWidth += this.ctx.measureText(text).width

                if (utils.formatPx(lineHeight,'option.label.lineHeight or option.label.rich[].lineHeight') > maxLineHeight) {
                    maxLineHeight = utils.formatPx(lineHeight,'option.label.lineHeight or option.label.rich[].lineHeight')
                }
            }
            rowLineHeight[i] = maxLineHeight
            rowWidths[i] = rowWidth
            if (rowWidth > maxWidth) {
                maxWidth = rowWidth
            }

        })

        // 填写文字
        this.ctx.translate(0, -eval(rowLineHeight.join("+")) / 2)
        totalHeigth = 0;
        content.forEach((rowObj, i) => {

            this.ctx.save()
            this.ctx.translate(-rowWidths[i] / 2, 0)
            this.ctx.textAlign = "start";
            rowWidth = 0;
            maxLineHeight = rowLineHeight[i]
            totalHeigth += maxLineHeight
            // 一行中的每小段 可以 得到 这一行的最大行高 maxLineHeight 和每小段 的 文本宽度
            for (const key in rowObj) {
                var text = rowObj[key]

                if (!this.option.label.rich[key]) {
                    this.option.label.rich[key] = {}
                }
                let fontStyle = this.option.label.rich[key].fontStyle ? this.option.label.rich[key].fontStyle : this.option.label.fontStyle
                let fontVariant = this.option.label.rich[key].fontVariant ? this.option.label.rich[key].fontVariant : this.option.label.fontVariant
                let fontWeight = this.option.label.rich[key].fontWeight ? this.option.label.rich[key].fontWeight : this.option.label.fontWeight
                let fontSize = this.option.label.rich[key].fontSize ? this.option.label.rich[key].fontSize : this.option.label.fontSize
                let lineHeight = this.option.label.rich[key].lineHeight ? this.option.label.rich[key].lineHeight : this.option.label.lineHeight
                let fontFamily = this.option.label.rich[key].fontFamily ? this.option.label.rich[key].fontFamily : this.option.label.fontFamily
                this.ctx.font = fontStyle + " " + fontVariant + " " + fontWeight + " " + fontSize + (lineHeight ? "/" + lineHeight : '') + " " + fontFamily
                this.ctx.fillStyle = this.option.label.rich[key].color ? this.option.label.rich[key].color : this.option.label.color;


                this.ctx.fillText(text, rowWidth, totalHeigth)
                rowWidth += this.ctx.measureText(text).width
            }



            this.ctx.restore()
        })

    } else {
        // 普通文字
        var default_lineHeight = this.option.label.lineHeight
        content.forEach((text, i) => {
            totalHeigth += utils.formatPx(default_lineHeight,'option.label.lineHeight')
            rowWidth = this.ctx.measureText(text).width
            if (rowWidth > maxWidth) {
                maxWidth = rowWidth
            }
        })
        // 半总高 
        var halfHeight = totalHeigth / 2
        // 起始y
        var startY = halfHeight - utils.formatPx(default_lineHeight,'option.label.lineHeight')

        this.ctx.fillStyle = this.option.label.color;
        totalHeigth = 0;
        content.forEach((text, i) => {
            this.ctx.fillText(text, 0, -startY + totalHeigth)
            totalHeigth += utils.formatPx(default_lineHeight,'option.label.lineHeight')
        })
    }

    this.ctx.restore();
}
DonutChart.prototype.init = function (callback, titleFlag) {
    if (callback && typeof callback != 'function') {
        throw 'init() 第一个参数必须是函数'
    }
    if (titleFlag && typeof titleFlag != 'boolean') {
        throw 'labelCoverTitle 必须是boolean'
    }
    this.canvas.width = this.canvas.width
    this.drawTitle(titleFlag)
    this.ctx.translate(this.circleX, this.circleY);

    this.ctx.rotate(utils.angelToRadian(-90 + this.option.startAngle))
    this.ctx.lineWidth = this.lineWidth
    this.ctx.lineCap = this.option.capType
    var _this = this,
     _arcArray = [],
     _total = 0,
     _lastAngel = 0;

    this.data.forEach((item, index)=> {
        _total += item.value
        item.color = item.color || this.color[index]
    })
    if (_total == 0) {
        this.drawArc(0, 360, this.option.backgroundArc)
        return false;
    }
    if (this.option.type == "gauge") {
        if(this.option.data[0].value>100){
            throw 'this.option.data 里的 value 值不能大于100'
            return false;
        }
        _total = this.option.max
        this.drawArc(0, 360, this.option.backgroundArc)
    }
    
    
    this.data.sort(function(obj1,obj2){
        var val1 = obj1.value
        var val2 = obj2.value
        if(val1 > val2){
            return 1
        }else if(val1<val2){
            return -1
        }else{
            return 0 
        }
    })
    
    this.data.forEach((item, index) =>{
        var _arr,_num;
        if(item.value / _total == 1){
            _num = '100'
        }else{
            _arr = (item.value / _total).toFixed(4).toString().slice(2).split('') 
            _arr.splice(2, 0, '.')
            _num = _arr.join('')
        }
        
        _arcArray[index] = {
            index:index,
            name: item.name,
            value: item.value,
            startAngle: _lastAngel,
            endAngle: item.value / _total * 360 + _lastAngel,
            percent: _num + '%',
            color:item.color
        }
        _lastAngel = _arcArray[index].endAngle
    })

    _arcArray.forEach( (item, index) =>{                
        this.drawArc(item.startAngle, item.endAngle, item.color)        
    })
    
    for (var i = 0, l = _arcArray.length; i < l; i++) {
        if (_arcArray[i].value != 0) {
            this.drawArc(_arcArray[i].startAngle,_arcArray[i].startAngle+ 0.1, _arcArray[i].color)
        }
    }

    // 绑定事件
    this.canvas.onmousemove = function (e) {
        
        var x = e.offsetX - this.offsetWidth / 2
        var y = e.offsetY - this.offsetHeight / 2
        var x2 = x * x
        var y2 = y * y
        // 选中圆环
        if (Math.sqrt(x2 + y2) > (_this.radius - _this.lineWidth) * _this.rate && Math.sqrt(x2 + y2) < (_this.radius + _this.lineWidth) * _this.rate) {
            var angle = Math.atan2(x, -y) / (Math.PI / 180) > 0 ? Math.atan2(x, -y) / (Math.PI / 180) : 360 + Math.atan2(x, -y) / (Math.PI / 180)
            // 选中某段，显示某段

            for (var i = 0, l = _arcArray.length; i < l; i++) {
                if (angle < _arcArray[i].endAngle) {
                    _this.init(callback, _this.option.labelCoverTitle)
                    
                    _this.drawArc(_arcArray[i].startAngle, _arcArray[i].endAngle, _this.option.selectedStyle.color, _this.option.selectedStyle.borderWidth + _this.lineWidth)
                    _this.drawArc(_arcArray[i].startAngle, _arcArray[i].endAngle, _arcArray[i].color, _this.lineWidth)

                    // show label
                    var content = []
                    if (typeof _this.option.label.formatter == "function") {
                        content = utils.formatterToObject(_this.option.label.formatter(_arcArray[i]))
                    } else {
                        content = [_arcArray[i].name, _arcArray[i].value]
                    }
                    _this.drawLabel(content)
                    content = []
                    if (typeof _this.option.tooltip.formatter == "function") {
                        content = utils.formatterToObject(_this.option.tooltip.formatter(_arcArray[i]))
                    } else {
                        content = [_arcArray[i].name, _arcArray[i].value]
                    }
                    // show tip
                    _this.drawTip({
                        x: x / _this.rate,
                        y: y / _this.rate,
                        content: content
                    })

                    callback(_arcArray[i])
                    break;
                } else {
                    _this.init(callback)
                }
            }

        } else {
            _this.init(callback)
        }
    }
}