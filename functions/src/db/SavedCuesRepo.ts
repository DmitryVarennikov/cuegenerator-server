import * as firebase from 'firebase-admin';
import db from './DbGateway';

const FieldValue = firebase.firestore.FieldValue;

export default class SavedCuesRepo {
  addCue(performer: string, title: string, fileName: string, cue: string) {
    return db.savedCues.add({
      performer,
      title,
      fileName,
      cue,
      createdAt: FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
    });
  }
}
