export const DataAssets = [
    {
        "id": "668b552602e1715754550fb1",
        "modelName": "disease1",
        "modal": 3,
        "type": 3,
        "tag": [
            "disease"
        ],
        "domain": "disease",
        "description": "disease",
        "realtime": true,
        "fields": [
            {
                "name": "__id__",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "_source_id_",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "content",
                "type": 2,
                "description": "test",
                "sensitive": true,
                "encrypt": true,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668b521f02e1715754550faf",
                "type": 2,
                "url": "mongodb://root:123456@127.0.0.1:27017/datamanagement",
                "tag": "disease",
                "description": "disease",
                "collectionName": "disease"
            }
        ],
        "fieldMaps": [
            {
                "modelName": "content",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "ftpUtil": {},
        "rules": [],
        "fileUtil": {}
    },
    {
        "id": "668b552602e1715754550fb2",
        "modelName": "disease2",
        "modal": 2,
        "type": 1,
        "tag": [
            "disease"
        ],
        "domain": "disease",
        "description": "disease",
        "realtime": true,
        "fields": [
            {
                "name": "__id__",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "_source_id_",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "disease",
                "type": 2,
                "description": "disease",
                "sensitive": true,
                "encrypt": true,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668b521f02e1715754550fb0",
                "type": 1,
                "url": "postgresql://root:123456@127.0.0.1:27017/test1",
                "tag": "disease",
                "description": "disease",
                "schemaName": "disease",
                "tableName": "disease"
            }
        ],
        "fieldMaps": [
            {
                "modelName": "disease2",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "ftpUtil": {},
        "rules": [],
        "fileUtil": {}
    },
    {
        "id": "668cd1bed5323c451bedd575",
        "modelName": "disease3",
        "modal": 3,
        "type": 1,
        "tag": [
            "disease"
        ],
        "domain": "disease",
        "description": "disease",
        "realtime": true,
        "fields": [
            {
                "name": "__id__",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "_source_id_",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "name",
                "type": 2,
                "description": "disease",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "number",
                "type": 1,
                "description": "disease",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "_id",
                "type": 2,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668cd16ad5323c451bedd574",
                "type": 2,
                "url": "mongodb://fjt:123456@127.0.0.1:27017/bookStore",
                "tag": "disease",
                "description": "disease",
                "collectionName": "disease"
            }
        ],
        "fieldMaps": [
            {
                "number": "number",
                "name": "name",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "rules": [
            {
                "description": "",
                "ruleType": 2,
                "fieldName": "_id"
            }
        ]
    },
    {
        "id": "668cd900d5323c451bedd57d",
        "modelName": "study1",
        "modal": 3,
        "type": 1,
        "tag": [],
        "domain": "study",
        "description": "study",
        "realtime": true,
        "fields": [
            {
                "name": "__id__",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "_source_id_",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "name",
                "type": 2,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668cd922d5323c451bedd57f",
                "type": 2,
                "url": "mongodb://fjt:123456@127.0.0.1:27017/person",
                "tag": "study",
                "description": "study",
                "collectionName": "study"
            }
        ],
        "fieldMaps": [
            {
                "name": "name",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "rules": [
            {
                "description": "",
                "ruleType": 2,
                "fieldName": "name"
            }
        ]
    },
    {
        "id": "668cd900d5323c451bedd57f",
        "modelName": "study2",
        "modal": 3,
        "type": 1,
        "tag": [],
        "domain": "study",
        "description": "study",
        "realtime": true,
        "fields": [
            {
                "name": "name",
                "type": 2,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668cd922d5323c451bedd581",
                "type": 4,
                "url": "influxdb://fjt:123456@127.0.0.1:27017/student",
                "tag": "study",
                "description": "study",
                "tableName": "study"
            }
        ],
        "fieldMaps": [
            {
                "name": "name",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "rules": [
            {
                "description": "",
                "ruleType": 2,
                "fieldName": "name"
            }
        ]
    },
    {
        "id": "668cd900d5323c451bedd580",
        "modelName": "study3",
        "modal": 3,
        "type": 1,
        "tag": [],
        "domain": "study",
        "description": "study",
        "realtime": true,
        "fields": [
            {
                "name": "name",
                "type": 2,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668cd922d5323c451bedd582",
                "type": 3,
                "url": "directory://fjt:123456@127.0.0.1:27017/player",
                "tag": "study",
                "description": "study",
                "collectionName": "study"
            }
        ],
        "fieldMaps": [
            {
                "name": "name",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "rules": [
            {
                "description": "",
                "ruleType": 2,
                "fieldName": "name"
            }
        ]
    },
    {
        "id": "8cdce8572c9905fcf8c432e2",
        "modelName": "diseasestudy1",
        "modal": 5,
        "type": 1,
        "tag": [
            "diseasestudy"
        ],
        "domain": "diseasestudy",
        "description": "diseasestudy",
        "realtime": false,
        "fields": [
            {
                "name": "_unique_id_",
                "type": 1,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 1
            },
            {
                "name": "_data_id_",
                "type": 3,
                "description": "",
                "sensitive": false,
                "encrypt": true,
                "secretLevel": 0
            },
            {
                "name": "data",
                "type": 4,
                "description": "diseasestudy",
                "sensitive": false,
                "encrypt": true,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "c78ea0163dc44f61a70b5188",
                "type": 1,
                "url": "postgresql://user:password@host/database",
                "tag": "diseasestudy",
                "description": "diseasestudy",
                "schemaName": "diseasestudy",
                "tableName": "diseasestudy"
            }
        ],
        "fieldMaps": [
            {
                "modelName": "data",
                "_id": "_unique_id_"
            }
        ],
        "qualityScore": 85,
        "lastUpdateTime": "2024-07-12T06:12:07Z",
        "ftpUtil": {},
        "rules": [],
        "fileUtil": {}
    },
    {
        "id": "0d1b2e2a1e6b3c1a5b1b6d4e",
        "modelName": "diseasestudy2",
        "modal": 4,
        "type": 2,
        "tag": ["tag1"],
        "domain": "diseasestudy",
        "description": "diseasestudy",
        "realtime": false,
        "fields": [
            {
                "name": "grade",
                "type": 3,
                "description": "diseasestudy",
                "sensitive": false,
                "encrypt": true,
                "secretLevel": 2
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "36f98de2c4a1b8d5",
                "type": 2,
                "url": "mongodb://user:password@123.456.789.10:27017/classroom",
                "tag": "diseasestudy",
                "description": "diseasestudy",
                "collectionName": "diseasestudy"
            }
        ],
        "fieldMaps": [
            {
                "name": "grade",
                "_id": "__id__"
            }
        ],
        "qualityScore": 80,
        "lastUpdateTime": "2024-07-12T06:17:38Z",
        "rules": [
            {
                "description": "Rule for grade field",
                "ruleType": 1,
                "fieldName": "grade"
            }
        ]
    },
    {
        "id": "7a0c9f5b2d4a1e3c4a5a6d3e",
        "modelName": "diseasestudy3",
        "modal": 5,
        "type": 3,
        "tag": ["tag2", "tag3"],
        "domain": "diseasestudy",
        "description": "diseasestudy",
        "realtime": true,
        "fields": [
            {
                "name": "subject",
                "type": 1,
                "description": "diseasestudy",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "d5a1c3e2b1b4b6d4",
                "type": 4,
                "url": "influxdb://user:password@host/database",
                "tag": "diseasestudy",
                "description": "diseasestudy",
                "tableName": "diseasestudy"
            }
        ],
        "fieldMaps": [
            {
                "name": "subject",
                "_id": "__id__"
            }
        ],
        "qualityScore": 90,
        "lastUpdateTime": "2024-07-12T06:17:38Z",
        "rules": [
            {
                "description": "Rule for subject field",
                "ruleType": 2,
                "fieldName": "subject"
            }
        ]
    },
    {
        "id": "8d1e2b4a7a2e1c3a7b5a4d",
        "modelName": "disease4",
        "modal": 2,
        "type": 4,
        "tag": ["tag4"],
        "domain": "disease",
        "description": "disease",
        "realtime": false,
        "fields": [
            {
                "name": "credits",
                "type": 3,
                "description": "disease",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "2b5c1d8e3a5a4b9",
                "type": 3,
                "url": "directory://username:password@host:port/course_db",
                "tag": "disease",
                "description": "disease",
            }
        ],
        "fieldMaps": [
            {
                "name": "credits",
                "_id": "__id__"
            }
        ],
        "qualityScore": 75,
        "lastUpdateTime": "2024-07-12T06:17:38Z",
        "rules": [
            {
                "description": "disease",
                "ruleType": 1,
                "fieldName": "credits"
            }
        ]
    },
    {
        "id": "3b6a4d5e2a1b3c1a6c4d",
        "modelName": "diseasestudy4",
        "modal": 5,
        "type": 3,
        "tag": ["tag6", "tag7"],
        "domain": "diseasestudy",
        "description": "diseasestudy",
        "realtime": true,
        "fields": [
            {
                "name": "position",
                "type": 2,
                "description": "diseasestudy",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "9d3a1b6a4e7c2d1",
                "type": 4,
                "url": "influxdb://user:password@host:port/admin_db",
                "tag": "diseasestudy",
                "description": "diseasestudy",
                "tableName": "diseasestudy"
            }
        ],
        "fieldMaps": [
            {
                "name": "position",
                "_id": "__id__"
            }
        ],
        "qualityScore": 95,
        "lastUpdateTime": "2024-07-12T06:17:38Z",
        "rules": [
            {
                "description": "Rule for position field",
                "ruleType": 2,
                "fieldName": "position"
            }
        ]
    }
]

/*export const DataModels = [
    {
        "id": "668b552602e1715754550fb1",
        "modelName": "test",
        "modal": 3,
        "type": 3,
        "tag": [
            "test"
        ],
        "domain": "test",
        "description": "test",
        "realtime": true,
        "fields": [
            {
                "name": "content",
                "type": 2,
                "description": "test",
                "sensitive": true,
                "encrypt": true,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668b521f02e1715754550faf",
                "type": 2,
                "url": "mongodb://root:123456@127.0.0.1:27017/datamanagement",
                "tag": "test",
                "description": "test",
                "collectionName": "data_model"
            }
        ],
        "fieldMaps": [
            {
                "modelName": "content",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "ftpUtil": {},
        "rules": [],
        "fileUtil": {}
    },
    {
        "id": "668b552602e1715754550fb2",
        "modelName": "test1",
        "modal": 2,
        "type": 1,
        "tag": [
            "test1"
        ],
        "domain": "test1",
        "description": "test1",
        "realtime": true,
        "fields": [
            {
                "name": "__id__",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "_source_id_",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "test1",
                "type": 2,
                "description": "test1",
                "sensitive": true,
                "encrypt": true,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668b521f02e1715754550fb0",
                "type": 1,
                "url": "postgresql://root:123456@127.0.0.1:27017/test1",
                "tag": "test1",
                "description": "test1",
                "schemaName": "test1",
                "tableName": "test1"
            }
        ],
        "fieldMaps": [
            {
                "modelName": "test1",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "ftpUtil": {},
        "rules": [],
        "fileUtil": {}
    },
    {
        "id": "668cd1bed5323c451bedd575",
        "modelName": "bookinfo",
        "modal": 3,
        "type": 1,
        "tag": [
            "test"
        ],
        "domain": "test",
        "description": "test",
        "realtime": true,
        "fields": [
            {
                "name": "name",
                "type": 2,
                "description": "test",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "number",
                "type": 1,
                "description": "test",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "_id",
                "type": 2,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668cd16ad5323c451bedd574",
                "type": 2,
                "url": "mongodb://fjt:123456@127.0.0.1:27017/bookStore",
                "tag": "test",
                "description": "test",
                "collectionName": "book"
            }
        ],
        "fieldMaps": [
            {
                "number": "number",
                "name": "name",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "rules": [
            {
                "description": "",
                "ruleType": 2,
                "fieldName": "_id"
            }
        ]
    },
    {
        "id": "668cd900d5323c451bedd57d",
        "modelName": "person",
        "modal": 3,
        "type": 1,
        "tag": [],
        "domain": "person",
        "description": "person",
        "realtime": true,
        "fields": [
            {
                "name": "name",
                "type": 2,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668cd922d5323c451bedd57f",
                "type": 2,
                "url": "mongodb://fjt:123456@127.0.0.1:27017/person",
                "tag": "person",
                "description": "person",
                "collectionName": "person"
            }
        ],
        "fieldMaps": [
            {
                "name": "name",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "rules": [
            {
                "description": "",
                "ruleType": 2,
                "fieldName": "name"
            }
        ]
    },
    {
        "id": "668cd900d5323c451bedd57f",
        "modelName": "student",
        "modal": 3,
        "type": 1,
        "tag": [],
        "domain": "student",
        "description": "student",
        "realtime": true,
        "fields": [
            {
                "name": "name",
                "type": 2,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668cd922d5323c451bedd581",
                "type": 4,
                "url": "influxdb://fjt:123456@127.0.0.1:27017/student",
                "tag": "student",
                "description": "student",
                "tableName": "student"
            }
        ],
        "fieldMaps": [
            {
                "name": "name",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "rules": [
            {
                "description": "",
                "ruleType": 2,
                "fieldName": "name"
            }
        ]
    },
    {
        "id": "668cd900d5323c451bedd580",
        "modelName": "player",
        "modal": 3,
        "type": 1,
        "tag": [],
        "domain": "player",
        "description": "player",
        "realtime": true,
        "fields": [
            {
                "name": "name",
                "type": 2,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668cd922d5323c451bedd582",
                "type": 3,
                "url": "directory://fjt:123456@127.0.0.1:27017/player",
                "tag": "player",
                "description": "player",
                "collectionName": "player"
            }
        ],
        "fieldMaps": [
            {
                "name": "name",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "rules": [
            {
                "description": "",
                "ruleType": 2,
                "fieldName": "name"
            }
        ]
    },
    {
        "id": "8cdce8572c9905fcf8c432e2",
        "modelName": "example",
        "modal": 5,
        "type": 1,
        "tag": [
            "example"
        ],
        "domain": "example",
        "description": "example",
        "realtime": false,
        "fields": [
            {
                "name": "_unique_id_",
                "type": 1,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 1
            },
            {
                "name": "_data_id_",
                "type": 3,
                "description": "",
                "sensitive": false,
                "encrypt": true,
                "secretLevel": 0
            },
            {
                "name": "data",
                "type": 4,
                "description": "example",
                "sensitive": false,
                "encrypt": true,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "c78ea0163dc44f61a70b5188",
                "type": 1,
                "url": "postgresql://user:password@host/database",
                "tag": "example",
                "description": "example",
                "schemaName": "data_table",
                "tableName": "data_table"
            }
        ],
        "fieldMaps": [
            {
                "modelName": "data",
                "_id": "_unique_id_"
            }
        ],
        "qualityScore": 85,
        "lastUpdateTime": "2024-07-12T06:12:07Z",
        "ftpUtil": {},
        "rules": [],
        "fileUtil": {}
    },
    {
        "id": "0d1b2e2a1e6b3c1a5b1b6d4e",
        "modelName": "class",
        "modal": 4,
        "type": 2,
        "tag": ["tag1"],
        "domain": "classroom",
        "description": "classroom",
        "realtime": false,
        "fields": [
            {
                "name": "grade",
                "type": 3,
                "description": "Student's grade",
                "sensitive": false,
                "encrypt": true,
                "secretLevel": 2
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "36f98de2c4a1b8d5",
                "type": 2,
                "url": "mongodb://user:password@123.456.789.10:27017/classroom",
                "tag": "classroom",
                "description": "classroom",
                "collectionName": "classroom"
            }
        ],
        "fieldMaps": [
            {
                "name": "grade",
                "_id": "__id__"
            }
        ],
        "qualityScore": 80,
        "lastUpdateTime": "2024-07-12T06:17:38Z",
        "rules": [
            {
                "description": "Rule for grade field",
                "ruleType": 1,
                "fieldName": "grade"
            }
        ]
    },
    ,
    {
        "id": "7a0c9f5b2d4a1e3c4a5a6d3e",
        "modelName": "teacher",
        "modal": 5,
        "type": 3,
        "tag": ["tag2", "tag3"],
        "domain": "education",
        "description": "teacher",
        "realtime": true,
        "fields": [
            {
                "name": "subject",
                "type": 1,
                "description": "Teacher's subject",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "d5a1c3e2b1b4b6d4",
                "type": 4,
                "url": "influxdb://user:password@host/database",
                "tag": "teacher",
                "description": "teacher",
                "tableName": "teacher"
            }
        ],
        "fieldMaps": [
            {
                "name": "subject",
                "_id": "__id__"
            }
        ],
        "qualityScore": 90,
        "lastUpdateTime": "2024-07-12T06:17:38Z",
        "rules": [
            {
                "description": "Rule for subject field",
                "ruleType": 2,
                "fieldName": "subject"
            }
        ]
    },
    {
        "id": "8d1e2b4a7a2e1c3a7b5a4d",
        "modelName": "course",
        "modal": 2,
        "type": 4,
        "tag": ["tag4"],
        "domain": "education",
        "description": "course",
        "realtime": false,
        "fields": [
            {
                "name": "credits",
                "type": 3,
                "description": "Course credits",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "2b5c1d8e3a5a4b9",
                "type": 3,
                "url": "directory://username:password@host:port/course_db",
                "tag": "course",
                "description": "course",
            }
        ],
        "fieldMaps": [
            {
                "name": "credits",
                "_id": "__id__"
            }
        ],
        "qualityScore": 75,
        "lastUpdateTime": "2024-07-12T06:17:38Z",
        "rules": [
            {
                "description": "Rule for credits field",
                "ruleType": 1,
                "fieldName": "credits"
            }
        ]
    },
    {
        "id": "3b6a4d5e2a1b3c1a6c4d",
        "modelName": "staff",
        "modal": 5,
        "type": 3,
        "tag": ["tag6", "tag7"],
        "domain": "administration",
        "description": "staff",
        "realtime": true,
        "fields": [
            {
                "name": "position",
                "type": 2,
                "description": "Staff's position",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "9d3a1b6a4e7c2d1",
                "type": 4,
                "url": "influxdb://user:password@host:port/admin_db",
                "tag": "staff",
                "description": "staff",
                "tableName": "staff"
            }
        ],
        "fieldMaps": [
            {
                "name": "position",
                "_id": "__id__"
            }
        ],
        "qualityScore": 95,
        "lastUpdateTime": "2024-07-12T06:17:38Z",
        "rules": [
            {
                "description": "Rule for position field",
                "ruleType": 2,
                "fieldName": "position"
            }
        ]
    }
]
*/
export const DataModels = [
    {
        "id": "668b552602e1715754550fb1",
        "modelName": "disease1",
        "modal": 3,
        "type": 3,
        "tag": [
            "disease"
        ],
        "domain": "disease",
        "description": "disease",
        "realtime": true,
        "fields": [
            {
                "name": "__id__",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "_source_id_",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "content",
                "type": 2,
                "description": "test",
                "sensitive": true,
                "encrypt": true,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668b521f02e1715754550faf",
                "type": 2,
                "url": "mongodb://root:123456@127.0.0.1:27017/datamanagement",
                "tag": "disease",
                "description": "disease",
                "collectionName": "disease"
            }
        ],
        "fieldMaps": [
            {
                "modelName": "content",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "ftpUtil": {},
        "rules": [],
        "fileUtil": {}
    },
    {
        "id": "668b552602e1715754550fb2",
        "modelName": "disease2",
        "modal": 2,
        "type": 1,
        "tag": [
            "disease"
        ],
        "domain": "disease",
        "description": "disease",
        "realtime": true,
        "fields": [
            {
                "name": "__id__",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "_source_id_",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "disease",
                "type": 2,
                "description": "disease",
                "sensitive": true,
                "encrypt": true,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668b521f02e1715754550fb0",
                "type": 1,
                "url": "postgresql://root:123456@127.0.0.1:27017/test1",
                "tag": "disease",
                "description": "disease",
                "schemaName": "disease",
                "tableName": "disease"
            }
        ],
        "fieldMaps": [
            {
                "modelName": "disease2",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "ftpUtil": {},
        "rules": [],
        "fileUtil": {}
    },
    {
        "id": "668cd1bed5323c451bedd575",
        "modelName": "disease3",
        "modal": 3,
        "type": 1,
        "tag": [
            "disease"
        ],
        "domain": "disease",
        "description": "disease",
        "realtime": true,
        "fields": [
            {
                "name": "__id__",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "_source_id_",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "name",
                "type": 2,
                "description": "disease",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "number",
                "type": 1,
                "description": "disease",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "_id",
                "type": 2,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668cd16ad5323c451bedd574",
                "type": 2,
                "url": "mongodb://fjt:123456@127.0.0.1:27017/bookStore",
                "tag": "disease",
                "description": "disease",
                "collectionName": "disease"
            }
        ],
        "fieldMaps": [
            {
                "number": "number",
                "name": "name",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "rules": [
            {
                "description": "",
                "ruleType": 2,
                "fieldName": "_id"
            }
        ]
    },
    {
        "id": "668cd900d5323c451bedd57d",
        "modelName": "study1",
        "modal": 3,
        "type": 1,
        "tag": [],
        "domain": "study",
        "description": "study",
        "realtime": true,
        "fields": [
            {
                "name": "__id__",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "_source_id_",
                "type": 2,
                "description": "",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            },
            {
                "name": "name",
                "type": 2,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668cd922d5323c451bedd57f",
                "type": 2,
                "url": "mongodb://fjt:123456@127.0.0.1:27017/person",
                "tag": "study",
                "description": "study",
                "collectionName": "study"
            }
        ],
        "fieldMaps": [
            {
                "name": "name",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "rules": [
            {
                "description": "",
                "ruleType": 2,
                "fieldName": "name"
            }
        ]
    },
    {
        "id": "668cd900d5323c451bedd57f",
        "modelName": "study2",
        "modal": 3,
        "type": 1,
        "tag": [],
        "domain": "study",
        "description": "study",
        "realtime": true,
        "fields": [
            {
                "name": "name",
                "type": 2,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668cd922d5323c451bedd581",
                "type": 4,
                "url": "influxdb://fjt:123456@127.0.0.1:27017/student",
                "tag": "study",
                "description": "study",
                "tableName": "study"
            }
        ],
        "fieldMaps": [
            {
                "name": "name",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "rules": [
            {
                "description": "",
                "ruleType": 2,
                "fieldName": "name"
            }
        ]
    },
    {
        "id": "668cd900d5323c451bedd580",
        "modelName": "study3",
        "modal": 3,
        "type": 1,
        "tag": [],
        "domain": "study",
        "description": "study",
        "realtime": true,
        "fields": [
            {
                "name": "name",
                "type": 2,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "668cd922d5323c451bedd582",
                "type": 3,
                "url": "directory://fjt:123456@127.0.0.1:27017/player",
                "tag": "study",
                "description": "study",
                "collectionName": "study"
            }
        ],
        "fieldMaps": [
            {
                "name": "name",
                "_id": "__id__"
            }
        ],
        "qualityScore": 100,
        "lastUpdateTime": null,
        "rules": [
            {
                "description": "",
                "ruleType": 2,
                "fieldName": "name"
            }
        ]
    },
    {
        "id": "8cdce8572c9905fcf8c432e2",
        "modelName": "diseasestudy1",
        "modal": 5,
        "type": 1,
        "tag": [
            "diseasestudy"
        ],
        "domain": "diseasestudy",
        "description": "diseasestudy",
        "realtime": false,
        "fields": [
            {
                "name": "_unique_id_",
                "type": 1,
                "description": "",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 1
            },
            {
                "name": "_data_id_",
                "type": 3,
                "description": "",
                "sensitive": false,
                "encrypt": true,
                "secretLevel": 0
            },
            {
                "name": "data",
                "type": 4,
                "description": "diseasestudy",
                "sensitive": false,
                "encrypt": true,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "c78ea0163dc44f61a70b5188",
                "type": 1,
                "url": "postgresql://user:password@host/database",
                "tag": "diseasestudy",
                "description": "diseasestudy",
                "schemaName": "diseasestudy",
                "tableName": "diseasestudy"
            }
        ],
        "fieldMaps": [
            {
                "modelName": "data",
                "_id": "_unique_id_"
            }
        ],
        "qualityScore": 85,
        "lastUpdateTime": "2024-07-12T06:12:07Z",
        "ftpUtil": {},
        "rules": [],
        "fileUtil": {}
    },
    {
        "id": "0d1b2e2a1e6b3c1a5b1b6d4e",
        "modelName": "diseasestudy2",
        "modal": 4,
        "type": 2,
        "tag": ["tag1"],
        "domain": "diseasestudy",
        "description": "diseasestudy",
        "realtime": false,
        "fields": [
            {
                "name": "grade",
                "type": 3,
                "description": "diseasestudy",
                "sensitive": false,
                "encrypt": true,
                "secretLevel": 2
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "36f98de2c4a1b8d5",
                "type": 2,
                "url": "mongodb://user:password@123.456.789.10:27017/classroom",
                "tag": "diseasestudy",
                "description": "diseasestudy",
                "collectionName": "diseasestudy"
            }
        ],
        "fieldMaps": [
            {
                "name": "grade",
                "_id": "__id__"
            }
        ],
        "qualityScore": 80,
        "lastUpdateTime": "2024-07-12T06:17:38Z",
        "rules": [
            {
                "description": "Rule for grade field",
                "ruleType": 1,
                "fieldName": "grade"
            }
        ]
    },
    {
        "id": "7a0c9f5b2d4a1e3c4a5a6d3e",
        "modelName": "diseasestudy3",
        "modal": 5,
        "type": 3,
        "tag": ["tag2", "tag3"],
        "domain": "diseasestudy",
        "description": "diseasestudy",
        "realtime": true,
        "fields": [
            {
                "name": "subject",
                "type": 1,
                "description": "diseasestudy",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "d5a1c3e2b1b4b6d4",
                "type": 4,
                "url": "influxdb://user:password@host/database",
                "tag": "diseasestudy",
                "description": "diseasestudy",
                "tableName": "diseasestudy"
            }
        ],
        "fieldMaps": [
            {
                "name": "subject",
                "_id": "__id__"
            }
        ],
        "qualityScore": 90,
        "lastUpdateTime": "2024-07-12T06:17:38Z",
        "rules": [
            {
                "description": "Rule for subject field",
                "ruleType": 2,
                "fieldName": "subject"
            }
        ]
    },
    {
        "id": "8d1e2b4a7a2e1c3a7b5a4d",
        "modelName": "disease4",
        "modal": 2,
        "type": 4,
        "tag": ["tag4"],
        "domain": "disease",
        "description": "disease",
        "realtime": false,
        "fields": [
            {
                "name": "credits",
                "type": 3,
                "description": "disease",
                "sensitive": false,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "2b5c1d8e3a5a4b9",
                "type": 3,
                "url": "directory://username:password@host:port/course_db",
                "tag": "disease",
                "description": "disease",
            }
        ],
        "fieldMaps": [
            {
                "name": "credits",
                "_id": "__id__"
            }
        ],
        "qualityScore": 75,
        "lastUpdateTime": "2024-07-12T06:17:38Z",
        "rules": [
            {
                "description": "disease",
                "ruleType": 1,
                "fieldName": "credits"
            }
        ]
    },
    {
        "id": "3b6a4d5e2a1b3c1a6c4d",
        "modelName": "diseasestudy4",
        "modal": 5,
        "type": 3,
        "tag": ["tag6", "tag7"],
        "domain": "diseasestudy",
        "description": "diseasestudy",
        "realtime": true,
        "fields": [
            {
                "name": "position",
                "type": 2,
                "description": "diseasestudy",
                "sensitive": true,
                "encrypt": false,
                "secretLevel": 0
            }
        ],
        "dataSources": [
            {
                "dataSourceId": "9d3a1b6a4e7c2d1",
                "type": 4,
                "url": "influxdb://user:password@host:port/admin_db",
                "tag": "diseasestudy",
                "description": "diseasestudy",
                "tableName": "diseasestudy"
            }
        ],
        "fieldMaps": [
            {
                "name": "position",
                "_id": "__id__"
            }
        ],
        "qualityScore": 95,
        "lastUpdateTime": "2024-07-12T06:17:38Z",
        "rules": [
            {
                "description": "Rule for position field",
                "ruleType": 2,
                "fieldName": "position"
            }
        ]
    }
]
