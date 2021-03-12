import { firestore } from 'firebase-admin';

export type Counter = { value: number };
export type Cue = { cue: string; createdAt: firestore.Timestamp };
