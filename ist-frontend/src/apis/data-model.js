import {get, post} from '../utils/fetch.js'

/**
 * 获得所有数据模型
 * @returns {Promise<* | void>}
 */
export function getDataModels() {
    return get('/dataModelService/getAllDataModel')
}

/**
 * 获得数据模型
 * @param modelId
 * @returns {Promise<*>}
 */
export function getDataModel(modelId) {
    return get(`/dataModelService/getModelData/${modelId}/all/0`)
}

/**
 * 删除数据模型
 * @param modelId
 * @returns {Promise<*>}
 */
export function deleteDataModel(modelId) {
    return get(`/dataModelService/deleteDataModel/${modelId}`)
}

/**
 * 导出数据模型
 * @param modelId
 * @returns {Promise<*>}
 */
export function exportDataModel(modelId) {
    return get(`/dataModelService/getModelData/${modelId}/all/1`)
}

/**
 * 导出数据源数据
 * @param modelId
 * @param sourceId
 * @returns {Promise<*>}
 */
export function exportDataSource(modelId, sourceId) {
    return get(`/dataModelService/getModelData/${modelId}/${sourceId}/1`)
}

/**
 * 添加数据模型
 * @param params
 * @returns {Promise<* | void>}
 */
export function addDataModel(params) {
    return post('/dataModelService/addDataModel', params)
}

/**
 * 数据模型绑定数据源
 * @param params
 * @returns {Promise<*>}
 */
export function bindDataModel(params) {
    return post('/dataModelService/bindDataSource', params)
}

/**
 * 全量保存数据
 * @param params
 * @returns {Promise<*>}
 */
export function collectModelData(params) {
    return post('/dataModelService/saveData', params)
}

/**
 * 根据字段推荐数据模型标签
 * @param params
 * @returns {Promise<* | void>}
 */
export function querySimilarTags(params) {
    return get('/modelSimilarityService/models/tags', params)
}


/**
 * 根据字段推荐相似数据模型
 * @param params
 * @returns {Promise<* | void>}
 */
export function querySimilarModels(params) {
    return get('/modelSimilarityService/models', params)
}



export function getLLMResponce(params) {
    return post('/llmProxyService/query', params)
}