import * as firebase from 'firebase-admin';
import { Counter, Cue } from '../types';

firebase.initializeApp();

const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => snap.data() as T,
});

const mount = <T>(collectionPath: string) =>
  firebase.firestore().collection(collectionPath).withConverter(converter<T>());

// guard production db collection names
const formatName = (name: string): string =>
  process.env.NODE_ENV === 'production' ? name : `${name}_${process.env.NODE_ENV}`;

const db = {
  counter: mount<Counter>(formatName('counter')),
  savedCues: mount<Cue>(formatName('savedCues')),
};

export default db;
