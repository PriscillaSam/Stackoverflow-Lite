import express from 'express';
import dotenv from 'dotenv';
import router from './server/routes/index';
import cleanStrings from './server/middleware/cleanStrings';
import errorHandler from './server/middleware/error-handler';


dotenv.config();
const app = express();

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

app.use(errorHandler);


const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Port started on ${port}`);

export default app;
