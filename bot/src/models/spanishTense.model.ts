import { Schema, model } from 'mongoose';
  import { SpanishTense } from '../interfaces';

  const spanishTenseSchema = new Schema<SpanishTense>(
    {
      name: { type: String, required: true },
      example: { type: String, required: true }
    },
    { timestamps: true }
  );

  export const SpanishTenseModel = model<SpanishTense>('SpanishTense', spanishTenseSchema);