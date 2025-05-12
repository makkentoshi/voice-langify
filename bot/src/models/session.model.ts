import { Schema, model } from 'mongoose';
  import { SessionData } from '../interfaces';

  const sessionSchema = new Schema<SessionData>(
    {
      key: { type: String, required: true, unique: true },
      exam: {
        topic: { type: String },
        part: { type: Number },
        answers: [{ type: String }],
        questionIndex: { type: Number }
      },
      transcript: { type: String },
      language: { type: String }
    },
    { timestamps: true }
  );

  export const SessionModel = model<SessionData>('Session', sessionSchema);