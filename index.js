
import express from 'express';
import winston from 'winston';
import config from 'config';


import logging from './startup/logging.js'
import cors from './startup/cors.js';
import routes from './startup/routes.js';
import db from './startup/db.js';
import appConfig from './startup/config.js';
import validation from './startup/validation.js';
import prod from './startup/prod.js';

const app = express();

logging();
cors(app);
routes(app);
db();
appConfig();
validation();
prod();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

export default server;