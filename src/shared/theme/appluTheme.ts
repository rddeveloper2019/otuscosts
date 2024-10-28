import { Theme } from '@/shared/theme/types.ts';
import { themes } from '@/shared/theme/themes.ts';

const root = document.querySelector(':root') as HTMLElement;

export const applyNewTheme = (name: Theme) => {
  const themeMap = themes[name];

  for (const [key, value] of Object.entries(themeMap)) {
    root?.style?.setProperty(key, value);
  }
};
