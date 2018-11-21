import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.config.common';

export default merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify('https://so-lite.herokuapp.com/api/v1'),
      },
    }),
  ],
});
