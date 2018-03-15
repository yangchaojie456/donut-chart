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
        title: {
            show:true,
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
            y: "50%",
        },
        tooltip: {
            show: true,
            fontSize: '24px',
            fontFamily: 'Arial',
            color: 'white'
        },
        x: "50%",
        y: "50%",
        radius: "30%",
        lineWidth: "5%",
        startAngle: 0,
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
        color:["#FF7F00","#FFFF00 ","#00FF00 ","#00FFFF ","#0000FF","#8B00FF","#FF0000 "],
        labelCoverTitle: true,
        backgroundArc:'#999'
    }
    this.option = utils.extend(true,this.option,option)
    if(this.option.color.length<this.option.data.length){
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
            this.ctx.fillText(this.option.title.text.value, utils.formatPercent(this.option.title.x,'option.title.x') * this.width, utils.formatPercent(this.option.title.y,'option.title.y') * this.height);
            return false;
        }
        this.ctx.fillText(this.option.title.text.value, utils.formatPercent(this.option.title.x,'option.title.x') * this.width, utils.formatPercent(this.option.title.y,'option.title.y') * this.height - 2 * utils.formatPx(this.option.title.text.fontSize, 'option.title.text.fontSize') / 3);
        this.ctx.beginPath();
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = this.option.title.secondText.color;
        this.ctx.font = this.option.title.secondText.fontSize + ' ' + this.option.title.secondText.fontFamily;
        this.ctx.fillText(this.option.title.secondText.value, utils.formatPercent(this.option.title.x,'option.title.x') * this.width, utils.formatPercent(this.option.title.y,'option.title.y') * this.height + 2 * utils.formatPx(this.option.title.secondText.fontSize, 'option.title.secondText.fontSize') / 3);
    }
}
DonutChart.prototype.drawTip = function (param) {
    if (!this.option.tooltip.show) {
        return false;
    }
    this.ctx.save()
    this.ctx.rotate(utils.angelToRadian(90 + this.option.startAngle))
    this.ctx.beginPath();
    this.ctx.font = this.option.tooltip.fontSize + ' ' + this.option.tooltip.fontFamily
    this.ctx.rect(param.x - 5, param.y - 5, this.ctx.measureText(param.data.name).width + 10, 2.5 * utils.formatPx(this.option.tooltip.fontSize) + 10);
    this.ctx.fillStyle = '#00000088'
    this.ctx.fill();
    this.ctx.fillStyle = this.option.tooltip.color;
    this.ctx.textAlign = "start";
    this.ctx.fillText(param.data.name, param.x, param.y + utils.formatPx(this.option.tooltip.fontSize))
    this.ctx.fillText(param.data.value + '(' + param.data.percent + ')', param.x, param.y + 2.2 * utils.formatPx(this.option.tooltip.fontSize))
    this.ctx.restore();
}
DonutChart.prototype.drawLabel = function (param) {
    if(!this.option.label.show){
        return false;
    }
    // 添加字体
    this.ctx.save()
    this.ctx.rotate(utils.angelToRadian(90 + this.option.startAngle))
    this.ctx.beginPath();
    this.ctx.fillStyle = this.label.firstTextStyle.color;
    this.ctx.font = this.label.firstTextStyle.fontSize + ' ' + this.label.firstTextStyle.fontFamily;
    this.ctx.textAlign = "center";
    this.ctx.fillText(param.name, 0, -2 * utils.formatPx(this.label.firstTextStyle.fontSize, 'label.firstTextStyle.fontSize') / 3);

    this.ctx.beginPath();
    this.ctx.fillStyle = this.label.secondTextStyle.color;
    this.ctx.font = this.label.secondTextStyle.fontSize + ' ' + this.label.secondTextStyle.fontFamily;
    this.ctx.fillText(param.value, 0, 2 * utils.formatPx(this.label.secondTextStyle.fontSize, 'label.secondTextStyle.fontSize') / 3);
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
    var _this = this
    this.arcArray = []
    var total = 0
    this.data.forEach(function (item, index) {
        total += item.value
    })
    if(total==0){
        this.drawArc(0, 360, this.option.backgroundArc)
        return false;
    }
    var lastAngel = 0
    this.data.forEach(function (item, index) {
        var arr = (item.value / total).toFixed(4).toString().slice(2).split('')
        arr.splice(2, 0, '.')
        var num = arr.join('')

        _this.arcArray[index] = {
            index: index,
            name: item.name,
            value: item.value,
            startAngle: lastAngel,
            endAngle: item.value / total * 360 + lastAngel,
            percent: num + '%'
        }
        lastAngel = _this.arcArray[index].endAngle
    })
    this.data.forEach(function (item, index) {
        _this.drawArc(_this.arcArray[index].startAngle, _this.arcArray[index].endAngle, _this.color[index])
    })
    for (var i = 0, l = this.data.length; i < l; i++) {
        if (this.data[i].value != 0) {
            this.drawArc(0, 0.05, this.color[i])
            break;
        }
    }

    // 绑定事件
    this.canvas.onmousemove = function (e) {

        var rate = _this.canvas[this.width > this.height ? "offsetHeight" : "offsetWidth"] / this[this.width > this.height ? "height" : "width"]
        
        var x = e.offsetX - this.offsetWidth / 2
        var y = e.offsetY - this.offsetHeight / 2
        var x2 = x * x
        var y2 = y * y
        // 选中圆环
        if (Math.sqrt(x2 + y2) > (_this.radius - _this.lineWidth) * rate && Math.sqrt(x2 + y2) < (_this.radius + _this.lineWidth) * rate) {
            var angle = Math.atan2(x, -y) / (Math.PI / 180) > 0 ? Math.atan2(x, -y) / (Math.PI / 180) : 360 + Math.atan2(x, -y) / (Math.PI / 180)
            // 选中某段，显示某段

            for (var i = 0, l = _this.arcArray.length; i < l; i++) {
                if (angle < _this.arcArray[i].endAngle) {
                    _this.init(callback, _this.option.labelCoverTitle)
                    _this.drawArc(_this.arcArray[i].startAngle, _this.arcArray[i].endAngle, _this.option.selectedStyle.color, _this.option.selectedStyle.borderWidth + _this.lineWidth)
                    _this.drawArc(_this.arcArray[i].startAngle, _this.arcArray[i].endAngle, _this.color[i], _this.lineWidth)

                    // show label
                    _this.drawLabel(_this.arcArray[i])
                    // show tip
                    _this.drawTip({
                        x: x/rate,
                        y: y/rate,
                        data: _this.arcArray[i]
                    })
                    
                    callback(_this.arcArray[i])
                    break;
                }
            }


        } else {
            _this.init(callback)
        }

    }

}
