import { firestore } from 'firebase-admin';

export type Counter = { value: number };
export type Cue = { performer: string; title: string; fileName: string; cue: string; createdAt: firestore.Timestamp };
