import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import webpack from 'webpack';
import webpackdevmiddleware from 'webpack-dev-middleware';
import path from 'path';

import router from './server/routes/index';
import cleanStrings from './server/middleware/cleanStrings';
import errorHandler from './server/middleware/errorHandler';
import devConfig from './webpack.config.dev';
import prodConfig from './webpack.config.prod';

dotenv.config();
const app = express();

let config = devConfig;
if (process.env.NODE_ENV === 'production') {
  config = prodConfig;
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cleanStrings);

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to stackoverflow-LITE',
  });
});

app.use('/api/v1', router);

if (process.env.NODE_ENV !== 'test') {
  app.use(webpackdevmiddleware(webpack(config),
    { publicPath: config.output.publicPath }));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './view/src/index.html'));
  });
}


app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Port started on ${port}`);
});

app.use('/', express.static('client'));
export default app;
