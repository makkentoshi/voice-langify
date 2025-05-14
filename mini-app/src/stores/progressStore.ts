import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProgressData } from '../types';

interface ProgressState {
  progress: ProgressData;
  updateEnglishProgress: (completed: number, total: number) => void;
  updateSpanishFlashcards: (learned: number, total: number) => void;
  updateSpanishGrammar: (completed: number, total: number) => void;
  resetProgress: () => void;
}

const initialProgress: ProgressData = {
  english: {
    ieltsQuestionsCompleted: 0,
    ieltsQuestionsTotal: 30, // Initial total IELTS questions
  },
  spanish: {
    flashcardsLearned: 0,
    flashcardsTotal: 50, // Initial total flashcards
    grammarCompleted: 0,
    grammarTotal: 10, // Initial total grammar items
  },
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: initialProgress,
      
      updateEnglishProgress: (completed, total) => set((state) => ({
        progress: {
          ...state.progress,
          english: {
            ieltsQuestionsCompleted: completed,
            ieltsQuestionsTotal: total,
          },
        },
      })),
      
      updateSpanishFlashcards: (learned, total) => set((state) => ({
        progress: {
          ...state.progress,
          spanish: {
            ...state.progress.spanish,
            flashcardsLearned: learned,
            flashcardsTotal: total,
          },
        },
      })),
      
      updateSpanishGrammar: (completed, total) => set((state) => ({
        progress: {
          ...state.progress,
          spanish: {
            ...state.progress.spanish,
            grammarCompleted: completed,
            grammarTotal: total,
          },
        },
      })),
      
      resetProgress: () => set({ progress: initialProgress }),
    }),
    {
      name: 'language-learning-progress',
    }
  )
);