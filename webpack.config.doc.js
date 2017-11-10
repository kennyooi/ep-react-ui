const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


// exporter
module.exports = {
    context: path.resolve(__dirname, './doc/'),
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, './docs/'),
        // publicPath: '/',
        filename: 'bundle.js',
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'less-loader' 
                    ]
                })
            },
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        // ignore unused bundle
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // webpack helpers
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: JSON.stringify('false'),
        }),
        new ExtractTextPlugin({ filename: 'bundle.css', allChunks: true }),
        // new webpack.optimize.UglifyJsPlugin(),
        // new BundleAnalyzerPlugin({ analyzerMode: 'static' })
        // base HTML 
        new HtmlWebpackPlugin({
            template: './index.html',
        })
    ],
    externals: {

    },
};