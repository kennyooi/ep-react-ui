const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// exporter
module.exports = {
    context: path.resolve(__dirname, './sample/'),
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, './docs/'),
        // publicPath: '/',
        filename: 'bundle.js'
    },
    stats: {
        colors  : true,
        reasons : true
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        // Hot module
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // ignore unused bundle
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // webpack helpers
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __DEV__: JSON.stringify('true')
        }),
        // base HTML
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    externals: {

    },
    devServer: {
        contentBase: path.join(__dirname, 'docs'),
        host: 'localhost',
        port: 8080,
        hot: true
        // headers: { 'Access-Control-Allow-Origin': '*' }
    }
};