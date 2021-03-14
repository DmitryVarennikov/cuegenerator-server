import * as functions from 'firebase-functions';

export const TOKEN_SECRET = functions.config().token.secret;
export const allowedOrigins = [
  'http://localhost:3000',
  'https://cuegenerator.firebaseapp.com/',
  'https://cuegenerator.web.app/',
  'https://cuegenerator.net',
];
