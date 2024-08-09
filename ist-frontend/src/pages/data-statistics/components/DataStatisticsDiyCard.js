import React, {useEffect, useState} from 'react';
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import RankingChart from "./RankingChart";
import {Button, Card, Divider, Select} from 'antd';
import { v4 as uuidv4 } from 'uuid';

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

const DataStatisticsDiyCard = ({onDelete, id}) => {
    const initialCardData = JSON.parse(localStorage.getItem(`card-${id}`)) || {};

    const [selectedComponents, setSelectedComponents] = useState(initialCardData.selectedComponents || []);
    const [selectedDataSources, setSelectedDataSources] = useState(initialCardData.selectedDataSources || []);
    const [selectedField, setSelectedField] = useState(initialCardData.selectedField || null);
    const [selectedModelName, setSelectedModelName] = useState(initialCardData.selectedModelName || null);
    // const [numericFields, setNumericFields] = useState([]);

    useEffect(() => {
        const cardData = {
            selectedComponents,
            selectedDataSources,
            selectedField,
            selectedModelName,
        };

        localStorage.setItem(`card-${id}`, JSON.stringify(cardData));
    }, [selectedComponents, selectedDataSources, selectedField]);

    const handleComponentChange = value => {
        console.log(value);
        setSelectedComponents([value]);
    };

    const handleDataSourceChange = value => {
        setSelectedField(null);
        console.log('selected data source:', MockDIYData.find(dataSource => dataSource.name === value).data);
        setSelectedDataSources(MockDIYData.find(dataSource => dataSource.name === value).data);
        setSelectedModelName(value);
    };

    const handleFieldChange = value => {
        setSelectedField(value);
    };

    const getComponentTitleText = () => {
        if (selectedComponents.length === 0 || selectedDataSources.length === 0 || !selectedField) {
            return "";
        }

        const component = (
            ("PieChart" === selectedComponents[0]) ? "饼状图"
            : ("BarChart" === selectedComponents[0]) ? "柱状图"
            : "排行榜"
        );

        return `${selectedField}${component} - ${selectedModelName}`;
    }

    const components = [
        { value: 'PieChart', component: PieChart },
        { value: 'BarChart', component: BarChart },
        { value: 'RankingChart', component: RankingChart },
    ];

    // const fields = Object.keys(MockDIYData[0].data[0]);

    // const getPieChartSeriesDataV2 = (data) => {
    //     let series_data = diseases.map(item => ({ name: item.Name, value: 0, diseaseID:item.ID}));
    //     data.forEach(item => {
    //         let foundItem = series_data.find(seriesItem => seriesItem.diseaseID === item.DiseaseID);
    //         if (foundItem) {
    //             foundItem.value = foundItem.value + 1;
    //         }
    //     });
    //     return series_data
    // }
    //
    // const dataSources = getPieChartSeriesDataV2(diseaseStudies)

    return (
        {/*<Card style={{width: '100%', height: '98%'}}>
            <div>
                <Select onChange={handleComponentChange} style={{width: '50%'}} placeholder={'请选择组件'}>
                    {components.map((component, index) => (
                        <Option key={index} value={component.value}>{component.value}</Option>
                    ))}
                </Select>

                <Select onChange={handleDataSourceChange} style={{width:'50%'}}>
                    {MockDIYData.map((dataSource, index) => (
                        <Option key={index} value={dataSource.name}>{dataSource.name}</Option>
                    ))}
                </Select>

                <Select onChange={handleFieldChange} style={{width:'500px'}} value={selectedField}>
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
        </Card>*/},
    <Card style={{
        minHeight: 500,
        padding: '15px 15px',
        margin: '12px 100px 12px 0',
        width: '40%',
        borderRadius: 15,
        borderStyle: "solid",
        borderColor: "light"
        }}
    >
        <div>
            <Select onChange={handleComponentChange} style={{width: '32%'}} value={selectedComponents[0]} placeholder={'请选择组件'}>
                {components.map((component, index) => (
                    <Option key={index} value={component.value}>{component.value}</Option>
                ))}
            </Select>

            <Select onChange={handleDataSourceChange} style={{width: '32%', marginLeft: 5}} value={selectedModelName} placeholder={'请选择数据模型'}>
                {MockDIYData.map((dataSource, index) => (
                    <Option key={index} value={dataSource.name}>{dataSource.name}</Option>
                ))}
            </Select>

            <Select onChange={handleFieldChange} style={{width: '32%', marginLeft: 5}} value={selectedField} placeholder={'请选择字段'}>
                {selectedDataSources.length &&
                    Object.keys(selectedDataSources[0]).filter(key => typeof selectedDataSources[0][key] === 'number').map((field, index) => (
                        <Option key={index} value={field}>{field}</Option>
                    ))}
            </Select>

            <Divider/>

            {selectedDataSources.length > 0 && selectedField &&
                selectedComponents.map((selectedComponent, index) => {
                    const Component = components.find(component => component.value === selectedComponent).component;

                    const dataSource = selectedDataSources.map(item => ({
                        ...item,
                        value: item[selectedField],
                    }));

                    return (
                        <div>
                            <Component
                                key={index}
                                seriesData={dataSource}
                                dataSource={dataSource}
                                text={getComponentTitleText()}
                            />
                            <Divider/>
                        </div>
                    )
                })
            }


            <Button danger onClick={() => onDelete(id)} style={{position: 'absolute', right: '7%', bottom: '3%'}}>删除卡片</Button>

        </div>
    </Card>
    );
};

export default DataStatisticsDiyCard;
