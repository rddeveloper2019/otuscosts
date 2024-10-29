import { Lang } from '@/app/lang/types.ts';
import { Theme } from '@/app/theme/types.ts';

type LocalAppConfig = {
  lang: Lang;
  theme: Theme;
};
export class LocalAppConfigService {
  private static key = 'app-config';

  static getConfig = (): LocalAppConfig => {
    const raw = localStorage.getItem(LocalAppConfigService.key) || '{}';
    const config = JSON.parse(raw);

    return {
      lang: config?.lang || Lang.RU,
      theme: config.theme || Theme.LIGHT,
    };
  };

  static setConfig = ({ lang, theme }: { lang: Lang; theme: Theme }): void => {
    localStorage.setItem(
      LocalAppConfigService.key,
      JSON.stringify({ lang, theme })
    );
  };
}
