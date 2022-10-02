const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // 模式
  mode: 'none',
  resolve: {
    extensions: ['.ts', '.js'], //新增
  },
  // 入口
  entry: {
    // 不压缩版本
    ad: './src/ad-core/index.ts',
    // 压缩版本
    'ad.min': './src/ad-core/index.ts',
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
  module: {
    // 指定要加载的规则
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
  devServer: {
    hot: true,
  },
};
