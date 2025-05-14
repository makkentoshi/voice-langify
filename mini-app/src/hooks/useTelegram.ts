// src/hooks/useTelegram.ts
import { useEffect, useState, useCallback } from 'react';
import {
  mainButton,
  backButton,
} from '@telegram-apps/sdk-react';

type Lang = 'en-US' | 'es-ES';

declare global {
    interface Window {
      Telegram?: {
        WebApp?: any;
      };
      SpeechRecognition: any;
      webkitSpeechRecognition: any;
    }
  }
  
  interface SpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
  }
  
  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
    resultIndex: number;
  }
  
  interface SpeechRecognitionErrorEvent {
    error: string;
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

export function useTelegramRecognition() {
  const [transcript, setTranscript] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [language, setLanguage] = useState<Lang>('en-US');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  

  // Инициализация Telegram и SpeechRecognition
  useEffect(() => {
    window.Telegram?.WebApp?.ready();
    backButton.hide();
    mainButton.setParams({ text: 'Send Transcription', isVisible: false });

    const handleClick = () => {
      if (transcript) {
        window?.Telegram?.WebApp.sendData(JSON.stringify({ transcript, language }));
        setTranscript('');
        mainButton.setParams({ isVisible: false });
      }
    };
    mainButton.onClick(handleClick);

    const SpeechRecognitionClass =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      const recog = new SpeechRecognitionClass() as SpeechRecognition;
      recog.lang = language;
      recog.interimResults = true;
      recog.continuous = true;

      recog.onresult = (evt) => {
        const result = evt.results[evt.resultIndex];
        const text = result[0].transcript;
        setTranscript(text);
        mainButton.setParams({ isVisible: !!text });
      };
      recog.onerror = (e) => {
        console.error('Speech recognition error', e);
        alert(`Error: ${e.error}`);
        setIsRecognizing(false);
      };
      recog.onend = () => setIsRecognizing(false);

      setRecognition(recog);
    }

    return () => {
      mainButton.offClick(handleClick);
    };
  }, [transcript, language]);

  const toggleRecognition = useCallback(() => {
    if (!recognition) return;
    if (isRecognizing) {
      recognition.stop();
    } else {
      recognition.lang = language;
      recognition.start();
    }
    setIsRecognizing((v) => !v);
  }, [recognition, isRecognizing, language]);

  const switchLanguage = useCallback((lang: Lang) => {
    setLanguage(lang);
    if (isRecognizing && recognition) {
      recognition.stop();
      setTimeout(() => {
        recognition.lang = lang;
        recognition.start();
      }, 100);
    }
  }, [isRecognizing, recognition]);

  return {
    transcript,
    isRecognizing,
    language,
    toggleRecognition,
    switchLanguage,
  };
}
