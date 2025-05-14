// src/hooks/useTelegramInit.ts
import { useEffect } from 'react';
import { mainButton, backButton } from '@telegram-apps/sdk-react';

/**
 * Инициализирует Telegram WebApp при монтировании компонента.
 * Позволяет указать цвет заголовка и видимость основной кнопки.
 */
export function useTelegramInit(headerColor?: string, showMainButton = false) {
  useEffect(() => {
    const webApp = window.Telegram?.WebApp;

    if (!webApp || typeof webApp.ready !== 'function') return;

    webApp.ready();
    backButton.hide();
    mainButton.setParams({ text: 'Continue', isVisible: showMainButton });

    if (headerColor) {
      webApp.setHeaderColor(headerColor);
    }
  }, [headerColor, showMainButton]);
}
