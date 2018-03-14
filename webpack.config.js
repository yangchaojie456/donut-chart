var PROD = process.argv.indexOf('-p') >= 0;
var webpack = require('webpack');

module.exports = {
    entry: {
        'donut-chart': __dirname + '/index.js'
    },
    output: {
        libraryTarget: 'umd',
        library: ['DonutChart'],
        path: __dirname + '/dist',
        filename: PROD ? '[name].min.js' : '[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }]
    },
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ] : []
};