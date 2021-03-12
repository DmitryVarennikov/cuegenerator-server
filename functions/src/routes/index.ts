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
router.get('/counter', async (req: Request, res: Response) => {
  const counter = await counterRepo.getCounter();
  res.json({ counter: counter?.value });
});
router.post('/counter', async (req: Request, res: Response) => {
  // const fileName = req.body.fileName || 'Untitled.cue';
  const cue = req.body.cue;
  if (cue) {
    // res.setHeader('Content-Type', 'application/octet-stream');
    // res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    // res.setHeader('Content-Length', Buffer.byteLength(cue, 'utf-8'));
    // res.write(cue, 'binary');
    // res.end();

    const counter = await counterRepo.incrementCounter();
    await savedCuesRepo.addCue(cue);

    res.json({ counter: counter?.value, cue });

    functions.logger.info('api.post', { counter: counter?.value, cue });
  } else {
    res.status(404).end();
  }
});

export default router;
