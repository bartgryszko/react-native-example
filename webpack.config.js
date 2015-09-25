var path = require('path');
var webpack = require('webpack');

var config = {

  debug: true,

  devtool: 'source-map',

  entry: {
    'index.ios': [
      // './node_modules/react-native-browser-polyfill/polyfills/globalself.js',
      // './node_modules/whatwg-fetch/fetch.js',
      './src/main.js'
    ]
  },

  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  resolve: {
    root: [path.join(__dirname, 'src')],
    extensions: ['', '.js', '.jsx', '.json']
  },

  module: {
    loaders: [
      {
        test: /(\.jsx?$)/,
        include: [
          path.resolve(__dirname, 'src')
          // /react-native-keyboardevents/,
          // /react-native-linear-gradient/,
          // /react-native-device/,
          // /react-native-slider/,
          // /react-native-icons/,
          // /react-native-orientation/,
          // /react-native-scrollview-lazyload/,
          // /react-native-google-analytics/
        ],
        loaders: ['babel?stage=0&blacklist=validation.react&optional=runtime']
      },
      {
        test: /(\.json$)/,
        loaders: ['json']
      }
    ]
  },

  plugins: []

};

var WEBPACK_HOST = process.env.WEBPACK_HOST || 'localhost';
config.output.publicPath = 'http://' + WEBPACK_HOST + ':8082/';

// Hot loader
if (process.env.HOT) {

  config.devtool = 'eval'; // Speed up incremental builds
  config.entry['index.ios'].unshift('react-native-webpack-server/hot/entry');
  config.entry['index.ios'].unshift('webpack/hot/only-dev-server');
  config.entry['index.ios'].unshift('webpack-dev-server/client?http://' + WEBPACK_HOST + ':8082');
  config.module.loaders[0].loaders.unshift('react-hot');
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}

// Production config
if (process.env.NODE_ENV === 'production') {
  // config.plugins.push(new webpack.DefinePlugin({
  //   NODE_ENV: JSON.stringify('production')
  // }));

  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
