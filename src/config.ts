import { defineSecret } from 'firebase-functions/params';

export const API_SECRET = defineSecret('API_SECRET');

export const allowedOrigins = [
  'http://localhost',
  'https://cuegenerator.firebaseapp.com',
  'https://cuegenerator.web.app',
  'https://cuegenerator-v3.firebaseapp.com',
  'https://cuegenerator-v3.web.app',
  'https://cuegenerator.net',
];
