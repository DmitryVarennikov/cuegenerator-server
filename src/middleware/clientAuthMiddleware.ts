import { logger } from 'firebase-functions';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { API_SECRET } from '../config';

export default function clientAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  if ('options' === req.method.toLocaleLowerCase()) {
    next();
    return;
  }

  const token = extractToken(req.headers.authorization);
  try {
    verify(token, API_SECRET.value());
    next();
  } catch (e: unknown) {
    if (e instanceof Error && e.name !== 'TokenExpiredError') {
      logger.warn('Error while verifying jwt', { token, e });
    }
    res.status(401).json({ error: (e as Error).message });
  }
}

const extractToken = (bearerToken: string | undefined): string => (bearerToken || '').substring(7);
