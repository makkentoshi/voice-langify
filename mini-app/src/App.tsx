import { useEffect, useState } from 'react';
import { initBackButton, initMainButton, useInitData } from '@telegram-apps/sdk-react';
import './index.css';

const App: React.FC = () => {
  const initData = useInitData();
  const [backButton] = initBackButton();
  const [mainButton] = initMainButton();
  const [transcript, setTranscript] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    window.Telegram.WebApp.ready();
    backButton.hide();
    mainButton.setParams({ text: 'Send Transcription', is_visible: !!transcript });

    mainButton.on('click', () => {
      if (transcript) {
        window.Telegram.WebApp.sendData(JSON.stringify({ transcript, language }));
        setTranscript('');
        mainButton.setParams({ is_visible: false });
      }
    });

    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = language;
      recog.interimResults = true;
      recog.continuous = true;

      recog.onresult = (event) => {
        const result = event.results[event.resultIndex];
        const text = result[0].transcript;
        setTranscript(text);
      };

      recog.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecognizing(false);
        alert(`Error: ${event.error}. Please ensure microphone access and try again.`);
      };

      recog.onend = () => {
        setIsRecognizing(false);
      };

      setRecognition(recog);
    } else {
      alert('Web Speech API is not supported. Please use a modern browser (Chrome/Safari).');
    }

    return () => {
      mainButton.off('click');
    };
  }, [backButton, mainButton, transcript, language]);

  const toggleRecognition = () => {
    if (!recognition) return;

    if (isRecognizing) {
      recognition.stop();
      setIsRecognizing(false);
    } else {
      recognition.lang = language;
      recognition.start();
      setIsRecognizing(true);
    }
  };

  const switchLanguage = (lang: string) => {
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
        <button onClick={() => switchLanguage('en-US')}>English</button>
        <button onClick={() => switchLanguage('es-ES')}>Spanish</button>
      </div>
      <button onClick={toggleRecognition}>
        {isRecognizing ? 'Stop Recording' : 'Start Recording'}
      </button>
      <div>
        <h3>Transcription:</h3>
        <p>{transcript || 'No transcription yet'}</p>
      </div>
    </div>
  );
};

export default App;