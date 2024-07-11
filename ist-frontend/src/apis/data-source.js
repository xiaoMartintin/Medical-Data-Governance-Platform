import {get, post} from '../utils/fetch'

/**
 * 添加数据源
 * @param params
 * @returns {Promise<* | void>}
 */
export function addDataSource(params) {
    return post('/dataSourceService/addDataSource', params)
}

/**
 * 删除数据源
 * @param sourceId
 * @returns {Promise<*>}
 */
export function deleteDataSource(sourceId) {
    return get(`/dataSourceService/deleteDataSource/${sourceId}`)
}

/**
 * 查询所有数据源
 * @returns {Promise<* | void>}
 */
export function getAllDataSources() {
    return get('/dataSourceService/getAllDataSource')
}

/**
 * 查询数据源元信息
 * @param params
 * @returns {Promise<* | void>}
 */
export function getMetaFields(params) {
    return post('/dataSourceService/getMetaFields', params)
}

/**
 * 查询数据源所有表格
 * @param params
 * @returns {Promise<* | void>}
 */
export function getDataSourceTables(params) {
    return post('/dataSourceService/getTables', params)
}