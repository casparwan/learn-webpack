const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: {
        bundle: './src/index.js',
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'build')
    },
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /node_modules/,
                    chunks:'all',
                    priority: 10
                },
                common: {
                    name: 'common',
                    test: /src/,
                    chunks:'all',
                    priority: 5
                },
            }
        }
    },
    devtool: devMode ? 'source-map' : 'cheap-eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 5678,
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": {
                                    "chrome": "58",
                                    "ie": "11"
                                },
                                "modules": false,
                            }],
                            ['@babel/preset-react']
                        ],
                        "plugins": [
                            [
                                "@babel/plugin-transform-runtime"
                            ]
                        ]
                    },

                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                    options: {
                        modules: true,
                        //localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        sourceMap: true,
                    }
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css'
        }),
        new BundleAnalyzerPlugin()
    ]
}