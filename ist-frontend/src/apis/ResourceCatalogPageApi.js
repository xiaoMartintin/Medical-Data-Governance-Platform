import {get, post} from './fetch.js'

export const login = (params) => post('/user/login', params);

export const downloadTemplate = (tableName) => get(`/databaseManagement/csvTemplate?tableName=${tableName}`);

export const uploadCsv = (data) => post(`/databaseManagement/uploadCsv`, data, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const getDroneOverview = async () => await get('/overview/drone');
export const getAirportOverview = () => get('/overview/airport');
export const getDispatchCenterOverview = () => get('/overview/dispatchCenter');

export const getDronePortraitList = async () => await get('/portrait/drone/all');
export const getAirportPortraitList = () => get('/portrait/airport/all');
export const getDispatchCenterPortraitList = () => get('/portrait/dispatchCenter/all');

export const getDronePortrait = async (id) => await get(`/portrait/drone/${id}`);
export const getAirportPortrait = (id) => get(`/portrait/airport/${id}`);
export const getDispatchCenterPortrait = (id) => get(`/portrait/dispatchCenter/${id}`);

export const getDronesInfo = () => get('/droneBasicInfo/getAll');

export const getAirportInfo = () => get('/airportStandardInfo/getAll');

export const getGroundStation = () => get('/droneStationStatusInfo/getAll');

export const getDispatchCenter = () => get('/dispatchCenterInfo/getAll');

export const getAllRegisterMessage = () => get('/registerMessage/getAll');

export const getAllMetadata = () => post('/api/database/metadata/findAll');

// Integer id
export const getMetadataById = (id) => post(`/api/database/metadata/findById?id=${id}`);

export const getAllTableInfo = () => get(`/databaseManagement/metadata/all`);
export const getMetadataByName = (name) => get(`/databaseManagement/metadata?tableName=${name}`);
export const getTableDataByName = (name) => get(`/databaseManagement/tableData?tableName=${name}`);
export const getTableDataByName1 = (name) => get(`/databaseManagement/tableData1?tableName=${name}`);

// string name
export const searchMetadataByName = (name) => post(`/api/database/metadata/name?name=${name}`);

// Integer type
export const searchMetadataByType = (type) => post(`/api/database/metadata/type?type=${type}`);

export const addMetadata = (rmMetadataEntity) => post(`/api/database/metadata/add`, rmMetadataEntity);

export const updateMetadata = (rmMetadataEntity) => post(`/api/database/metadata/update`, rmMetadataEntity);

export const deleteMetadata = (id) => post(`/api/database/metadata/delete?id=${id}`);

export const getIp = () => get('/registerMessage/getIp');

export const multiSearchMetadata = (MultiSearchItems) => post('/api/database/metadata/multisearch', MultiSearchItems);

export const tableUpsertOne = (data) => post('/databaseManagement/upsertOne', data);

export const tableDeleteOne = (data) => post('/databaseManagement/deleteOne', data);

export const toPause = () => get('/databaseManagement/toPause');

export const getCatalogTree = () => get('/catalog/tree');

export const getDatabaseManagementTree = () => get('/databaseManagement/tree');

export const getCatalogRightPartData = (standardTableName, standardStatusTableName, idFieldName, id) => get(`/catalog/metaAndRow/${standardTableName}/${standardStatusTableName}/${idFieldName}/${id}`);

