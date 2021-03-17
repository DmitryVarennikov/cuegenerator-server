import * as functions from 'firebase-functions';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config';

export default function clientAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  if ('options' === req.method.toLocaleLowerCase()) {
    next();
    return;
  }

  const token = extractTokenFromRequest(req);
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

type ExtractTokenStrategyType = (req: Request) => string;
const extractTokenStrategies: ExtractTokenStrategyType[] = [
  (req: Request) => (req.headers.authorization || '').substr(7),
  (req: Request) => (req.query.authorization as string) || '',
];
const extractTokenFromRequest = (req: Request): string => {
  let token = '';
  for (const strategy of extractTokenStrategies) {
    token = strategy(req);
    if (token) break;
  }
  return token;
};
