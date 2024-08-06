import React, { useState } from 'react';
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import RankingChart from "./components/RankingChart";
import { Select } from 'antd';
import {diseaseStudies} from "../../database/diseasestudy";
import {diseases} from "../../database/disease";

const { Option } = Select;

const MockDIYData1 = [
    { name: '疾病1', value: 10, count: 1 },
    { name: '疾病2', value: 20, count: 2 },
    { name: '疾病3', value: 30, count: 3 },
    { name: '疾病4', value: 40, count: 4 },
    { name: '疾病5', value: 50, count: 5 },
];

const MockDIYData2 = [
    { name: '疾病1', num: 10, key: 1 },
    { name: '疾病2', num: 20, key: 2 },
    { name: '疾病3', num: 30, key: 3 },
    { name: '疾病4', num: 40, key: 4 },
    { name: '疾病5', num: 50, key: 5 },
];

const MockDIYData = [{data: MockDIYData1, name: 'MockData1'}, {data: MockDIYData2, name: 'MockData2'}]

const DataStatisticsDiyPage = () => {
    const [selectedComponents, setSelectedComponents] = useState([]);
    const [selectedDataSources, setSelectedDataSources] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    // const [numericFields, setNumericFields] = useState([]);

    const handleComponentChange = value => {
        console.log(value);
        setSelectedComponents([value]);
    };

    const handleDataSourceChange = value => {
        setSelectedField(null);
        console.log('selected data source:', MockDIYData.find(dataSource => dataSource.name === value).data);
        setSelectedDataSources(MockDIYData.find(dataSource => dataSource.name === value).data);

        // const firstItem = selectedDataSources[0];
        // console.log('firstItem:', firstItem)
        // const fields = Object.keys(firstItem).filter(key => typeof firstItem[key] === 'number');
        // setNumericFields(fields);
    };

    const handleFieldChange = value => {
        setSelectedField(value);
    };

    const components = [
        { value: 'PieChart', component: PieChart },
        { value: 'BarChart', component: BarChart },
        { value: 'RankingChart', component: RankingChart },
    ];

    // const fields = Object.keys(MockDIYData[0].data[0]);

    const getPieChartSeriesDataV2 = (data) => {
        let series_data = diseases.map(item => ({ name: item.Name, value: 0, diseaseID:item.ID}));
        data.forEach(item => {
            let foundItem = series_data.find(seriesItem => seriesItem.diseaseID === item.DiseaseID);
            if (foundItem) {
                foundItem.value = foundItem.value + 1;
            }
        });
        return series_data
    }

    const dataSources = getPieChartSeriesDataV2(diseaseStudies)

    return (
        <div>
            <Select onChange={handleComponentChange} style={{width:'500px'}} placeholder={'请选择组件'}>
                {components.map((component, index) => (
                    <Option key={index} value={component.value}>{component.value}</Option>
                ))}
            </Select>

            <Select onChange={handleDataSourceChange} style={{width:'500px'}}>
                {MockDIYData.map((dataSource, index) => (
                    <Option key={index} value={dataSource.name}>{dataSource.name}</Option>
                ))}
            </Select>

            <Select onChange={handleFieldChange} style={{width:'500px'}}>
                {selectedDataSources.length &&
                    Object.keys(selectedDataSources[0]).filter(key => typeof selectedDataSources[0][key] === 'number').map((field, index) => (
                    <Option key={index} value={field}>{field}</Option>
                ))}
            </Select>

            {selectedDataSources.length > 0 && selectedField &&
                selectedComponents.map((selectedComponent, index) => {
                const Component = components.find(component => component.value === selectedComponent).component;

                const dataSource = selectedDataSources.map(item => ({
                    ...item,
                    value: item[selectedField],
                }));

                return <Component key={index} seriesData={dataSource} dataSource={dataSource}/>;
            })}
        </div>
    );
};

export default DataStatisticsDiyPage;
