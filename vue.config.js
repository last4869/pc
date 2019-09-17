const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  configureWebpack: config => {
    console.log(config)
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new BundleAnalyzerPlugin(),
          new TerserPlugin({
            sourceMap: process.env.NODE_ENV === 'development',
            terserOptions: {
              cache: true,
              compress: {
                drop_debugger: process.env.NODE_ENV === 'production',
                drop_console: process.env.NODE_ENV === 'production'
              }
            }
          })
        ]
      }
    }
  }
}
