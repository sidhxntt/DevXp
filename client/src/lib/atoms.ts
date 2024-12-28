import { atom } from 'recoil';

export const emailsent = atom({
  key: 'emailsent',
  default: false,
});

export const emailnotsent = atom({
  key: 'emailnotsent',
  default: false,
});
