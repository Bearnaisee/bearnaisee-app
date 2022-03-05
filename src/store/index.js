import { createStore } from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

export default createStore({
  state: {
    userInfo: null,
  },
  mutations,
  getters,
  actions,
});
