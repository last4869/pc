const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')

module.exports = {
  configureWebpack: config => {
    console.log(config)
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new PrerenderSPAPlugin({
            // Required - The path to the webpack-outputted app to prerender.
            staticDir: path.join(__dirname, 'dist'),
            // Required - Routes to render.
            routes: [ '/', '/home', '/bangumi' ]
          }),
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
