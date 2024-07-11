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