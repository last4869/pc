const TerserPlugin = require('terser-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')

module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: false
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, 'dist'),
            routes: ['/']
          }),
          new TerserPlugin({
            parallel: true,
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
