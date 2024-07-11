const config = {
    modelRules: [{
        label: '比较规则',
        value: 1,
        type: 'Binary',
        relations: [
            {label: '大于等于', value: 1},
            {label: '大于', value: 2},
            {label: '等于', value: 3},
            {label: '小于等于', value: 4},
            {label: '小于', value: 5}
        ]
    },
        {
            label: '非空规则',
            value: 2,
            type: 'Unary'
        },
        {
            label: '范围限制规则',
            value: 3,
            type: 'Numeric'
        }
    ],
    modelTypes: [
        {
            label: '结构化数据',
            value: 1
        },
        {
            label: '半结构化数据',
            value: 2
        },
        {
            label: '非结构化数据',
            value: 3
        },
        {
            label: '时序数据',
            value: 4
        },
    ],
    modelModals: [
        {
            label: '时序',
            value: 1
        },
        {
            label: '图像',
            value: 2
        },
        {
            label: '文本',
            value: 3
        },
    ],
    variableTypes: [
        {
            label: 'Number',
            value: 1
        },
        {
            label: 'String',
            value: 2
        }
    ]
}

export default config
