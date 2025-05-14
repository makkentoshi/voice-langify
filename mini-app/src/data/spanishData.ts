import type { FlashcardType, GrammarItem } from '../types';

export const spanishFlashcardsData: FlashcardType[] = [
  {
    id: '1',
    term: 'Hola',
    definition: 'Hello',
    audio: 'https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/ho/hola_es_us_1.mp3',
    learned: false,
  },
  {
    id: '2',
    term: 'Gracias',
    definition: 'Thank you',
    audio: 'https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/gr/gracias_es_us_1.mp3',
    learned: false,
  },
  {
    id: '3',
    term: 'Buenos días',
    definition: 'Good morning',
    audio: 'https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/bu/buenos_dias_es_us_1.mp3',
    learned: false,
  },
  {
    id: '4',
    term: 'Adiós',
    definition: 'Goodbye',
    audio: 'https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/ad/adios_es_us_1.mp3',
    learned: false,
  },
  {
    id: '5',
    term: 'Por favor',
    definition: 'Please',
    audio: 'https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/po/por_favor_es_us_1.mp3',
    learned: false,
  },
  {
    id: '6',
    term: 'Cómo estás',
    definition: 'How are you',
    audio: 'https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/co/como_estas_es_us_1.mp3',
    learned: false,
  },
  {
    id: '7',
    term: 'Sí',
    definition: 'Yes',
    audio: 'https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/si/si_es_us_1.mp3',
    learned: false,
  },
  {
    id: '8',
    term: 'No',
    definition: 'No',
    audio: 'https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/no/no_es_us_1.mp3',
    learned: false,
  },
];

export const spanishGrammarData: GrammarItem[] = [
  {
    id: '1',
    title: 'Present Tense (Presente)',
    explanation: 'Used to talk about habitual actions, general truths, and current states.',
    examples: [
      {
        spanish: 'Yo hablo español.',
        english: 'I speak Spanish.',
      },
      {
        spanish: 'Ella vive en Madrid.',
        english: 'She lives in Madrid.',
      },
    ],
  },
  {
    id: '2',
    title: 'Past Tense (Pretérito)',
    explanation: 'Used to talk about completed actions in the past.',
    examples: [
      {
        spanish: 'Yo hablé con él ayer.',
        english: 'I spoke with him yesterday.',
      },
      {
        spanish: 'Ella compró un libro.',
        english: 'She bought a book.',
      },
    ],
  },
  {
    id: '3',
    title: 'Imperfect Tense (Imperfecto)',
    explanation: 'Used to describe ongoing or habitual actions in the past.',
    examples: [
      {
        spanish: 'Yo hablaba con él todos los días.',
        english: 'I used to speak with him every day.',
      },
      {
        spanish: 'Cuando era niño, jugaba al fútbol.',
        english: 'When I was a child, I used to play soccer.',
      },
    ],
  },
];