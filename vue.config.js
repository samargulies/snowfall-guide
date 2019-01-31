const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.EnvironmentPlugin([
        'DARK_SKY_KEY',
      ]),
    ],
  },
};
