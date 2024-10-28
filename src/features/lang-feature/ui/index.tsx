import { useContext } from 'react';
import { Lang } from '@/shared/lang/types.ts';
import { TextButtonState } from '@/shared/components/text-button/types.ts';
import { TextButton } from '@/shared/components/text-button';
import { AppConfigContext } from '@/app/providers/app-config-provider.tsx';

export const LangFeature = () => {
  const { lang, setAppLang } = useContext(AppConfigContext);

  const toggleLang = () => {
    if (lang === Lang.RU) {
      setAppLang(Lang.EN);
    } else {
      setAppLang(Lang.RU);
    }
  };

  return (
    <TextButton
      state={TextButtonState.WHITE}
      handleClick={toggleLang}
      type="button"
    >
      {lang === Lang.RU ? Lang.EN : 'РУ'}
    </TextButton>
  );
};
