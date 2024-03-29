process.env.NODE_ENV = process.env.FUNCTIONS_EMULATOR ? 'development' : 'production';

import 'source-map-support/register';
import { runWith } from 'firebase-functions';
import express from 'express';
import 'express-async-errors';
import router from './routes';
import errorMiddleware from './middleware/errorMiddleware';
import clientAuthMiddleware from './middleware/clientAuthMiddleware';
import CORSMiddleware from './middleware/CORSMiddleware';
import { API_SECRET } from './config';

const app = express();
app.use(express.json());

app.use(CORSMiddleware);
// enable pre-flight for all routes
app.options('*', CORSMiddleware);

app.use('/counter', clientAuthMiddleware);
app.use('/', router);

app.use(errorMiddleware);

export const api = runWith({ secrets: [API_SECRET.name] }).https.onRequest(app);
