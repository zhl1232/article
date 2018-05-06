import {
  SET_USER,
  CLEAR_USER,
  SET_ARTICLE,
  CLEAR_ARTICLE,
  CLEAR_WRITE,
  ISEDIT
} from './types'

const mutations = {
  [SET_USER](state, user) {
    state.user = user;
  },
  [CLEAR_USER](state) {
    state.user = {};
  },
  [SET_ARTICLE](state, data) {
    state.article = data;
  },
  [CLEAR_ARTICLE](state) {
    state.article = {
      data: {
        typeValue: '',
        techTypeValue: '',
        title: ''
      }
    };
  },
  [ISEDIT](state, boolean) {
    state.isEdit = boolean;
  },
}

export default mutations

