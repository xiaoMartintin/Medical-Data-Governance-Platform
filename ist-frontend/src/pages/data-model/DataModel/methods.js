import config from './config'

export const formatVariableType = val => config.variableTypes.find(item => item.value === val)?.label
export const formatModelType = val => config.modelTypes.find(item => item.value === val)?.label
export const formatModelModal = val => config.modelModals.find(item => item.value === val)?.label
export const formatRuleType = val => config.modelRules.find(item => item.value === val)?.label

export function formatRuleDetail(currentRule, ruleData) {
    if (currentRule.type === 'Unary') {
        return '无'
    } else if (currentRule.type === 'Binary') {
        const relation = currentRule.relations.find(item => item.value === ruleData.type).label
        return `${ruleData.leftFieldName} ${relation} ${ruleData.rightFieldName}`
    } else if (currentRule.type === 'Numeric') {
        return `${ruleData.min} ~ ${ruleData.max}`
    }
}

export function formatMongoField(fieldName) {
    return fieldName.replaceAll('!#@', '.')
}

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

export function convertDataToCSV(data) {
    let result = ''

    if (!data || data.length === 0) {
        return result
    }

    const columnDelimiter = ',\t'
    const lineDelimiter = '\t\n'
    const keys = Object.keys(data[0])

    result += keys.join(columnDelimiter)
    result += lineDelimiter

    data.forEach(item => {
        let ctr = 0
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter
            result += item[key]
            ctr++
        })
        result += lineDelimiter
    })

    return result
}

export function downloadCSV(data, filename = 'exported_data.csv') {
    const csv = convertDataToCSV(data)
    if (!csv) return

    const link = document.createElement('a')
    link.href = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(csv)
    link.download = filename
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export function formatDictionaryDataTypes(type) {
    switch (type) {
        case 'integer': case 'bigint':
            return 'Integer'
        case 'character varying(64)': case 'character varying(128)':
            return 'Varchar'
        case 'boolean':
            return 'Boolean'
        case 'timestamp without time zone':
            return 'Timestamp'
        default:
            return type
    }
}

export function judgeType(dictionaryType, dataType) {
    let typeLabel = config.variableTypes.find(item => item.value === dataType)?.label
    return formatDictionaryDataTypes(dictionaryType) === typeLabel
}
