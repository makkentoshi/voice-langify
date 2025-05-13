import { useEffect, useState } from "react";
import { mainButton, backButton, viewport } from "@telegram-apps/sdk-react";
import "./index.css";

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

const App = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [language, setLanguage] = useState<"en-US" | "es-ES">("en-US");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (window.Telegram?.WebApp?.ready) {
      window.Telegram.WebApp.ready();
    }
    if (window.Telegram?.WebApp) {
      backButton.hide();
      mainButton.setParams({
        text: "Send Transcription",
        isVisible: !!transcript,
      });
    } else {
      console.error("Telegram WebApp SDK not loaded.");
    }

    const handleClick = () => {
      if (transcript) {
        window.Telegram?.WebApp?.sendData(
          JSON.stringify({ transcript, language })
        );
        setTranscript("");
        mainButton.setParams({ isVisible: false });
      }
    };

    mainButton.onClick(handleClick);

    const SpeechRecognitionClass =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (
      typeof window.SpeechRecognition === "undefined" &&
      typeof (window as any).webkitSpeechRecognition === "undefined"
    ) {
      alert("Speech Recognition API is not supported in this browser.");
    }

    if (SpeechRecognitionClass) {
      const recog = new SpeechRecognitionClass() as SpeechRecognition;
      recog.lang = language;
      recog.interimResults = true;
      recog.continuous = true;

      recog.onresult = (event: SpeechRecognitionEvent) => {
        const result = event.results[event.resultIndex];
        const text = result[0].transcript;
        setTranscript(text);
        mainButton.setParams({ isVisible: !!text });
      };

      recog.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        alert(`Error: ${event.error}. Please enable microphone and try again.`);
        setIsRecognizing(false);
      };

      recog.onend = () => setIsRecognizing(false);

      setRecognition(recog);
    } else {
      alert(
        "Web Speech API not supported in this browser. Use Chrome or Safari."
      );
    }

    return () => {
      mainButton.offClick(handleClick);
    };
  }, [transcript, language]);

  const toggleRecognition = () => {
    if (!recognition) return;

    if (isRecognizing) {
      recognition.stop();
    } else {
      recognition.lang = language;
      recognition.start();
    }

    setIsRecognizing(!isRecognizing);
  };

  const switchLanguage = (lang: "en-US" | "es-ES") => {
    setLanguage(lang);
    if (isRecognizing && recognition) {
      recognition.stop();
      setTimeout(() => {
        recognition.lang = lang;
        recognition.start();
      }, 100);
    }
  };

  return (
    <div className="app">
      <h1>VoiceLangify</h1>
      <p>Record your voice for IELTS or Spanish practice.</p>
      <div>
        <button onClick={() => switchLanguage("en-US")}>English</button>
        <button onClick={() => switchLanguage("es-ES")}>Spanish</button>
      </div>
      <button onClick={toggleRecognition}>
        {isRecognizing ? "Stop Recording" : "Start Recording"}
      </button>
      <div>
        <h3>Transcription:</h3>
        <p>{transcript || "No transcription yet"}</p>
      </div>
    </div>
  );
};

export default App;
