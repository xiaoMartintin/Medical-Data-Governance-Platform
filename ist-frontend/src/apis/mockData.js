//TODO:mock
import {initialDictionaries} from "../pages/data-dictionary/tmp/data";

export let dictionaries = initialDictionaries;

export let mockData = {
    models: [
        {
            id: 0,
            modelName: "疾病数据",
            realtime: false,
            type: 1,
            modal: 1,
            domain: "VNA_VIEW",
            description: "Disease",
            tag: ["Disease"],
            dictionary: [
                {
                    key: '3',
                }
            ],
            fields: [
                {
                    name: "ID",
                    type: 3,
                    description: "ID",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "name",
                    type: 4,
                    description: "name",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "SCP_AE",
                    type: 4,
                    description: "SCP_AE",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "remark",
                    type: 4,
                    description: "remark",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "isDeleted",
                    type: 5,
                    description: "isDeleted",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "operatorID",
                    type: 3,
                    description: "operatorID",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "operatorTime",
                    type: 6,
                    description: "operatorTime",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
            ],
            dataSources: [
                {
                    dataSourceId: 1,
                    type: 1,
                    tag: "disease",
                    schemaName: "public",
                    tableName: "Disease",
                    collectionName: null,
                    description: "疾病资源",
                    url: "10.10.16.51 5432 postgres Fieldenginee1r VNA_VIEW_DB"
                },
            ],
            fieldMaps: [
                {
                    "ID": "ID",
                    "name": "name",
                    "SCP_AE": "SCP_AE",
                    "remark": "remark",
                    "isDeleted": "isDeleted",
                    "operatorID": "operatorID",
                    "operatorTime": "operatorTime",
                },
            ],
        },
        {
            id: 1,
            modelName: "研究数据",
            realtime: false,
            type: 1,
            modal: 1,
            domain: "VNA_VIEW",
            description: "Study",
            tag: ["Study"],
            dictionary: [
                {
                    key: '3',
                }
            ],
            fields: [
                {
                    name: "ID",
                    type: 3,
                    description: "ID",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "hospitalCode",
                    type: 4,
                    description: "hospitalCode",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "hospitalName",
                    type: 4,
                    description: "hospitalName",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "originalPatientID",
                    type: 4,
                    description: "originalPatientID",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "originalStudyUID",
                    type: 4,
                    description: "originalStudyUID",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "originalAccessionNumber",
                    type: 4,
                    description: "originalAccessionNumber",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "originalPatientName",
                    type: 4,
                    description: "originalPatientName",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
            ],
            dataSources: [
                {
                    dataSourceId: 2,
                    type: 1,
                    tag: "study",
                    schemaName: "public",
                    tableName: "Study",
                    collectionName: null,
                    description: "研究资源",
                    url: "10.10.16.51 5432 postgres Fieldenginee1r VNA_VIEW_DB"
                },
            ],
            fieldMaps: [
                {
                    "ID": "ID",
                    "hospitalCode": "hospitalCode",
                    "hospitalName": "hospitalName",
                    "originalPatientID": "originalPatientID",
                    "originalStudyUID": "originalStudyUID",
                    "originalAccessionNumber": "originalAccessionNumber",
                    "originalPatientName": "originalPatientName",
                },
            ],
        },
        {
            id: 2,
            modelName: "疾病研究数据",
            realtime: false,
            type: 1,
            modal: 1,
            domain: "VNA_VIEW",
            description: "DiseaseStudy",
            tag: ["Disease", "Study"],
            dictionary: [
                {
                    key: '3',
                }
            ],
            fields: [
                {
                    name: "ID",
                    type: 3,
                    description: "ID",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "diseaseID",
                    type: 3,
                    description: "diseaseID",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "studyID",
                    type: 3,
                    description: "studyID",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "status",
                    type: 3,
                    description: "status",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "isDeleted",
                    type: 5,
                    description: "isDeleted",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
                {
                    name: "operatorTime",
                    type: 6,
                    description: "operatorTime",
                    sensitive: null,
                    encrypt: null,
                    secretLevel: "公开"
                },
            ],
            dataSources: [
                {
                    dataSourceId: 1,
                    type: 1,
                    tag: "disease",
                    schemaName: "public",
                    tableName: "Disease",
                    collectionName: null,
                    description: "疾病资源",
                    url: "10.10.16.51 5432 postgres Fieldenginee1r VNA_VIEW_DB"
                },
                {
                    dataSourceId: 2,
                    type: 1,
                    tag: "study",
                    schemaName: "public",
                    tableName: "Study",
                    collectionName: null,
                    description: "研究资源",
                    url: "10.10.16.51 5432 postgres Fieldenginee1r VNA_VIEW_DB"
                },
                {
                    dataSourceId: 3,
                    type: 1,
                    tag: "disease study",
                    schemaName: "public",
                    tableName: "DiseaseStudy",
                    collectionName: null,
                    description: "疾病研究资源",
                    url: "10.10.16.51 5432 postgres Fieldenginee1r VNA_VIEW_DB"
                },
            ],
            fieldMaps: [
                {
                    "ID": "diseaseID",
                },
                {
                    "ID": "studyID",
                },
                {
                    "ID": "ID",
                    "status": "status",
                    "isDeleted": "isDeleted",
                    "operatorTime": "operatorTime",
                },
            ],
        },
    ],
    tree: [
        {
            id: 0,
            name: "疾病资源",
            table_name: "Disease",
            description: "疾病资源",
            database_belong: 0,
            field_num: 7,
            creator: "postgres",
            data_source: "10.10.16.51:5432/VNA_VIEW_DB",
            create_time: "2024-01-01 12:00:00.000000",
            last_update_time: "2024-07-05 13:35:38.119473",
            last_edit_time: "2024-07-06 13:35:38.119473",
            data_update_frequency: 100,
            data_maintenance_cycle: 15,
        },
        {
            id: 1,
            name: "研究资源",
            table_name: "Study",
            description: "研究资源",
            database_belong: 0,
            field_num: 7,
            creator: "postgres",
            data_source: "10.10.16.51:5432/VNA_VIEW_DB",
            create_time: "2024-01-01 12:00:00.000000",
            last_update_time: "2024-07-07 13:35:38.119473",
            last_edit_time: "2024-07-08 13:35:38.119473",
            data_update_frequency: 100,
            data_maintenance_cycle: 15,
        },
        {
            id: 2,
            name: "疾病研究资源",
            table_name: "DiseaseStudy",
            description: "疾病研究资源",
            database_belong: 0,
            field_num: 6,
            creator: "postgres",
            data_source: "10.10.16.51:5432/VNA_VIEW_DB",
            create_time: "2024-01-01 12:00:00.000000",
            last_update_time: "2024-07-09 13:35:38.119473",
            last_edit_time: "2024-07-10 13:35:38.119473",
            data_update_frequency: 100,
            data_maintenance_cycle: 15,
        },
    ],
    diseaseField: [
        {
            ID: "",
            name: "",
            SCP_AE: "",
            remark: "",
            isDeleted: "",
            operatorID: "",
            operatorTime: "",
        },
    ],
    diseaseFieldDetail: [
        {
            name: "ID",
            type: 3,
            description: "ID",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "name",
            type: 4,
            description: "name",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "SCP_AE",
            type: 4,
            description: "SCP_AE",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "remark",
            type: 4,
            description: "remark",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "isDeleted",
            type: 5,
            description: "isDeleted",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "operatorID",
            type: 3,
            description: "operatorID",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "operatorTime",
            type: 6,
            description: "operatorTime",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
    ],
    diseaseTable: [
        {
            ID: 1,
            name: "肝Ca",
            SCP_AE: "ganaiscp",
            remark: "",
            isDeleted: false.toString(),
            operatorID: 1,
            operatorTime: "2024-03-11 16:50:51.26524",
        },
        {
            ID: 2,
            name: "肺Ca",
            SCP_AE: "feiaiscp",
            remark: "",
            isDeleted: false.toString(),
            operatorID: 1,
            operatorTime: "2024-03-11 16:51:00.596301",
        },
        {
            ID: 3,
            name: "消化系统疾病",
            SCP_AE: "消化",
            remark: "",
            isDeleted: false.toString(),
            operatorID: 1,
            operatorTime: "2024-04-03 09:43:42.086945",
        },
        {
            ID: 4,
            name: "呼吸系统疾病",
            SCP_AE: "呼吸",
            remark: "",
            isDeleted: false.toString(),
            operatorID: 1,
            operatorTime: "2024-04-03 09:43:51.217841",
        },
    ],
    studyField: [
        {
            ID: "",
            hospitalCode: "",
            hospitalName: "",
            originalPatientID: "",
            originalStudyUID: "",
            originalAccessionNumber: "",
            originalPatientName: "",
        },
    ],
    studyFieldDetail: [
        {
            name: "ID",
            type: 3,
            description: "ID",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "hospitalCode",
            type: 4,
            description: "hospitalCode",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "hospitalName",
            type: 4,
            description: "hospitalName",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "originalPatientID",
            type: 4,
            description: "originalPatientID",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "originalStudyUID",
            type: 4,
            description: "originalStudyUID",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "originalAccessionNumber",
            type: 4,
            description: "originalAccessionNumber",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "originalPatientName",
            type: 4,
            description: "originalPatientName",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
    ],
    studyTable: [
        {
            ID: 1,
            hospitalCode: null,
            hospitalName: "YANSHIJIGOUYI",
            originalPatientID: "YS100004",
            originalStudyUID: "1.2.840.173619",
            originalAccessionNumber: "CT5998327",
            originalPatientName: "演示四",
        },
        {
            ID: 2,
            hospitalCode: null,
            hospitalName: "",
            originalPatientID: "YS100002",
            originalStudyUID: "7.2.840.773554",
            originalAccessionNumber: "MR2312290021",
            originalPatientName: "演示二",
        },
        {
            ID: 3,
            hospitalCode: null,
            hospitalName: "",
            originalPatientID: "YS100001",
            originalStudyUID: "1.2.840.173619",
            originalAccessionNumber: "CT2208230657",
            originalPatientName: "演示一",
        },
        {
            ID: 4,
            hospitalCode: null,
            hospitalName: "",
            originalPatientID: "YS100001",
            originalStudyUID: "1.2.840.113554",
            originalAccessionNumber: "MR2208250003",
            originalPatientName: "演示一",
        },
        {
            ID: 5,
            hospitalCode: null,
            hospitalName: "YANSHIJIGOUYI",
            originalPatientID: "YS100004",
            originalStudyUID: "1.2.840.173619",
            originalAccessionNumber: "CT5887433",
            originalPatientName: "演示四",
        },
        {
            ID: 6,
            hospitalCode: null,
            hospitalName: "",
            originalPatientID: "YS100001",
            originalStudyUID: "1.2.840.173554",
            originalAccessionNumber: "MR2306020117",
            originalPatientName: "演示一",
        },
        {
            ID: 7,
            hospitalCode: null,
            hospitalName: "",
            originalPatientID: "YS100001",
            originalStudyUID: "1.2.840.173554",
            originalAccessionNumber: "MR2311200116",
            originalPatientName: "演示一",
        },
        {
            ID: 8,
            hospitalCode: null,
            hospitalName: "YANSHIJIGOUYI",
            originalPatientID: "YS100004",
            originalStudyUID: "1.2.840.173619",
            originalAccessionNumber: "CT5561531",
            originalPatientName: "演示四",
        },
        {
            ID: 9,
            hospitalCode: null,
            hospitalName: "YANSHIJIGOUYI",
            originalPatientID: "YS100004",
            originalStudyUID: "1.2.840.173619",
            originalAccessionNumber: "CT5494453",
            originalPatientName: "演示四",
        },
        {
            ID: 10,
            hospitalCode: null,
            hospitalName: "",
            originalPatientID: "YS100001",
            originalStudyUID: "1.2.840.173554",
            originalAccessionNumber: "MR2207010087",
            originalPatientName: "演示一",
        },
    ],
    diseaseStudyField: [
        {
            ID: "",
            diseaseID: "",
            studyID: "",
            status: "",
            isDeleted: "",
            operatorTime: "",
        },
    ],
    diseaseStudyFieldDetail: [
        {
            name: "ID",
            type: 3,
            description: "ID",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "diseaseID",
            type: 3,
            description: "diseaseID",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "studyID",
            type: 3,
            description: "studyID",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "status",
            type: 3,
            description: "status",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "isDeleted",
            type: 5,
            description: "isDeleted",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
        {
            name: "operatorTime",
            type: 6,
            description: "operatorTime",
            sensitive: null,
            encrypt: null,
            secretLevel: "公开"
        },
    ],
    diseaseStudyTable: [
        {
            ID: 1,
            diseaseID: 2,
            studyID: 1,
            status: 3,
            isDeleted: false.toString(),
            operatorTime: "2024-03-12 11:17:27.344969",
        },
        {
            ID: 2,
            diseaseID: 1,
            studyID: 2,
            status: 3,
            isDeleted: false.toString(),
            operatorTime: "2024-03-26 09:08:21.603067",
        },
        {
            ID: 3,
            diseaseID: 1,
            studyID: 3,
            status: 3,
            isDeleted: false.toString(),
            operatorTime: "2024-03-15 20:31:06.76075",
        },
        {
            ID: 4,
            diseaseID: 1,
            studyID: 4,
            status: 3,
            isDeleted: false.toString(),
            operatorTime: "2024-03-15 20:35:26.087542",
        },
        {
            ID: 5,
            diseaseID: 2,
            studyID: 5,
            status: 3,
            isDeleted: false.toString(),
            operatorTime: "2024-03-12 11:17:27.344969",
        },
        {
            ID: 6,
            diseaseID: 1,
            studyID: 6,
            status: 3,
            isDeleted: false.toString(),
            operatorTime: "2024-03-15 21:27:14.564912",
        },
        {
            ID: 7,
            diseaseID: 1,
            studyID: 7,
            status: 3,
            isDeleted: false.toString(),
            operatorTime: "2024-03-15 21:30:36.685473",
        },
        {
            ID: 8,
            diseaseID: 2,
            studyID: 8,
            status: 3,
            isDeleted: false.toString(),
            operatorTime: "2024-03-12 11:17:27.344969",
        },
        {
            ID: 9,
            diseaseID: 2,
            studyID: 9,
            status: 3,
            isDeleted: false.toString(),
            operatorTime: "2024-03-12 17:17:27.344969",
        },
        {
            ID: 10,
            diseaseID: 1,
            studyID: 10,
            status: 3,
            isDeleted: false.toString(),
            operatorTime: "2024-03-15 16:15:00.1942741",
        },
    ],
    dataSource: [
        {
            dataSourceId: 1,
            type: 1,
            tag: "disease",
            schemaName: "public",
            tableName: "Disease",
            collectionName: null,
            description: "疾病资源",
            url: "10.10.16.51 5432 postgres Fieldenginee1r VNA_VIEW_DB"
        },
        {
            dataSourceId: 2,
            type: 1,
            tag: "study",
            schemaName: "public",
            tableName: "Study",
            collectionName: null,
            description: "研究资源",
            url: "10.10.16.51 5432 postgres Fieldenginee1r VNA_VIEW_DB"
        },
        {
            dataSourceId: 3,
            type: 1,
            tag: "disease study",
            schemaName: "public",
            tableName: "DiseaseStudy",
            collectionName: null,
            description: "疾病研究资源",
            url: "10.10.16.51 5432 postgres Fieldenginee1r VNA_VIEW_DB"
        },
    ],
    dictionaries: initialDictionaries,
};
