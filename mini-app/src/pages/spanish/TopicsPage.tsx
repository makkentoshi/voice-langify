import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/ui/PageTransition";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Topic data with emojis
const topics = [
  { id: 1, title: "Animals", emoji: "🐾", progress: 40 },
  { id: 2, title: "Airport Phrases", emoji: "✈️", progress: 20 },
  { id: 3, title: "Family", emoji: "👨‍👩‍👧‍👦", progress: 80 },
  { id: 4, title: "Food & Drinks", emoji: "🍔", progress: 60 },
  { id: 5, title: "Travel & Directions", emoji: "🗺️", progress: 30 },
  { id: 6, title: "Hobbies", emoji: "🎨", progress: 0 },
  { id: 7, title: "Sports", emoji: "⚽", progress: 0 },
  { id: 8, title: "Daily Routines", emoji: "🌞", progress: 0 },
  { id: 9, title: "Clothing", emoji: "👕", progress: 0 },
  { id: 10, title: "Weather", emoji: "☁️", progress: 0 },
  { id: 11, title: "Colors", emoji: "🎨", progress: 0 },
  { id: 12, title: "Numbers", emoji: "🔢", progress: 0 },
  { id: 13, title: "Time", emoji: "⏰", progress: 0 },
  { id: 14, title: "Health", emoji: "🏥", progress: 0 },
  { id: 15, title: "School", emoji: "🏫", progress: 0 },
  { id: 16, title: "Work", emoji: "💼", progress: 0 },
  { id: 17, title: "Shopping", emoji: "🛍️", progress: 0 },
  { id: 18, title: "Technology", emoji: "📱", progress: 0 },
  { id: 19, title: "Holidays", emoji: "🎄", progress: 0 },
  { id: 20, title: "Emotions", emoji: "😊", progress: 0 },
];

const TopicsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <motion.div
          className="flex items-center mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={handleBackClick}
            className="ios-back-button flex items-center"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold">Topics</h1>
          <p className="text-gray-500 mt-1">Learn Spanish by themes</p>
        </motion.div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="p-4 shadow-sm" interactive>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <span className="text-lg">{topic.emoji}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{topic.title}</h3>
                      {topic.progress > 0 && (
                        <div className="flex items-center mt-1">
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden mr-2">
                            <div
                              className="h-full bg-primary-500 rounded-full"
                              style={{ width: `${topic.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {topic.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={18} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default TopicsPage;
