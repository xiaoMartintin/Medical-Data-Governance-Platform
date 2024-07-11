import config from './config'

export const formatDataSourceType = val => config.dataSourceType.find(item => item.value === val)?.label

export const formatDataSourceTable = (dataSource) => {
    const sourceType = formatDataSourceType(dataSource.type)
    if (sourceType === 'PostgreSQL') {
        return `${dataSource.schemaName}.${dataSource.tableName}`
    } else if (sourceType === 'MongoDB') {
        return dataSource.collectionName
    } else if (sourceType === 'InfluxDB') {
        return dataSource.tableName
    } else {
        return 'Unknown'
    }
}