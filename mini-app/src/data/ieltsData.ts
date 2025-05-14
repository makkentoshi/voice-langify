import type { IeltsQuestion } from '../types';

export const ieltsQuestions: IeltsQuestion[] = [
  // Part 1 - Introduction and Interview
  {
    id: 'p1-1',
    text: 'Can you tell me something about your hometown?',
    category: 'part1',
  },
  {
    id: 'p1-2',
    text: 'What do you do in your free time?',
    category: 'part1',
  },
  {
    id: 'p1-3',
    text: 'Do you prefer watching movies at home or in the cinema?',
    category: 'part1',
  },
  {
    id: 'p1-4',
    text: 'What types of books do you enjoy reading?',
    category: 'part1',
  },
  {
    id: 'p1-5',
    text: 'How often do you use public transportation?',
    category: 'part1',
  },
  
  // Part 2 - Long Turn
  {
    id: 'p2-1',
    text: 'Describe a place you have visited that you found interesting. You should say: where it is, when you went there, what you did there, and explain why you found it interesting.',
    category: 'part2',
  },
  {
    id: 'p2-2',
    text: 'Describe a skill you would like to learn. You should say: what the skill is, how you would learn it, how long it would take to learn, and explain why you want to learn this skill.',
    category: 'part2',
  },
  {
    id: 'p2-3',
    text: 'Describe a time when you helped someone. You should say: who you helped, how you helped them, why you helped them, and explain how you felt about helping them.',
    category: 'part2',
  },
  
  // Part 3 - Discussion
  {
    id: 'p3-1',
    text: 'What are the benefits of learning a foreign language?',
    category: 'part3',
  },
  {
    id: 'p3-2',
    text: 'How has technology changed the way people learn new skills?',
    category: 'part3',
  },
  {
    id: 'p3-3',
    text: 'Do you think travel is necessary for understanding other cultures?',
    category: 'part3',
  },
  {
    id: 'p3-4',
    text: 'What changes do you think we will see in education in the future?',
    category: 'part3',
  }
];