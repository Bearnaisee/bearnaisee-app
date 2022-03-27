import axios from 'axios';

export const fetchMetrics = async ({ commit }) => {
  const metrics = await axios
    .get(`${process.env.VUE_APP_API_URL}/metrics`)
    .then((res) => res?.data?.metrics ?? [])
    .catch((error) => console.error('Error fetching metrics', error));

  if (metrics) {
    commit('setMetrics', metrics);
  }
};
