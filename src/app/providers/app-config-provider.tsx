import {
  createContext,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Lang } from '@/app/lang/types.ts';
import { Theme } from '@/app/theme/types.ts';
import { applyNewTheme } from '@/app/theme/applyTheme.ts';
import { useTranslation } from 'react-i18next';
import { LocalAppConfigService } from '@/shared/services/AppConfigService.ts';
import { useAppDispatch } from '@/app/store/store.ts';
import { initApp } from '@/app/store/slices/initSlice.ts';

export type AppConfigContextType = {
  theme: Theme;
  lang: Lang;
  setAppLang: (lang: Lang) => void;
  setAppTheme: (theme: Theme) => void;
};

export const AppConfigContext = createContext<AppConfigContextType>(
  {} as AppConfigContextType
);

const initialAppConfig = LocalAppConfigService.getConfig();

export const AppConfigProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const [theme, setAppTheme] = useState(initialAppConfig.theme);

  const [lang, setAppLang] = useState(initialAppConfig.lang);

  const appConfigValue: AppConfigContextType = {
    theme,
    lang,
    setAppLang,
    setAppTheme,
  };

  useEffect(() => {
    dispatch(initApp());
  }, []);

  useLayoutEffect(() => {
    applyNewTheme(theme);
  }, []);

  useEffect(() => {
    applyNewTheme(theme);
  }, [theme]);

  useEffect(() => {
    i18n?.changeLanguage?.(lang);
  }, [lang, i18n]);

  useEffect(() => {
    LocalAppConfigService.setConfig({ lang, theme });
  }, [lang, theme]);

  return (
    <AppConfigContext.Provider value={appConfigValue}>
      {children}
    </AppConfigContext.Provider>
  );
};
