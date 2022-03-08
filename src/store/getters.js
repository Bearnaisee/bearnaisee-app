/**
 * @param {object} state - Vuex state
 * @typedef {{
 *  _id: string,
 *  email: string,
 *  fullname: string,
 *  type: string,
 *  password: string,
 *  gaid: string,
 *  last_seen: string | Date,
 *  settings: object,
 * }} UserInfo
 * @returns {UserInfo} state.userInfo
 */
export const getUserInfo = (state) => state?.userInfo;
