import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, GameQuestion } from '../types';

interface GameStoreState {
  state: GameState;
  questions: GameQuestion[];
  updateScore: (points: number) => void;
  updateStreak: (correct: boolean) => void;
  resetGame: () => void;
  addQuestion: (question: GameQuestion) => void;
}

const initialQuestions: GameQuestion[] = [
  {
    id: '1',
    question: 'What is the capital of Spain?',
    options: ['Barcelona', 'Madrid', 'Valencia', 'Seville'],
    correctAnswer: 'Madrid',
    category: 'travel',
    points: 10,
  },
  {
    id: '2',
    question: 'Which of these is a traditional Spanish dish?',
    options: ['Pizza', 'Sushi', 'Paella', 'Burger'],
    correctAnswer: 'Paella',
    imageUrl: 'https://images.pexels.com/photos/4553111/pexels-photo-4553111.jpeg',
    category: 'food',
    points: 10,
  },
];

const initialState: GameState = {
  currentScore: 0,
  highScore: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  streak: 0,
  lastPlayed: '',
  achievements: [],
};

export const useGameStore = create<GameStoreState>()(
  persist(
    (set) => ({
      state: initialState,
      questions: initialQuestions,
      
      updateScore: (points) => set((state) => ({
        state: {
          ...state.state,
          currentScore: state.state.currentScore + points,
          highScore: Math.max(state.state.highScore, state.state.currentScore + points),
        },
      })),
      
      updateStreak: (correct) => set((state) => ({
        state: {
          ...state.state,
          streak: correct ? state.state.streak + 1 : 0,
          questionsAnswered: state.state.questionsAnswered + 1,
          correctAnswers: correct ? state.state.correctAnswers + 1 : state.state.correctAnswers,
        },
      })),
      
      resetGame: () => set((state) => ({
        state: {
          ...initialState,
          highScore: state.state.highScore,
        },
      })),
      
      addQuestion: (question) => set((state) => ({
        questions: [...state.questions, question],
      })),
    }),
    {
      name: 'language-learning-game',
    }
  )
);