import express from 'express'; 
import logger from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// imported routes for our app
import homeRoute from './routes/homeRoute';
import tasksRoute from './routes/tasksRoute';
import { sequelize } from '../models';
// configure dotenv
dotenv.config();

// initialize express app
const app = express();

// bodyParser
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: 'true' }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


// use routes
app.use(homeRoute);
app.use(tasksRoute);

// Development logger(Morgan)
if (app.get('env') === 'development'){
  app.use(logger('dev'));
  console.log('Morgan logger is enabled ...');
}

// Port and hostname
const port = process.env.APP_PORT;
const hostname = process.env.HOST_NAME;

// app listening to requests setup
app.listen(port, ()=>{
  console.log(`Server running at http://${hostname}:${port}/..`);
  sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.log(err);
  });
});