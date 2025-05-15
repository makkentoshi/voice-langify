// src/pages/spanish/GrammarPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MessageSquare,
  ChevronRight,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/new/Card";
import { Button } from "@/components/ui/new/Button";
import { useTelegramInit } from "@/hooks/useTelegramInit";
import { cn } from "@/lib/utils";

const grammarTopics = [
  {
    id: 1,
    title: "Present Tense (Presente)",
    description:
      "Used to talk about habitual actions, general truths, and current states.",
    author: "Maria Garcia",
    replies: 24,
    likes: 156,
    lastActivity: "2h ago",
    examples: [
      {
        spanish: "Yo hablo español.",
        english: "I speak Spanish.",
      },
      {
        spanish: "Ella vive en Madrid.",
        english: "She lives in Madrid.",
      },
    ],
  },
  {
    id: 2,
    title: "Past Tense (Pretérito)",
    description: "Used to talk about completed actions in the past.",
    author: "Carlos Rodriguez",
    replies: 18,
    likes: 98,
    lastActivity: "5h ago",
    examples: [
      {
        spanish: "Yo hablé con él ayer.",
        english: "I spoke with him yesterday.",
      },
      {
        spanish: "Ella compró un libro.",
        english: "She bought a book.",
      },
    ],
  },
  {
    id: 3,
    title: "Imperfect Tense (Imperfecto)",
    description: "Used to describe ongoing or habitual actions in the past.",
    author: "Ana Martinez",
    replies: 32,
    likes: 210,
    lastActivity: "1d ago",
    examples: [
      {
        spanish: "Yo hablaba con él todos los días.",
        english: "I used to speak with him every day.",
      },
      {
        spanish: "Cuando era niño, jugaba al fútbol.",
        english: "When I was a child, I used to play soccer.",
      },
    ],
  },
];

export default function GrammarPage() {
  useTelegramInit("#FFFFFFFF", false);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

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
            <h1 className="text-xl font-semibold">Grammar Forum</h1>
            <div className="w-6" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
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
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {topic.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          <span>{topic.replies}</span>
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          <span>{topic.likes}</span>
                        </div>
                        <span>{topic.lastActivity}</span>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" size={20} />
                  </div>

                  {selectedTopic === topic.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-100"
                    >
                      <div className="space-y-3">
                        {topic.examples.map((example, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-3 text-sm"
                          >
                            <p className="text-gray-900 font-medium mb-1">
                              {example.spanish}
                            </p>
                            <p className="text-gray-600">{example.english}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-500 border-blue-500"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Like
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-gray-500 border-gray-300"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Reply
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
