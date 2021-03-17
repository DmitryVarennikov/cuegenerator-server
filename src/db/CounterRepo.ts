import * as firebase from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { Cue } from '../types';
import db from './DbGateway';

const FieldValue = firebase.firestore.FieldValue;

export default class CounterRepo {
  static readonly DOC_ID = 'counter-id';
  public readonly counterRef = db.counter.doc(CounterRepo.DOC_ID);

  async getCounter() {
    return (await this.counterRef.get()).data();
  }

  async incrementCounter() {
    await this.counterRef.update({ value: FieldValue.increment(1) });
    return this.getCounter();
  }
  
}