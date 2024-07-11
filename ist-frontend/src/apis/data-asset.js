import {get} from '../utils/fetch.js'

/**
 * 筛选数据资产
 * @returns {Promise<* | void>}
 */
export function getDataAssets(params) {
    return get('/dataAssetService/findByModelAll', params)
}
