
import { changeGoods } from '../api'

const SET_LIST_DATA = 'setListData' // 设置列表的数据

const state = {
    listData: [] // 商品的列表的数据
}
const mutations = {
    // 设置列表的数据
    [SET_LIST_DATA](state: any, arr: Array<string>) {
        state.listData = []
        state.listData = arr
    }
}
const getters = {
    // 商品的列表的数据
    goodsListData(state: any) {
        if (state.listData.content) {
            const arr = state.listData.content
            arr.map((item: any) => {
                item.format = item.spec + ',' + item.type
            })
            return arr
        } else {
            return []
        }
    },
    // 列表的总个数
    totalElements(state: any) {
        return state.listData.totalElements
    }
}

const actions = {
    // 获取门店列表的数据
    async getListData({ commit }: any, params: object) {
        try {
            changeGoods.getGoods({
                params,
                fn: (res: any) => {
                    commit(SET_LIST_DATA, res)
                }
            })
        } catch (error) { }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
