import { Schema, model } from 'mongoose';
  import { User } from '../interfaces';

  const userSchema = new Schema<User>(
    {
      userId: { type: Number, required: true, unique: true },
      username: { type: String },
      firstName: { type: String },
      lastName: { type: String }
    },
    { timestamps: true }
  );

  export const UserModel = model<User>('User', userSchema);