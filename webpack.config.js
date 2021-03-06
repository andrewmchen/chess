module.exports = {
  entry: './js/main.js',
  output: {
    filename: './build/bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules)/,
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.json$/, loader: 'json' }
    ]
  }
};
