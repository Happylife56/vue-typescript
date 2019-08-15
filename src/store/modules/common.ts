const SET_COLLAPSE_STATE = 'setCollapseState'

const state = {
  isCollapse: true,// 是否折叠侧边栏
}

const getters = {}

const mutations = {
  // 设置侧边栏是否折叠
  [SET_COLLAPSE_STATE](state: any, bool: boolean) {
    state.isCollapse = bool;
  }
}

const actions = {
  test({ commit }: any, params: object) {
    commit(SET_COLLAPSE_STATE)
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

