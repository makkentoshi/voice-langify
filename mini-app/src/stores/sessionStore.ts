import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LearningSession } from '../types';

interface SessionState {
  currentSession: LearningSession | null;
  sessions: LearningSession[];
  startSession: () => void;
  endSession: (data: Partial<LearningSession>) => void;
  getAverageScore: () => number;
  getTotalLearningTime: () => number;
}

const initialState: LearningSession = {
  startTime: 0,
  endTime: 0,
  duration: 0,
  wordsLearned: 0,
  phrasesLearned: 0,
  score: 0,
  mistakes: 0,
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      sessions: [],
      
      startSession: () => set({
        currentSession: {
          ...initialState,
          startTime: Date.now(),
        },
      }),
      
      endSession: (data) => set((state) => {
        if (!state.currentSession) return state;
        
        const endTime = Date.now();
        const duration = endTime - state.currentSession.startTime;
        
        const completedSession = {
          ...state.currentSession,
          ...data,
          endTime,
          duration,
        };
        
        return {
          currentSession: null,
          sessions: [...state.sessions, completedSession],
        };
      }),
      
      getAverageScore: () => {
        const { sessions } = get();
        if (sessions.length === 0) return 0;
        return sessions.reduce((acc, session) => acc + session.score, 0) / sessions.length;
      },
      
      getTotalLearningTime: () => {
        const { sessions } = get();
        return sessions.reduce((acc, session) => acc + session.duration, 0);
      },
    }),
    {
      name: 'language-learning-sessions',
    }
  )
);