import { defineStore } from 'pinia';
import { User } from 'types';

export type RootState = {
  userInfo: User | null;
};

export const useUserStore = defineStore({
  id: 'userStore',

  state: () => ({ userInfo: null } as RootState),

  actions: {
    getUserInfo() {
      return this.userInfo;
    },

    setUserInfo(userInfo: RootState['userInfo']) {
      this.userInfo = userInfo;
    },
  },
});
