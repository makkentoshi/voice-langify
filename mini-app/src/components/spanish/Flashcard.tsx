import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import type { FlashcardType } from "../../types";

interface FlashcardProps {
  card: FlashcardType;
  onLearn: () => void;
  onDontKnow: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  card,
  onLearn,
  onDontKnow,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<null | "left" | "right">(
    null
  );

  const playAudio = () => {
    if (card.audio) {
      const audio = new Audio(card.audio);
      audio.play();
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    const threshold = 100;

    if (info.offset.x > threshold) {
      setSwipeDirection("right");
      setTimeout(() => {
        onLearn();
        setSwipeDirection(null);
        setIsFlipped(false);
      }, 300);
    } else if (info.offset.x < -threshold) {
      setSwipeDirection("left");
      setTimeout(() => {
        onDontKnow();
        setSwipeDirection(null);
        setIsFlipped(false);
      }, 300);
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto aspect-[3/2] perspective"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{
        x:
          swipeDirection === "left"
            ? -1000
            : swipeDirection === "right"
            ? 1000
            : 0,
        opacity: swipeDirection !== null ? 0 : 1,
        rotateY: isFlipped ? 180 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className="w-full h-full rounded-xl shadow-lg flex items-center justify-center p-8 backface-hidden cursor-pointer"
        onClick={handleFlip}
        style={{
          position: "absolute",
          backfaceVisibility: "hidden",
          background: "white",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{card.term}</h2>
          {card.audio && (
            <Button
              onClick={playAudio}
              variant="outline"
              size="sm"
              icon={<Volume2 className="w-4 h-4" />}
            >
              Listen
            </Button>
          )}
        </div>
      </div>

      <div
        className="w-full h-full rounded-xl shadow-lg flex items-center justify-center p-8 backface-hidden cursor-pointer bg-blue-50"
        onClick={handleFlip}
        style={{
          position: "absolute",
          backfaceVisibility: "hidden",
          transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
        }}
      >
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8">{card.definition}</h3>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <p className="text-xs mb-1 text-gray-500">Swipe left</p>
              <XCircle className="w-8 h-8 text-red-500" />
              <p className="text-xs mt-1">Don't know</p>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1 text-gray-500">Swipe right</p>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <p className="text-xs mt-1">I know this</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
