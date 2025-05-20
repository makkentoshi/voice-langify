// src/pages/spanish/GrammarPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/new/Card";
import { Button } from "@/components/ui/new/Button";
import { useTelegramInit } from "@/hooks/useTelegramInit";
import { cn } from "@/lib/utils";

const grammarTopics = [
  {
    id: 1,
    title: "Present Tense (Presente)",
    description: "Learn how to use the present tense in Spanish",
    level: "Beginner",
    duration: "15 min",
    progress: 40,
    icon: "📝",
    content: {
      explanation:
        "The present tense in Spanish is used to talk about habitual actions, general truths, and current states. It's one of the most commonly used tenses in everyday conversation.",
      rules: [
        "Regular -ar verbs: Remove -ar and add -o, -as, -a, -amos, -áis, -an",
        "Regular -er verbs: Remove -er and add -o, -es, -e, -emos, -éis, -en",
        "Regular -ir verbs: Remove -ir and add -o, -es, -e, -imos, -ís, -en",
      ],
      examples: [
        {
          spanish: "Yo hablo español todos los días.",
          english: "I speak Spanish every day.",
          note: "Habitual action",
        },
        {
          spanish: "Ella vive en Madrid.",
          english: "She lives in Madrid.",
          note: "Current state",
        },
        {
          spanish: "El sol sale por el este.",
          english: "The sun rises in the east.",
          note: "General truth",
        },
      ],
      commonUses: [
        "Describing daily routines",
        "Expressing current states",
        "Stating general truths",
        "Making observations",
      ],
    },
  },
  {
    id: 2,
    title: "Past Tense (Pretérito)",
    description: "Master the past tense for completed actions",
    level: "Intermediate",
    duration: "20 min",
    progress: 60,
    icon: "⏰",
    content: {
      explanation:
        "The preterite tense is used to talk about completed actions in the past. It's perfect for telling stories and describing specific events that happened at a particular time.",
      rules: [
        "Regular -ar verbs: Remove -ar and add -é, -aste, -ó, -amos, -asteis, -aron",
        "Regular -er/-ir verbs: Remove -er/-ir and add -í, -iste, -ió, -imos, -isteis, -ieron",
        "Irregular verbs have unique conjugations",
      ],
      examples: [
        {
          spanish: "Ayer compré un libro nuevo.",
          english: "Yesterday I bought a new book.",
          note: "Completed action",
        },
        {
          spanish: "El año pasado visité España.",
          english: "Last year I visited Spain.",
          note: "Specific time period",
        },
        {
          spanish: "¿Qué hiciste el fin de semana?",
          english: "What did you do on the weekend?",
          note: "Asking about past events",
        },
      ],
      commonUses: [
        "Telling stories",
        "Describing completed actions",
        "Talking about specific past events",
        "Sequencing past events",
      ],
    },
  },
  {
    id: 3,
    title: "Imperfect Tense (Imperfecto)",
    description: "Learn to describe ongoing past actions",
    level: "Intermediate",
    duration: "25 min",
    progress: 20,
    icon: "🔄",
    content: {
      explanation:
        "The imperfect tense is used to describe ongoing or habitual actions in the past. It's perfect for setting the scene and describing background information.",
      rules: [
        "Regular -ar verbs: Remove -ar and add -aba, -abas, -aba, -ábamos, -abais, -aban",
        "Regular -er/-ir verbs: Remove -er/-ir and add -ía, -ías, -ía, -íamos, -íais, -ían",
        "Only three irregular verbs: ser, ir, and ver",
      ],
      examples: [
        {
          spanish: "Cuando era niño, jugaba al fútbol todos los días.",
          english: "When I was a child, I used to play soccer every day.",
          note: "Habitual action",
        },
        {
          spanish: "Era una noche oscura y llovía mucho.",
          english: "It was a dark night and it was raining a lot.",
          note: "Setting the scene",
        },
        {
          spanish: "Mi abuela siempre cocinaba los domingos.",
          english: "My grandmother always cooked on Sundays.",
          note: "Repeated action",
        },
      ],
      commonUses: [
        "Describing past habits",
        "Setting the scene",
        "Talking about age and time",
        "Describing ongoing past actions",
      ],
    },
  },
];

export default function GrammarPage() {
  useTelegramInit("#FFFFFFFF", false);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  // Состояния для генерации фраз
  const [phrasePrompt, setPhrasePrompt] = useState('');
  const [generatedPhrase, setGeneratedPhrase] = useState('');
  const [loadingPhrase, setLoadingPhrase] = useState(false);
  const [phraseError, setPhraseError] = useState<string | null>(null);

  const handleGeneratePhrase = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPhrase(true);
    setPhraseError(null);
    setGeneratedPhrase(''); // Очистить предыдущий результат

    try {
      const response = await fetch('/api/generate-spanish-phrase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: phrasePrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.statusText}`);
      }

      const data = await response.json();
      setGeneratedPhrase(data.phrase);

    } catch (error: any) {
      console.error('Error generating Spanish phrase:', error);
      setPhraseError(error.message || 'Failed to generate phrase. Please try again.');
    } finally {
      setLoadingPhrase(false);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F2F2F7]"
    >
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/spanish" className="text-blue-500">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-semibold">Spanish Grammar</h1>
            <div className="w-6" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Секция генерации испанских фраз */}
        <Card className="bg-white rounded-xl overflow-hidden mb-6">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Spanish Phrase (DeepSeek)</h3>
            <form onSubmit={handleGeneratePhrase} className="space-y-4">
              <div>
                <label htmlFor="phrasePrompt" className="block text-sm font-medium text-gray-700">
                  Enter your prompt:
                </label>
                <input
                  type="text"
                  id="phrasePrompt"
                  value={phrasePrompt}
                  onChange={(e) => setPhrasePrompt(e.target.value)}
                  placeholder="e.g., 'Ask about the weather' or 'How to say hello'"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                  disabled={loadingPhrase}
                />
              </div>
              <Button disabled={loadingPhrase} className="w-full">
                {loadingPhrase ? 'Generating...' : 'Generate Phrase'}
              </Button>
            </form>

            {phraseError && (
              <div className="mt-4 text-sm text-red-600">
                Error: {phraseError}
              </div>
            )}

            {generatedPhrase && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Generated Phrase:</h4>
                <p className="text-gray-800 italic">{generatedPhrase}</p>
              </div>
            )}
          </div>
        </Card>


        {/* Существующая секция грамматических тем */}
        <div className="space-y-4">
          {grammarTopics.map((topic) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={cn(
                  "bg-white rounded-xl overflow-hidden",
                  selectedTopic === topic.id && "ring-2 ring-blue-500"
                )}
                onClick={() => setSelectedTopic(topic.id)}
              >
                 <div className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{topic.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {topic.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {topic.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          <span>{topic.level}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{topic.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          <span>{topic.progress}%</span>
                        </div>
                      </div>
                      <div className="mt-3 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {selectedTopic === topic.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-gray-100"
                    >
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Explanation
                          </h4>
                          <p className="text-gray-600">
                            {topic.content.explanation}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Rules
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {topic.content.rules.map((rule, index) => (
                              <li key={index}>{rule}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Examples
                          </h4>
                          <div className="space-y-3">
                            {topic.content.examples.map((example, index) => (
                              <div
                                key={index}
                                className="bg-gray-50 rounded-lg p-3"
                              >
                                <p className="text-gray-900 font-medium">
                                  {example.spanish}
                                </p>
                                <p className="text-gray-600 text-sm">
                                  {example.english}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                  {example.note}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Common Uses
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {topic.content.commonUses.map((use, index) => (
                              <li key={index}>{use}</li>
                            ))}
                          </ul>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-blue-500 border-blue-500"
                        >
                          Practice This Topic
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}
