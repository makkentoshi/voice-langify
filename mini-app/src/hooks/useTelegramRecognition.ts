// src/hooks/useTelegramRecognition.ts
import { useEffect, useRef, useState, useCallback } from "react";
import { mainButton, backButton } from "@telegram-apps/sdk-react";

type Lang = "en-US" | "es-ES";

declare global {
  interface Window {
    Telegram?: { WebApp?: any };
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }

  interface SpeechRecognition {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
  }
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}
interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}
interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}
interface SpeechRecognitionAlternative {
  transcript: string;
}
interface SpeechRecognitionErrorEvent {
  error: string;
}

export function useTelegramRecognition() {
  const [transcript, setTranscript] = useState("");
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [language, setLanguage] = useState<Lang>("en-US");

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mountedRef = useRef(true);

  // Отмечаем монтирование
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Инициализация SpeechRecognition
  useEffect(() => {
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recog = new SpeechRecognitionClass() as SpeechRecognition;
    recog.continuous = true;
    recog.interimResults = true;
    recog.lang = language;

    recog.onresult = (evt: SpeechRecognitionEvent) => {
      const result = evt.results[evt.resultIndex];
      const text = result[0].transcript;
      setTranscript(text);
      if (mountedRef.current) {
        mainButton.setParams({ isVisible: !!text });
      }
    };

    recog.onerror = (e: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", e);
      if (mountedRef.current) {
        alert(`Speech Recognition Error: ${e.error}`);
        setIsRecognizing(false);
      }
    };

    recog.onend = () => {
      if (mountedRef.current) {
        setIsRecognizing(false);
      }
    };

    recognitionRef.current = recog;

    return () => {
      recog.stop();
    };
  }, []);

  // Telegram mainButton logic
  useEffect(() => {
    if (!mountedRef.current) return;

    backButton.hide();
    mainButton.setParams({ text: "Send Transcription", isVisible: false });

    const handleClick = () => {
      if (!transcript) return;

      const payload = { transcript, language };
      window.Telegram?.WebApp?.sendData(JSON.stringify(payload));

      setTranscript("");
      if (mountedRef.current) {
        mainButton.setParams({ isVisible: false });
      }
    };

    mainButton.onClick(handleClick);
    return () => {
      mainButton.offClick(handleClick);
    };
  }, [transcript, language]);

  // Язык
  const switchLanguage = useCallback(
    (lang: Lang) => {
      setLanguage(lang);
      const recog = recognitionRef.current;

      if (isRecognizing && recog) {
        recog.stop();
        setTimeout(() => {
          recog.lang = lang;
          recog.start();
        }, 100);
      } else if (recog) {
        recog.lang = lang;
      }
    },
    [isRecognizing]
  );

  // Вкл/выкл
  const toggleRecognition = useCallback(() => {
    const recog = recognitionRef.current;
    if (!recog) {
      alert("SpeechRecognition is not initialized.");
      return;
    }

    if (isRecognizing) {
      recog.stop();
    } else {
      recog.lang = language;
      recog.start();
    }

    setIsRecognizing((v) => !v);
  }, [isRecognizing, language]);

  return {
    transcript,
    isRecognizing,
    language,
    toggleRecognition,
    switchLanguage,
  };
}
