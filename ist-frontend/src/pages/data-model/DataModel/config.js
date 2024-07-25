const config = {
    modelRules: [
        {
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
        },
        {
            label: 'Integer',
            value: 3
        },
        {
            label: 'Varchar',
            value: 4
        },
        {
            label: 'Boolean',
            value: 5
        },
        {
            label: 'Timestamp',
            value: 6
        }
    ],
    dataSourceType: [
        {
            label: 'PostgreSQL',
            value: 1
        },
        {
            label: 'MongoDB',
            value: 2
        },
        {
            label: 'Directory',
            value: 3
        },
        {
            label: 'InfluxDB',
            value: 4
        },
    ],
    dataCategories : [
        {
            value: '1',
            label: '诊疗数据',
            children: [
                {
                    value: '1',
                    label: '门诊数据',
                    key: '1-1'
                },
                {
                    value: '2',
                    label: '住院数据',
                    key: '1-2'
                },
                {
                    value: '3',
                    label: '检验数据',
                    key: '1-3'
                },
                {
                    value: '4',
                    label: '检查数据',
                    key: '1-4'
                },
                {
                    value: '5',
                    label: '处方数据',
                    key: '1-5'
                },
            ],
        },
        {
            value: '2',
            label: '多租户数据',
            children: [
                {
                    value: '1',
                    label: '医疗人员数据',
                    key: '2-1'
                },
                {
                    value: '2',
                    label: '患者数据',
                    key: '2-2'
                },
            ],
        },
        {
            value: '3',
            label: '基础字典数据',
            children: [
                {
                    value: '1',
                    label: '国家数据',
                    key: '3-1'
                },
                {
                    value: '2',
                    label: '省份数据',
                    key: '3-2'
                },
                {
                    value: '3',
                    label: '城市数据',
                    key: '3-3'
                },
                {
                    value: '4',
                    label: '医院数据',
                    key: '3-4'
                },
                {
                    value: '5',
                    label: '科室数据',
                    key: '3-5'
                },
            ],
        },
        {
            value: '4',
            label: '影像文件',
            children: [
                {
                    value: '1',
                    label: 'CT',
                    key: '4-1'
                },
                {
                    value: '2',
                    label: 'MRI',
                    key: '4-2'
                },
                {
                    value: '3',
                    label: 'DR',
                    key: '4-3'
                },
                {
                    value: '4',
                    label: 'CR',
                    key: '4-4'
                },
                {
                    value: '5',
                    label: 'DSA',
                    key: '4-5'
                },
            ],
        },
        {
            value: '5',
            label: '计算类数据',
            children: [
                {
                    value: '1',
                    label: '统计数据',
                    key: '5-1'
                },
                {
                    value: '2',
                    label: '分析数据',
                    key: '5-2'
                },
                {
                    value: '3',
                    label: '预测数据',
                    key: '5-3'
                },
                {
                    value: '4',
                    label: '推荐数据',
                    key: '5-4'
                },
                {
                    value: '5',
                    label: '评分数据',
                    key: '5-5'
                },
            ],
        },
    ]
}

export default config
