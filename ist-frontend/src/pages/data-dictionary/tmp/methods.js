import { initialDictionaries, lineageData, dataSources } from './data.js';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export function exportToExcel(filtered, data, fileType) {

    const wb = XLSX.utils.book_new();

    for (let i = 0; i < data.length; i++) {
        let dictionaryData = filtered? data[i].fields : data[i].content;
        dictionaryData = dictionaryData.map(field => {
            return {
                '表名': field.table,
                '字段名': field.name,
                '类型': field.type,
                '描述': field.description,
            }
        });
        const dictionaryName = data[i].name;

        const ws = XLSX.utils.json_to_sheet(dictionaryData);

        XLSX.utils.book_append_sheet(wb, ws, dictionaryName);
    }

    const wbout = XLSX.write(wb, { bookType: fileType, type: 'binary' });

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const fileName = 'export' + '.' + fileType;
    saveAs(blob, fileName);
}

// 将一个字符串转换为一个ArrayBuffer
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

export const searchDictionaries = (dictionaryName, tableName, fieldName, description, type) => {
    return initialDictionaries.map(dictionary => {
        const filteredFields = dictionary.content.filter(field =>
            (dictionaryName === '' || dictionary.name.includes(dictionaryName)) &&
            (tableName === '' || field.table.includes(tableName)) &&
            (fieldName === '' || field.name.includes(fieldName)) &&
            (description === '' || field.description.includes(description)) &&
            (type === '' || field.type.includes(type))
        );

        for (let i = 0; i < filteredFields.length; i++) {
            filteredFields[i].dictionaryKey = dictionary.key;
        }

        return { ...dictionary, fields: filteredFields };
    }).filter(dictionary => dictionary.fields.length > 0);
};

const getNodeName = (field) => field.name + ' (' + field.table + ')';

export const getDataLineage = (dictionaryKey, key) => {
    const dictionary = initialDictionaries.find(dict => dict.key === dictionaryKey);
    const field = dictionary.content.find(field => field.key === key);

    const nodeName = getNodeName(field);
    const nodes = [{ id: nodeName, name: nodeName, category: 'field', draggable: true}];
    const links = [];

    let currentField = field;
    let tmpParent = lineageData.find(data => (data.key === key && data.dictionaryKey === dictionaryKey));
    let parentKey = tmpParent ? tmpParent.parentKey : undefined;
    console.log('parentKey:', parentKey);

    while (parentKey !== undefined) {
        const parentField = dictionary.content.find(parent => parent.key === parentKey);
        console.log('parentField:', parentField);
        if (!parentField) {
            break;
        }

        const parentName = getNodeName(parentField);

        nodes.push({ id: parentName, name: parentName, category: 'field', draggable: true });
        links.push({ source: parentName, target: getNodeName(currentField) });

        currentField = parentField;

        tmpParent = lineageData.find(data => data.key === parentKey && data.dictionaryKey === dictionaryKey);
        parentKey = tmpParent ? tmpParent.parentKey : undefined;
    }

    const dataSource = dataSources.find(dataSource => dataSource.id === dictionary.dataSourceId);

    nodes.push({ id: dataSource.name, name: dataSource.name, category: 'dataSource', draggable: true });
    links.push({ source: dataSource.name, target: getNodeName(currentField) });

    console.log({ nodes, links })

    return { nodes, links };
};
