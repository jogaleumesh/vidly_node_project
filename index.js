import config from 'config'
import express from 'express';
import mongoose from 'mongoose';
import 'express-async-errors';
import 'winston-mongodb';
import winston from 'winston';

import home from './routes/home.js';
import genres from './routes/genres.js';
import customers from './routes/customers.js';
import movies from './routes/movies.js';
import rentals from './routes/rentals.js';
import users from './routes/users.js';
import auth from './routes/auth.js';
import error from './middleware/error.js';

const app = express();

winston.handleExceptions(new winston.transport.File({filename: 'unhandledExceptions.log' }));

process.on('unhandledRejection', (ex)=>{
  throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" , level:'info'}));

const p = Promise.reject(new Error('Something went wrong during startup'));
p.then(() => console.log('Done'));

if(!config.get('jwtPrivateKey')){
  console.error('Fatal Error: jwtPrivateKey is required.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
  .then(() => console.log('Connected to MongoDb...'))
  .catch(() => console.error('Could not connect to MongoDb...'));

app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));