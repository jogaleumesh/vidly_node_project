import winston from 'winston';
import 'express-async-errors';

export default function() {
  winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  // winston.add(winston.transports.MongoDB, {
  //   db: 'mongodb://localhost/vidly',
  //   level: 'info'
  // });
}