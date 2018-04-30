import {
  SET_USER,
  CLEAR_USER,
  SET_ARTICLE
} from './types'

const mutations = {
  [SET_USER](state,user) {
    state.user = user;
  },
  [CLEAR_USER](state) {
    state.user = {};
  },
  [SET_ARTICLE](state,data) {
    state.article = data;
  }
}

export default mutations

