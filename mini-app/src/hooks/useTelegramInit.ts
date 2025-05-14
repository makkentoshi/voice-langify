// src/hooks/useTelegramInit.ts
import { useEffect } from 'react';
import { mainButton, backButton } from '@telegram-apps/sdk-react';

export function useTelegramInit(headerColor?: string, showMainButton = false) {
  useEffect(() => {
    // Telegram WebApp API
    window.Telegram?.WebApp?.ready();
    backButton.hide();
    mainButton.setParams({ text: 'Continue', isVisible: showMainButton });
    if (headerColor) {
      window.Telegram?.WebApp.setHeaderColor(headerColor);
    }
  }, [headerColor, showMainButton]);
}
