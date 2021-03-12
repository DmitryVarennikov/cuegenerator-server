import * as firebase from 'firebase-admin';
import db from './DbGateway';

const FieldValue = firebase.firestore.FieldValue;

export default class SavedCuesRepo {
  addCue(cue: string) {
    return db.savedCues.add({
      cue,
      createdAt: FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
    });
  }
}
