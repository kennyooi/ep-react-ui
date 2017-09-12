const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');


// exporter
module.exports = {
    context: path.resolve(__dirname, './doc/'),
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        publicPath: 'http://localhost:8000/dist/',
        filename: '[name].js',
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
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')({ browsers: ['last 2 versions'] }),
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [ 
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')({ browsers: ['last 2 versions'] }),
                            ]
                        }
                    },
                    'less-loader' 
                ]
            },
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
            __DEV__: JSON.stringify('true'),
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            React: 'react',
            PropTypes: 'prop-types',
            classNames: 'classnames',
        })
    ],
    externals: {
        "jquery": "jQuery"
    },
    devServer: {
        contentBase: path.join(__dirname, "doc"),
        host: 'localhost',
        port: 8000,
        hot: true,
        // headers: { "Access-Control-Allow-Origin": "*" }
    }
};