import { firestore } from 'firebase-admin';
import db from './DbGateway';

const FieldValue = firestore.FieldValue;

export default class SavedCuesRepo {
  addCue(performer: string, title: string, fileName: string, cue: string) {
    return db.savedCues.add({
      performer,
      title,
      fileName,
      cue,
      createdAt: FieldValue.serverTimestamp() as firestore.Timestamp,
    });
  }
}
