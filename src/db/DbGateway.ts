import { firestore } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { Counter, Cue } from '../types';
import { DocumentData, QueryDocumentSnapshot, WithFieldValue } from 'firebase-admin/firestore';

initializeApp();

const converter = <Model>() => ({
  toFirestore: (modelObject: WithFieldValue<Model>) => modelObject as DocumentData,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Model,
});

const mount = <Model>(collectionPath: string) =>
  firestore().collection(collectionPath).withConverter(converter<Model>());

// guard production db collection names
const formatName = (name: string): string =>
  process.env.NODE_ENV === 'production' ? name : `${name}_${process.env.NODE_ENV}`;

const db = {
  counter: mount<Counter>(formatName('counter')),
  savedCues: mount<Cue>(formatName('savedCues')),
};

export default db;
