import * as functions from 'firebase-functions';
import express, { Router, Express, Request, Response, NextFunction } from 'express';
import { counterRepo, savedCuesRepo } from '../db';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const token = jwt.sign({}, TOKEN_SECRET, { expiresIn: '1h' });
  res.json({ token });
});
router.post('/', async (req: Request, res: Response) => {
  const counter = await counterRepo.incrementCounter();
  res.json({ counter: counter?.value });

  if (req.body.cue) {
    await savedCuesRepo.addCue(req.body.cue);
  }
  functions.logger.info('api.post', { counter: counter?.value, cue: req.body.cue });
});

export default router;
