const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HappyPack = require('happypack');
const os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const CopyPlugin = require('copy-webpack-plugin');


const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    bundle: './src/index.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[hash].js',
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'src/utils'),
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'components'),
    },
    modules: [
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ],
  },
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          chunks: 'all',
          priority: 10,
        },
        common: {
          name: 'common',
          test: /src/,
          chunks: 'all',
          priority: 5,
        },
      },
    },
  },
  devtool: devMode ? 'source-map' : 'cheap-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
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
        include: path.resolve(__dirname, 'src'),
        use: {
          // loader: 'babel-loader',
          loader: 'happypack/loader?id=js',

        },
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
          options: {
            sourceMap: true,
          },
        }],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
          options: {
            modules: true,
            // localIdentName: '[path][name]__[local]--[hash:base64:5]',
            sourceMap: true,
          },
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            javascriptEnabled: true,
          },
        }],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'assets/[name].[ext]',
              limit: 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { // 压缩 jpeg 的配置
                progressive: true,
                quality: [0.65,0.7]
              },
              optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                enabled: false,
              },
              pngquant: { // 使用 imagemin-pngquant 压缩 png
                quality: [0.65,0.9],
                speed: 4
              },
              gifsicle: { // 压缩 gif 的配置
                interlaced: false,
              },
              webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                quality: [0.99,1]
              },
            }
          },
        ],
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CopyPlugin([{
      from: path.resolve(__dirname, 'static/dll'),
      to: path.resolve(__dirname, 'dist')
    }]),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      ],
    }),
    // new BundleAnalyzerPlugin(),
    new Webpack.DllReferencePlugin({
      context: path.resolve(__dirname),
      manifest: require('./vendors-manifest.json'),
    }),
  ],
   
};

if (!devMode) {
  //module.exports.plugins.push(new BundleAnalyzerPlugin());
  module.exports.plugins.push(new CleanWebpackPlugin());
}
