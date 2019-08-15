// 引入拦截器
import $api from '@/utils/request.ts'

export const changeGoods = {
    // 获取基础商品列表
    getGoods(obj: any) {
        return $api.post({
            url: `/shops/erp/jxcApi/pro/search`,
            params: obj.params,
            fn: obj.fn
        })
    }
}
