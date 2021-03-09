import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

firebase.initializeApp();
const increment = firebase.firestore.FieldValue.increment(1);
const db = firebase.firestore();

app.get('/', (req, res) => res.json());
app.post('/', async (req, res) => {
  const counterRef = db.collection('counter').doc('counter-id');
  counterRef.update({ value: increment });

  const counterDoc = await counterRef.get();
  /*@ts-ignore*/
  const { value: counter } = counterDoc.data();
  functions.logger.info('api.post', { value: counter });

  res.json({ counter });
});

export const api = functions.https.onRequest(app);
