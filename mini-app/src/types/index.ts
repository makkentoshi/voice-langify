export type Language = 'english' | 'spanish';

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
  examples: Array<{
    spanish: string;
    english: string;
  }>;
};

export type IeltsQuestion = {
  id: string;
  text: string;
  category: 'part1' | 'part2' | 'part3';
};

export type ProgressData = {
  english: {
    ieltsQuestionsCompleted: number;
    ieltsQuestionsTotal: number;
  };
  spanish: {
    flashcardsLearned: number;
    flashcardsTotal: number;
    grammarCompleted: number;
    grammarTotal: number;
  };
};