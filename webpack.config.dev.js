import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.config.common';

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './view/dist',
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify('http://localhost:3000/api/v1'),
      },
    }),
  ],
});
