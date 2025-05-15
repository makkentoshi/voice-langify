export type Language = "english" | "spanish";

export type Category =
  | "animals"
  | "food"
  | "travel"
  | "business"
  | "daily"
  | "culture";

export type DialogWord = {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  category: Category;
  audio?: string;
  example: string;
  imageUrl?: string;
};

export type DialogPhrase = {
  id: string;
  phrase: string;
  translation: string;
  situation: string;
  audio?: string;
  category: Category;
};

export type GameQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  imageUrl?: string;
  category: Category;
  points: number;
};

export type VocabularyItem = {
  id: string;
  term: string;
  translation: string;
  category: Category;
  imageUrl?: string;
  example: string;
  learned: boolean;
};

export type UserProgress = {
  words: {
    [key in Category]: {
      completed: number;
      total: number;
    };
  };
  phrases: {
    [key in Category]: {
      completed: number;
      total: number;
    };
  };
  games: {
    totalScore: number;
    questionsAnswered: number;
    correctAnswers: number;
  };
  vocabulary: {
    [key in Category]: {
      learned: number;
      total: number;
    };
  };
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  unlocked: boolean;
  category: "beginner" | "intermediate" | "advanced";
  reward?: {
    type: "points" | "badge" | "feature";
    value: string | number;
  };
};

export type IeltsQuestion = {
  id: string;
  text: string;
  category: "part1" | "part2" | "part3";
  example?: string;
  tips?: string[];
};

export type FlashcardType = {
  id: string;
  term: string;
  definition: string;
  audio?: string;
  learned: boolean;
};

export type GrammarItem = {
  id: string;
  title: string;
  explanation: string;
  examples: {
    spanish: string;
    english: string;
  }[];
};

export type ProgressData = {
  english: {
    ieltsQuestionsCompleted: number;
    ieltsQuestionsTotal: number;
    vocabulary: {
      [key in Category]: {
        learned: number;
        total: number;
      };
    };
  };
  spanish: {
    flashcardsLearned: number;
    flashcardsTotal: number;
    grammarCompleted: number;
    grammarTotal: number;
    vocabulary: {
      [key in Category]: {
        learned: number;
        total: number;
      };
    };
  };
};

export type GameState = {
  currentScore: number;
  highScore: number;
  questionsAnswered: number;
  correctAnswers: number;
  streak: number;
  lastPlayed: string;
  achievements: Achievement[];
};

export type LearningSession = {
  startTime: number;
  endTime: number;
  duration: number;
  wordsLearned: number;
  phrasesLearned: number;
  score: number;
  mistakes: number;
};
