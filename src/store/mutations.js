import log from '../helpers/log';

/**
 * @summary Set userInfo
 * @param {object} state - Vuex state
 * @param {object} payload - userInfo
 */
export const setUserInfo = (state, payload) => {
  log({ msg: 'setUserInfo', payload });

  state.userInfo = payload;
};
