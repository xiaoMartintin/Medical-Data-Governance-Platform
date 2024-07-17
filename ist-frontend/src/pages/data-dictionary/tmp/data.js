export const initialDictionaries = [
    {
        key: '1',
        name: 'Dictionary 1',
        description: 'Description 1',
        dataSourceId: '1',
        content: [
            { key: '1', name: 'D1-Field 1', table:'D1-Table 1' ,type: 'Type 1', description: 'Description 1' },
            { key: '2', name: 'D1-Field 2', table:'D1-Table 1' ,type: 'Type 2', description: 'Description 2' },
            { key: '3', name: 'D1-Field 3', table:'D1-Table 2' ,type: 'Type 1', description: 'Description 3' },
            { key: '4', name: 'D1-Field 4', table:'D1-Table 2' ,type: 'Type 2', description: 'Description 4' },
            { key: '5', name: 'D1-Field 5', table:'D1-Table 2' ,type: 'Type 1', description: 'Description 5' },
        ]
    },
    {
        key: '2',
        name: 'Dictionary 2',
        description: 'Description 2',
        dataSourceId: '2',
        content: [
            { key: '1', name: 'D2-Field 1', table:'D2-Table 1' ,type: 'Type 1', description: 'Description 1' },
            { key: '2', name: 'D2-Field 2', table:'D2-Table 2' ,type: 'Type 2', description: 'Description 2' },
            { key: '3', name: 'D2-Field 3', table:'D2-Table 2' ,type: 'Type 2', description: 'Description 3' },
        ]
    },
    {
        key: '3',
        name: 'DemoDictionary',
        description: 'Demo of data dictionary, data from FUJIFILM(China) Investment Co., Ltd.',
        dataSourceId: '3',
        content: [
            { key: '1', name: 'ID', table:'Disease' ,type: 'integer', description: 'Description 1' },
            { key: '2', name: 'Name', table:'Disease' ,type: 'character varying(64)', description: 'Description 2' },
            { key: '3', name: 'SCP_AE', table:'Disease' ,type: 'character varying(64)', description: 'Description 3' },
            { key: '4', name: 'Remark', table:'Disease' ,type: 'character varying(64)', description: 'Description 4' },
            { key: '5', name: 'isDeleted', table:'Disease' ,type: 'boolean', description: 'Description 5' },
            { key: '6', name: 'OperatorID', table:'Disease' ,type: 'integer', description: 'Description 6' },
            { key: '7', name: 'OperateTime', table:'Disease' ,type: 'timestamp without time zone', description: 'Description 7' },
            { key: '8', name: 'ID', table:'Study' ,type: 'bigint', description: 'Description 8' },
            { key: '9', name: 'HospitalCode', table:'Study' ,type: 'character varying(128)', description: 'Description 9' },
            { key: '10', name: 'HospitalName', table:'Study' ,type: 'character varying(128)', description: 'Description 10' },
            { key: '11', name: 'OriginalPatientID', table:'Study' ,type: 'character varying(128)', description: 'Description 11' },
            { key: '12', name: 'OriginalStudyUID', table:'Study' ,type: 'character varying(128)', description: 'Description 12' },
            { key: '13', name: 'OriginalAccessionNumber', table:'Study' ,type: 'character varying(64)', description: 'Description 13' },
            { key: '14', name: 'OriginalPatientName', table:'Study' ,type: 'character varying(128)', description: 'Description 14' },
            { key: '15', name: 'ID', table:'DiseaseStudy' ,type: 'bigint', description: 'Description 15' },
            { key: '16', name: 'DiseaseID', table:'DiseaseStudy' ,type: 'integer', description: 'Description 16' },
            { key: '17', name: 'StudyID', table:'DiseaseStudy' ,type: 'bigint', description: 'Description 17' },
            { key: '18', name: 'Status', table:'DiseaseStudy' ,type: 'integer', description: 'Description 18' },
            { key: '19', name: 'isDeleted', table:'DiseaseStudy' ,type: 'boolean', description: 'Description 19' },
            { key: '20', name: 'OperateTime', table:'DiseaseStudy' ,type: 'timestamp without time zone', description: 'Description 20' },
        ]
    },
];

export const lineage = {
    nodes: [
        {id: 'node1', name: 'DW_Table 1', category: 'dw_table', value: 'DW_Table 1', draggable: true},
        {id: 'node2', name: 'DW_Table 2', category: 'dw_table', value: 'DW_Table 2', draggable: true},
        {id: 'node3', name: 'Table 1', category: 'table', value: 'Table 1', draggable: true}
    ],
    links: [
        {source: 'node1', target: 'node3'},
        {source: 'node2', target: 'node3'}
    ]
}

export const lineageData = [
    {
        id: '1',
        name: 'DiseaseID',
        key: '16',
        dictionaryKey: '3',
        parentName: 'ID',
        parentKey: '1',
    },
    {
        id: '2',
        name: 'StudyID',
        key: '17',
        dictionaryKey: '3',
        parentName: 'ID',
        parentKey: '8',
    }
];

export const dataSources = [
    { id: '1', name: 'DataSource 1' },
    { id: '2', name: 'DataSource 2' },
    { id: '3', name: 'FUJIFILM DataSource' },
];

export const types = [
    'integer',
    'bigint',
    'character varying(64)',
    'character varying(128)',
    'boolean',
    'timestamp without time zone',
    'Type 1',
    'Type 2',
];

// export const initialDictionaries = [
//     {
//         key: '1',
//         name: 'DemoDictionary',
//         description: 'Demo of data dictionary, data from FUJIFILM(China) Co., Ltd.',
//         content: [
//             { key: '1', name: 'ID', table:'Disease' ,type: 'integer', description: 'Description 1' },
//             { key: '2', name: 'Name', table:'Disease' ,type: 'character varying(64)', description: 'Description 2' },
//             { key: '3', name: 'SCP_AE', table:'Disease' ,type: 'character varying(64)', description: 'Description 3' },
//             { key: '4', name: 'Remark', table:'Disease' ,type: 'character varying(64)', description: 'Description 4' },
//             { key: '5', name: 'isDeleted', table:'Disease' ,type: 'boolean', description: 'Description 5' },
//             { key: '6', name: 'OperatorID', table:'Disease' ,type: 'integer', description: 'Description 6' },
//             { key: '7', name: 'OperateTime', table:'Disease' ,type: 'timestamp without time zone', description: 'Description 7' },
//             { key: '8', name: 'ID', table:'Study' ,type: 'bigint', description: 'Description 8' },
//             { key: '9', name: 'HospitalCode', table:'Study' ,type: 'character varying(128)', description: 'Description 9' },
//             { key: '10', name: 'HospitalName', table:'Study' ,type: 'character varying(128)', description: 'Description 10' },
//             { key: '11', name: 'OriginalPatientID', table:'Study' ,type: 'character varying(128)', description: 'Description 11' },
//             { key: '12', name: 'OriginalStudyUID', table:'Study' ,type: 'character varying(128)', description: 'Description 12' },
//             { key: '13', name: 'OriginalAccessionNumber', table:'Study' ,type: 'character varying(64)', description: 'Description 13' },
//             { key: '14', name: 'OriginalPatientName', table:'Study' ,type: 'character varying(128)', description: 'Description 14' },
//             { key: '15', name: 'ID', table:'DiseaseStudy' ,type: 'bigint', description: 'Description 15' },
//             { key: '16', name: 'DiseaseID', table:'DiseaseStudy' ,type: 'integer', description: 'Description 16' },
//             { key: '17', name: 'StudyID', table:'DiseaseStudy' ,type: 'bigint', description: 'Description 17' },
//             { key: '18', name: 'Status', table:'DiseaseStudy' ,type: 'integer', description: 'Description 18' },
//             { key: '19', name: 'isDeleted', table:'DiseaseStudy' ,type: 'boolean', description: 'Description 19' },
//             { key: '20', name: 'OperateTime', table:'DiseaseStudy' ,type: 'timestamp without time zone', description: 'Description 20' },
//         ]
//     },
// ];
