import { defineStore } from 'pinia';
import { Metric } from 'types';
import axios from 'axios';

export type RootState = {
  metrics: Metric[];
};

export const useMetricStore = defineStore({
  id: 'metricStore',

  state: () => ({ metrics: [] } as RootState),

  actions: {
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
  },
});
