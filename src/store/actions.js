/**
 * @summary Initialize store on first page load
 */
export const initStore = ({ commit }) => {
  const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (storedUserInfo !== null && storedUserInfo !== undefined) {
    commit('setUserInfo', storedUserInfo);
  }
};

export const saveUserInfo = ({ commit }, payload) => {
  localStorage.setItem('userInfo', JSON.stringify(payload));

  commit('setUserInfo', payload);
};
