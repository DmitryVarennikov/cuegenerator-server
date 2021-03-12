process.env.NODE_ENV = process.env.FUNCTIONS_EMULATOR ? 'development' : 'production';

import * as functions from 'firebase-functions';
import express from 'express';
import 'express-async-errors';
import router from './routes';
import errorMiddleware from './middleware/errorMiddleware';

const app = express();
app.use(express.json());
app.use('/', router);
app.use(errorMiddleware);

export const api = functions.https.onRequest(app);
