import React, {useState} from 'react';
import { Tabs } from 'antd';
import DataDictionaryTreeGraph from "./components/DataDictionaryTreeGraph";
import DataDictionaryStarGraph from "./components/DataDictionaryStarGraph";
import DataDictionarySearchBar from "./components/DataDictionarySearchBar";
import {initialDictionaries} from "./tmp/data";

const DataDictionaryVisualizePage = () => {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (results) => {
        setSearchResults(results);
    }

    const items = [
        {
            key: '1',
            label: '星形图',
            children: <div style={{ height: '80vh' }}><DataDictionaryStarGraph dictionaries={searchResults}/></div>
        },
        {
            key: '2',
            label: '树形图',
            children: <div style={{ height: '80vh' }}><DataDictionaryTreeGraph dictionaries={searchResults}/></div>
        }
    ];

    return (
        <>
            <DataDictionarySearchBar onSearch={handleSearch}/>
            <Tabs defaultActiveKey="1" items={items}/>
        </>
    );
};

export default DataDictionaryVisualizePage;
