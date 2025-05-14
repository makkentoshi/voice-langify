// src/hooks/useTelegramInit.ts
import { useEffect } from 'react';
import { mainButton, backButton } from '@telegram-apps/sdk-react';

export function useTelegramInit(headerColor?: string, showMainButton = false) {
  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (!webApp || typeof webApp.ready !== 'function') {
      // Если WebApp ещё не готов — не вызываем ничего
      return;
    }

    // Говорим Telegram, что WebApp готов к взаимодействию
    webApp.ready();

    // Спрячем кнопку назад, настроим основную кнопку
    backButton.hide();
    mainButton.setParams({ text: 'Continue', isVisible: showMainButton });

    // Задаём цвет шапки, если указано
    if (headerColor) {
      webApp.setHeaderColor(headerColor);
    }
  }, [headerColor, showMainButton]);
}
