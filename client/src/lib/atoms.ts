import { atom } from 'recoil';

export const emailsent = atom({
  key: 'emailsent',
  default: false,
});

export const emailnotsent = atom({
  key: 'emailnotsent',
  default: false,
});

export const tokenAquired = atom<string | null>({
  key: 'tokenAquired',
  default: null,
})

