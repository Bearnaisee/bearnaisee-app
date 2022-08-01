import axios from 'axios';
import { defineStore } from 'pinia';
import { Metric, User } from 'types';

export type RootState = {
  userInfo: User | null;
  metrics: Metric[];
  editRecipeId: number | null;
};

export const useMainStore = defineStore({
  id: 'mainStore',

  state: () =>
    ({
      userInfo: null,
      metrics: [],
      editRecipeId: null,
    } as RootState),

  actions: {
    initStore() {
      this.fetchMetrics();
    },

    getUserInfo() {
      return this.userInfo;
    },

    setUserInfo(userInfo: RootState['userInfo']) {
      this.userInfo = userInfo;
    },

    getMetrics() {
      return this.metrics;
    },

    async fetchMetrics() {
      const metrics: Metric[] = await axios
        .get(`${process.env.VUE_APP_API_URL}/metrics`)
        .then((res) => res?.data?.metrics ?? [])
        .catch((error) => {
          console.error('Error fetching metrics', error);
          return error?.response?.data?.metrics ?? [];
        });

      if (metrics?.length) {
        this.metrics = metrics;
      }
    },

    getEditRecipeId() {
      return this.editRecipeId;
    },

    setEditRecipeId(id: number) {
      this.editRecipeId = id;
    },
  },
});
