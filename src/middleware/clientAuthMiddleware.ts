import * as functions from 'firebase-functions';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config';

export default function clientAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  if ('options' === req.method.toLocaleLowerCase()) {
    next();
    return;
  }

  const token = extractToken(req.headers.authorization);
  try {
    jwt.verify(token, TOKEN_SECRET);
    next();
  } catch (e) {
    if (e.name !== 'TokenExpiredError') {
      functions.logger.warn('Error while verifying jwt', { token, e });
    }
    res.status(401).json({ error: e.message });
  }
}

const extractToken = (bearerToken: string | undefined): string => (bearerToken || '').substr(7);
