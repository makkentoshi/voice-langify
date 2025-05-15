import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/ui/PageTransition";
import Card from "@/components/ui/new/Card";
import { ChevronLeft, Volume2 } from "lucide-react";

// Conversation phrases
const phrases = [
  {
    id: 1,
    category: "Greetings",
    items: [
      { spanish: "Hola", english: "Hello", emoji: "👋" },
      { spanish: "Buenos días", english: "Good morning", emoji: "🌞" },
      { spanish: "Buenas tardes", english: "Good afternoon", emoji: "🌆" },
      { spanish: "Buenas noches", english: "Good evening/night", emoji: "🌙" },
      { spanish: "¿Cómo estás?", english: "How are you?", emoji: "🙂" },
      {
        spanish: "Estoy bien, gracias",
        english: "I'm fine, thank you",
        emoji: "😊",
      },
    ],
  },
  {
    id: 2,
    category: "At the Restaurant",
    items: [
      {
        spanish: "Una mesa para dos, por favor",
        english: "A table for two, please",
        emoji: "🪑",
      },
      {
        spanish: "¿Puedo ver el menú?",
        english: "Can I see the menu?",
        emoji: "📋",
      },
      {
        spanish: "¿Qué me recomienda?",
        english: "What do you recommend?",
        emoji: "🤔",
      },
      {
        spanish: "La cuenta, por favor",
        english: "The bill, please",
        emoji: "💰",
      },
      { spanish: "Está delicioso", english: "It's delicious", emoji: "😋" },
    ],
  },
  {
    id: 3,
    category: "Directions",
    items: [
      { spanish: "¿Dónde está...?", english: "Where is...?", emoji: "🔍" },
      { spanish: "Siga recto", english: "Go straight", emoji: "⬆️" },
      { spanish: "Gire a la derecha", english: "Turn right", emoji: "➡️" },
      { spanish: "Gire a la izquierda", english: "Turn left", emoji: "⬅️" },
      { spanish: "Está cerca de aquí", english: "It's near here", emoji: "📍" },
    ],
  },
];

const ConversationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const playAudio = (phrase: string) => {
    // This would normally use a speech API or audio files
    console.log(`Playing audio for: ${phrase}`);
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
          <h1 className="text-2xl font-bold">Conversation</h1>
          <p className="text-gray-500 mt-1">Common Spanish phrases</p>
        </motion.div>

        <div className="space-y-6">
          {phrases.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.4 }}
            >
              <h2 className="text-lg font-medium mb-3 pl-1">
                {category.category}
              </h2>

              <Card className="overflow-hidden">
                {category.items.map((phrase, phraseIndex) => (
                  <motion.div
                    key={phraseIndex}
                    className="ios-list-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: categoryIndex * 0.1 + phraseIndex * 0.05,
                      duration: 0.3,
                    }}
                  >
                    <span className="text-xl mr-3">{phrase.emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium">{phrase.spanish}</p>
                      <p className="text-sm text-gray-500">{phrase.english}</p>
                    </div>
                    <button
                      className="ml-2 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center"
                      onClick={() => playAudio(phrase.spanish)}
                    >
                      <Volume2 className="text-primary-500" size={16} />
                    </button>
                  </motion.div>
                ))}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default ConversationPage;
