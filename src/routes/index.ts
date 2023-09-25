import * as functions from 'firebase-functions';
import express, { Request, Response } from 'express';
import { counterRepo, savedCuesRepo } from '../db';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const token = jwt.sign({}, TOKEN_SECRET, { expiresIn: '1h' });
  res.json({ token });
});
router.get('/counter', async (req: Request, res: Response) => {
  const counter = await counterRepo.getCounter();
  res.json({ counter: counter?.value });
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
