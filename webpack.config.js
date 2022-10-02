const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // 入口
  entry: {
    // 不压缩版本
    ad: './src/ad-core/index.js',
    // 压缩版本
    'ad.min': './src/ad-core/index.js',
  },
  // 输出
  output: {
    path: path.join(__dirname, 'dist'),
    // 文件名
    filename: '[name].js',
    // 库名
    library: 'AD',
    //
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  // 模式
  mode: 'none',
  // 优化
  optimization: {
    // 是否压缩
    minimize: true,
    // 使用TerserPlugin覆盖压缩内容
    minimizer: [
      new TerserPlugin({
        // 匹配带min的js
        include: /\.min\.js$/,
      }),
    ],
  },
  // mode: 'development',
  // module: {
  //   rules: [
  //     {
  //       test: /.js$/,
  //       use: 'babel-loader',
  //     },
  //   ],
  // },
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
  devServer: {
    //   static: {
    //     // static: ['assets']
    //     directory: path.join(__dirname, 'src'),
    //   },
    hot: true,
  },
};
