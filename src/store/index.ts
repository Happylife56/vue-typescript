import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import common from './modules/common';
import addChangegoods from '../components/BaseChangeGoods/store/addChangegoods' // 添加商品

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    addChangegoods,
  },
  plugins: [
    createPersistedState({ storage: window.sessionStorage })
  ] // 状态持久化
});
