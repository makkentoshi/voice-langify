import { Schema, model } from 'mongoose';
  import { SpanishPhrase } from '../interfaces';

  const spanishPhraseSchema = new Schema<SpanishPhrase>(
    {
      phrase: { type: String, required: true },
      translation: { type: String, required: true },
      category: { type: String, required: true }
    },
    { timestamps: true }
  );

  export const SpanishPhraseModel = model<SpanishPhrase>('SpanishPhrase', spanishPhraseSchema);