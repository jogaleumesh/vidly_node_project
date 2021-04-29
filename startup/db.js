import mongoose from 'mongoose';
import winston from 'winston';
import config from 'config';

export default function() {
  mongoose.set('useCreateIndex', true)
  mongoose.set('useUnifiedTopology', true)
  mongoose.set('useNewUrlParser', true)
  const db = config.get('db');
  mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));
}