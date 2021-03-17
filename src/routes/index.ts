import * as functions from 'firebase-functions';
import express, { Router, Express, Request, Response, NextFunction } from 'express';
import { counterRepo, savedCuesRepo } from '../db';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const token = jwt.sign({}, TOKEN_SECRET, { expiresIn: '1h' });
  res.json({ token });
});
router.get('/counter', async (req: Request, res: Response) => {
  const counter = await counterRepo.getCounter();
  res.json({ counter: counter?.value });
});
router.get('/counter/subscribe', async (req: Request, res: Response) => {
  res.writeHead(200, { 'Content-Type': 'text/event-stream', Connection: 'keep-alive', 'Cache-Control': 'no-cache' });
  const onSnapshot = (snapshot: DocumentSnapshot) => {
    const counter = snapshot.data();
    const out = { counter: counter?.value };
    res.write(JSON.stringify(out));
  };
  const onError = (error: Error) => {
    // After an error, the listener will not receive any more events, and there is no need to detach your listener.
    // https://firebase.google.com/docs/firestore/query-data/listen
    functions.logger.error('Error while listening to firebase counterRef', { error });
  };
  const unsubscribe = counterRepo.counterRef.onSnapshot(onSnapshot, onError);
  req.on('close', () => unsubscribe());
});
router.post('/counter', async (req: Request, res: Response) => {
  const { performer, title, fileName, cue } = req.body;
  let counter;

  if (performer && title && fileName && cue) {
    counter = await counterRepo.incrementCounter();
    await savedCuesRepo.addCue(performer, title, fileName, cue);
  } else {
    counter = await counterRepo.getCounter();
  }

  res.json({ counter: counter?.value });
  functions.logger.info('api.post', { counter: counter?.value, performer, title, fileName, cue });
});

export default router;
