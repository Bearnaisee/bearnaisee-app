import { createStore } from 'vuex';

export default createStore({
  state: {
    userInfo: {
      username: 'hougesen',
      email: 'mads@mhouge.dk',
      // 255 chars
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
      location: 'Odense, Denmark',
      website: 'https://mhouge.dk',
      created_at: new Date(),
    },
  },
  mutations: {},
  actions: {},
  getters: {
    getUserInfo(state) {
      return state?.userInfo;
    },
  },
});
