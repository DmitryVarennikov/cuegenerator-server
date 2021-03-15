import * as functions from 'firebase-functions';
import { Request, Response, NextFunction } from 'express';

export default function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  functions.logger.error(err.message, { url: req.originalUrl, reqMethod: req.method, reqBody: req.body, err });
  res.status(500).json({ error: err.message });
}
