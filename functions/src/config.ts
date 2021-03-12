import * as functions from 'firebase-functions';

export const TOKEN_SECRET = functions.config().token.secret;
