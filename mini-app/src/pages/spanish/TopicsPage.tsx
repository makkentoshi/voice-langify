import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, BookOpen, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/new/Card";
import { Button } from "@/components/ui/new/Button";
import { useTelegramInit } from "@/hooks/useTelegramInit";
import { cn } from "@/lib/utils";

const topics = [
  {
    id: 1,
    title: "Basic Greetings",
    description: "Essential Spanish greetings and introductions",
    level: "Beginner",
    duration: "15 min",
    progress: 40,
    icon: "👋",
  },
  {
    id: 2,
    title: "Food & Drinks",
    description: "Order food and drinks in Spanish",
    level: "Beginner",
    duration: "20 min",
    progress: 60,
    icon: "🍔",
  },
  {
    id: 3,
    title: "Travel Phrases",
    description: "Essential phrases for travelers",
    level: "Intermediate",
    duration: "25 min",
    progress: 20,
    icon: "✈️",
  },
  {
    id: 4,
    title: "Family Members",
    description: "Learn family-related vocabulary",
    level: "Beginner",
    duration: "15 min",
    progress: 80,
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: 5,
    title: "Shopping",
    description: "Shopping vocabulary and phrases",
    level: "Intermediate",
    duration: "20 min",
    progress: 30,
    icon: "🛍️",
  },
  {
    id: 6,
    title: "Weather",
    description: "Weather conditions and forecasts",
    level: "Beginner",
    duration: "15 min",
    progress: 50,
    icon: "☁️",
  },
];

export default function TopicsPage() {
  useTelegramInit("#FFFFFFFF", false);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F2F2F7]"
    >
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/spanish" className="text-blue-500">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-semibold">Spanish Topics</h1>
            <div className="w-6" />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {topics.map((topic) => (
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
                        <ChevronRight className="text-gray-400" size={20} />
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
                      className="mt-4 pt-4 border-t border-gray-100"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-blue-500 border-blue-500"
                      >
                        Continue Learning
                      </Button>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Learning Progress
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overall Progress</span>
                <span className="text-sm font-medium text-blue-500">65%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: "65%" }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Topics Completed</span>
                <span className="font-medium">4/6</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </motion.div>
  );
}
