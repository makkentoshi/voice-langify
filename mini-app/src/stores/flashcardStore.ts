import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FlashcardType } from '../types';
import { spanishFlashcardsData } from '../data/spanishData';

interface FlashcardState {
  flashcards: FlashcardType[];
  currentIndex: number;
  markAsLearned: (id: string) => void;
  markAsNotLearned: (id: string) => void;
  resetFlashcards: () => void;
  nextCard: () => void;
  previousCard: () => void;
}

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set) => ({
      flashcards: spanishFlashcardsData,
      currentIndex: 0,
      
      markAsLearned: (id) => set((state) => ({
        flashcards: state.flashcards.map((card) => 
          card.id === id ? { ...card, learned: true } : card
        ),
      })),
      
      markAsNotLearned: (id) => set((state) => ({
        flashcards: state.flashcards.map((card) => 
          card.id === id ? { ...card, learned: false } : card
        ),
      })),
      
      resetFlashcards: () => set({
        flashcards: spanishFlashcardsData,
        currentIndex: 0,
      }),
      
      nextCard: () => set((state) => ({
        currentIndex: (state.currentIndex + 1) % state.flashcards.length,
      })),
      
      previousCard: () => set((state) => ({
        currentIndex: state.currentIndex === 0
          ? state.flashcards.length - 1
          : state.currentIndex - 1,
      })),
    }),
    {
      name: 'spanish-flashcards',
    }
  )
);