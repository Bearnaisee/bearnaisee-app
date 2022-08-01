import axios from 'axios';
import { createStore } from 'vuex';
import { User, Metric } from 'types';
import log from '@/helpers/log';

interface State {
  userInfo: User | null;
  metrics: Metric[];
  editRecipeId: number | null;
}

export default createStore<State>({
  state: {
    userInfo: null,
    metrics: [],
    editRecipeId: null,
  },

  getters: {
    getUserInfo: (state) => state?.userInfo,

    getMetrics: (state) => state?.metrics ?? [],

    getEditRecipeId: (state) => state?.editRecipeId,
  },

  mutations: {
    setUserInfo: (state, payload: User) => {
      log({ msg: 'setUserInfo', payload });

      state.userInfo = payload;
    },

    setMetrics: (state, payload: Metric[]) => {
      state.metrics = payload;
    },

    setEditRecipeId: (state, payload: number) => {
      state.editRecipeId = payload;
    },
  },

  actions: {
    /**
     * @summary Initialize store on first page load
     */
    initStore: ({ commit }) => {
      const local = localStorage.getItem('userInfo');

      if (!local) return;

      const storedUserInfo: User = JSON.parse(local);

      if (storedUserInfo && storedUserInfo !== null && storedUserInfo !== undefined) {
        commit('setUserInfo', storedUserInfo);
      }
    },

    saveUserInfo: ({ commit }, payload: User) => {
      localStorage.setItem('userInfo', JSON.stringify(payload));

      commit('setUserInfo', payload);
    },

    /**
     * @summary fetch ingridient metrics
     */
    fetchMetrics: async ({ commit }) => {
      const metrics = await axios
        .get(`${process.env.VUE_APP_API_URL}/metrics`)
        .then((res) => res?.data?.metrics ?? [])
        .catch((error) => console.error('Error fetching metrics', error));

      if (metrics) {
        commit('setMetrics', metrics);
      }
    },
  },
});
