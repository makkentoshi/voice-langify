import { Context, SessionFlavor } from "grammy";
import { ConversationFlavor } from "@grammyjs/conversations";

export interface SessionData {
  key: string;
  exam?: {
    topic: string;
    part: number;
    answers: string[];
    questionIndex: number;
  };
  transcript?: string;
  language?: string;
}

export interface User {
  userId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpanishPhrase {
  phrase: string;
  translation: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpanishTense {
  name: string;
  example: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BotContext = Context &
  SessionFlavor<SessionData> &
  ConversationFlavor<Context>;
