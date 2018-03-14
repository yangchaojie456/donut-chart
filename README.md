## 声明

> 市场上虽然有各种基于canvas的图表工具，比如echarts.js ,chart.js。他们功能都很强大，性能也比较优秀。但是饼形图或环形图中并没有以圆角为交界的图表。

![demo](./example/images/image.png)

> **本插件使用canvas可以帮助你快速创建一个以圆角交界的环形图**
## 兼容性
> 适用于所有主流浏览器及移动端的浏览器。**IE8及以下不支持**
## demo
>> http://www.yangchaojie.top/plugin/donut-chart
## 用法
>> 首先需要一个canvas做载体
```html
    <canvas id="myCanvas" width="750" height="600"></canvas>
```
>> 然后创建环形图对象
```javascript
    var cir = new DonutChart('myCanvas', option)
```
>> 最后初始化并且可以指定回调函数
```javascript
    cir.init(function (result) {
        // result 选中的选区的相关信息
    })
```
## 参数
>> option 示例 (默认值)
```javascript
    var option = {
        title: {
            show:true, // 标题是否显示，默认为true
            text: {           // 主标题
                value: '',// 必填
                color: '#999',
                fontSize: '30px',
                fontFamily: 'Arial'
            },
            secondText: {   // 副标题(可选)
                value: '', //(有副标题)必填
                color: '#666',
                fontSize: '30px',
                fontFamily: 'Arial'
            },
            x: '50%',   // 标题位置
            y: "50%",   
        },
        tooltip: {      // 提示框
            show: true, 
            fontSize: '24px',
            fontFamily: 'Arial',
            color: 'white'
        },
        x: "50%",   // 环形图位置
        y: "50%",
        radius: "30%", // 环形图半径
        lineWidth: "5%", // 环形图宽度
        startAngle: 0, // 起始角度
        data: [{
            name: "", // 环形图一块的名字
            value: ,// 环形图一块的值
        },{
            name: "", // 
            value: ,
        }],
        label: {  // 标签 样式
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
        capType: "round", // 圆角交界 |  butt 平角
        selectedStyle: {    // 选中环形图一块时的样式
            color: "white",
            borderWidth: 10
        },
        color:["#FF7F00","#FFFF00 ","#00FF00 ","#00FFFF ","#0000FF","#8B00FF","#FF0000 "], // 环形图每块分配的颜色
        labelCoverTitle: true // 标签是否覆盖标题
    }
```