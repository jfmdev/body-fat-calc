// NOTE: the public path was changed to simplify deployment on GitHub Pages.
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/body-fat-calc/'
    : '/'
}