import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import type {UserType} from '../Types';
import {zustandStorage} from '@/Helpers';

export type UserStore = {
  userData: UserType | null;
  setUserData: (data: UserType) => void;
  logOut: () => void;
};

export default create(
  persist<UserStore>(
    set => ({
      token: '',

      userData: null,
      setUserData: data =>
        set(state => {
          return {
            userData: {...(state.userData ?? {}), ...data},
          };
        }),

      logOut: () => set({userData: null}),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
