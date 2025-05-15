import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DialogWord, DialogPhrase, Category } from '../types';

interface DialogState {
  words: DialogWord[];
  phrases: DialogPhrase[];
  addWord: (word: DialogWord) => void;
  addPhrase: (phrase: DialogPhrase) => void;
  markWordLearned: (id: string) => void;
  markPhraseLearned: (id: string) => void;
  getWordsByCategory: (category: Category) => DialogWord[];
  getPhrasesByCategory: (category: Category) => DialogPhrase[];
}

const initialWords: DialogWord[] = [
  {
    id: '1',
    word: 'Tapas',
    translation: 'Small Spanish appetizers',
    pronunciation: 'TAH-pahs',
    category: 'food',
    audio: 'https://example.com/audio/tapas.mp3',
    example: 'Let\'s go out for tapas tonight!',
    imageUrl: 'https://images.pexels.com/photos/5175537/pexels-photo-5175537.jpeg',
  },
  {
    id: '2',
    word: 'Flamenco',
    translation: 'Traditional Spanish dance',
    pronunciation: 'flah-MEN-koh',
    category: 'culture',
    audio: 'https://example.com/audio/flamenco.mp3',
    example: 'We watched a beautiful flamenco performance in Seville.',
    imageUrl: 'https://images.pexels.com/photos/6914069/pexels-photo-6914069.jpeg',
  },
];

const initialPhrases: DialogPhrase[] = [
  {
    id: '1',
    phrase: '¿Dónde está la Plaza Mayor?',
    translation: 'Where is the main square?',
    situation: 'Asking for directions',
    audio: 'https://example.com/audio/plaza-mayor.mp3',
    category: 'travel',
  },
  {
    id: '2',
    phrase: '¡Qué rico está todo!',
    translation: 'Everything is so delicious!',
    situation: 'Dining out',
    audio: 'https://example.com/audio/que-rico.mp3',
    category: 'food',
  },
];

export const useDialogStore = create<DialogState>()(
  persist(
    (set, get) => ({
      words: initialWords,
      phrases: initialPhrases,
      
      addWord: (word) => set((state) => ({
        words: [...state.words, word],
      })),
      
      addPhrase: (phrase) => set((state) => ({
        phrases: [...state.phrases, phrase],
      })),
      
      markWordLearned: (id) => set((state) => ({
        words: state.words.map((word) =>
          word.id === id ? { ...word, learned: true } : word
        ),
      })),
      
      markPhraseLearned: (id) => set((state) => ({
        phrases: state.phrases.map((phrase) =>
          phrase.id === id ? { ...phrase, learned: true } : phrase
        ),
      })),
      
      getWordsByCategory: (category) => {
        return get().words.filter((word) => word.category === category);
      },
      
      getPhrasesByCategory: (category) => {
        return get().phrases.filter((phrase) => phrase.category === category);
      },
    }),
    {
      name: 'language-learning-dialog',
    }
  )
);