import { useState } from 'react';
import { Lang } from '@/shared/lang/types.ts';
import TextButton from '@/shared/text-button';
import { TextButtonState } from '@/shared/text-button/types.ts';

export const LangFeature = () => {
  const [lang] = useState<string>(Lang.RU);
  return (
    <TextButton
      state={TextButtonState.WHITE}
      handleClick={() => console.log('toggle lang')}
      type="button"
    >
      {lang === Lang.RU ? Lang.EN : 'РУ'}
    </TextButton>
  );
};
