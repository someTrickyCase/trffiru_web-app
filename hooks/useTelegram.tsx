"use client";

import Script from "next/script";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ITelegramUser, IWebApp } from "../types/TelegramTypes";

export interface ITelegramContext {
    webApp?: IWebApp;
    user?: ITelegramUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
    const [webApp, setWebApp] = useState<IWebApp | null>(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const app = (window as any).Telegram?.WebApp;
        if (app) {
            app.ready();
            setWebApp(app);
        }
    }, []);

    const value = useMemo(() => {
        return webApp
            ? {
                  webApp,
                  unsafeData: webApp.initDataUnsafe,
                  user: webApp.initDataUnsafe.user,
              }
            : {};
    }, [webApp]);

    return (
        <TelegramContext.Provider value={value}>
            <Script
                src='https://telegram.org/js/telegram-web-app.js'
                // strategy='beforeInteractive'
            />
            {children}
        </TelegramContext.Provider>
    );
};

export const useTelegram = () => useContext(TelegramContext);
