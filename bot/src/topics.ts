export const IELTS_TOPICS = [
    'Work', 'Study', 'Hometown', 'Family', 'Friends'
  ] as const;

  export type IeltsTopic = typeof IELTS_TOPICS[number];

  export interface TopicQuestions {
    part1: string[];
    part2: string;
    part3: string[];
  }

  export const QUESTIONS: Record<IeltsTopic, TopicQuestions> = {
    Work: {
      part1: [
        'What do you do for a living?',
        'Why did you choose this profession?',
        'What do you like most about your job?',
        'Do you prefer working alone or in a team?'
      ],
      part2: 'Describe your dream job. You should say: what it is, what skills it requires, why you would enjoy it, and how it differs from your current job.',
      part3: [
        'How has technology changed workplaces in your country?',
        'What skills will be important for jobs in the future?',
        'Is job satisfaction more important than a high salary?'
      ]
    },
    Study: {
      part1: [
        'What are you studying at the moment?',
        'Why did you choose this subject or course?',
        'What do you find challenging about studying?',
        'Do you prefer studying in the morning or evening?'
      ],
      part2: 'Describe a subject you enjoyed studying. You should say: what it was, how you studied it, why you enjoyed it, and how it has helped you.',
      part3: [
        'How important is education for success in life?',
        'Should schools focus more on practical skills?',
        'How can technology improve education?'
      ]
    },
    Hometown: {
      part1: [
        'Where is your hometown located?',
        'What do you like about your hometown?',
        'Has your hometown changed much in recent years?',
        'Would you like to live in your hometown in the future?'
      ],
      part2: 'Describe your hometown. You should say: where it is, what it is like, what you like about it, and how it has influenced you.',
      part3: [
        'What are the advantages of living in a small town compared to a city?',
        'How do cities in your country differ from rural areas?',
        'Should people stay in their hometowns or move to bigger cities?'
      ]
    },
    Family: {
      part1: [
        'How many people are there in your family?',
        'Do you spend a lot of time with your family?',
        'Who are you closest to in your family?',
        'What activities do you do together as a family?'
      ],
      part2: 'Describe a family member you admire. You should say: who they are, what they do, why you admire them, and how they have influenced you.',
      part3: [
        'How have family roles changed in your country?',
        'Is it better to grow up in a large family or a small one?',
        'How important is family in your culture?'
      ]
    },
    Friends: {
      part1: [
        'How often do you meet your friends?',
        'What do you usually do with your friends?',
        'How did you meet your best friend?',
        'Do you prefer having many friends or a few close ones?'
      ],
      part2: 'Describe a close friend. You should say: how you met, what you do together, what you like about them, and why they are important to you.',
      part3: [
        'How do friendships change as people get older?',
        'Is it easier to make friends today than in the past?',
        'What role do friends play in people’s lives?'
      ]
    }
  };