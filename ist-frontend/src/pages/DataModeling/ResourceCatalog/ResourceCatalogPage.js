import {
    Button,
    Divider,
    Input,
    Typography,
    Tree,
    Flex,
    Select,
    Tag,
    Form,
    Table,
    Modal,
    DatePicker,
    Space,
    message
} from 'antd'
import {DeleteOutlined, ReloadOutlined, RollbackOutlined, SearchOutlined, UndoOutlined} from '@ant-design/icons'
import Description from '../../../components/DataManagement/Description'
import Panel from '../../../components/DataManagement/Panel'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {
    addMetadata, deleteMetadata,
    getAllMetadata,
    getMetadataById,
    getTableDataByName, getTableDataByName1, multiSearchMetadata,
    searchMetadataByName,
    searchMetadataByType,
    updateMetadata
} from "../../../apis/ResourceCatalogPageApi";
import {useNavigate} from "react-router-dom";
import {mockData} from "../../../apis/mockData";
//import Highlighter from "react-highlight-words";

const {Text, Title} = Typography
const {Option} = Select
const {RangePicker} = DatePicker

const ResourceCatalog = () => {
    /**
     * 资源目录板块
     */
    console.log("资源目录板块")

    //资源目录的数据
    const [treeData, setTreeData] = useState([])

    //三类树状资源
    const originalDataNode = {
        title: '原始数据资源',
        key: '0-0',
        disabled: true,
        children: [],
    }
    const standardDatabaseNode = {
        title: '标准数据资源',
        key: '0-1',
        disabled: true,
        children: [],
    }
    const themeDatabaseNode = {
        title: '主题数据资源',
        key: '0-2',
        disabled: true,
        children: [],
    }

    //确立树状图的数据
    const setTreeDataFromBackend = (data) => {
        const databaseMapping = {
            0: '原始数据资源',
            1: '基础类数据资源',
            2: '状态类数据资源',
            3: '事务类数据资源',
        }

        // Helper function to recursively traverse data and transform it
        function traverseAndTransform(node) {
            const transformedNode = {
                title: node.name,
                key: node.id,
            };

            if (node.children && node.children.length > 0) {
                transformedNode.children = node.children.map(child => traverseAndTransform(child));
            }

            return transformedNode;
        }

        //将同类数据库整合到一起
        const groupedData = data.reduce((acc, curr) => {
            const databaseName = databaseMapping[curr.database_belong];
            if (!acc[databaseName]) {
                acc[databaseName] = [];
            }
            acc[databaseName].push(curr);
            return acc;
        }, {})

        const transformedData = [];

        //展示数据表前，先将原有的展示内容清空
        originalDataNode.children = [];
        standardDatabaseNode.children = [];
        themeDatabaseNode.children = [];

        //整合数据表，展示为树状图
        //TODO:恢复注释
        for (const dbName in groupedData) {
            const dbData = groupedData[dbName];
            const transformedDbData = {
                title: dbName,
                key: Math.floor(Math.random() * 10000) + '-' + Math.floor(Math.random() * 10000), // Generating a random key for demonstration, you can use a more stable key generation method
                disabled: true,
                children: dbData.map(item => traverseAndTransform(item)),
            };
            if (dbName === '原始数据资源') {
                // originalDataNode.children.push(transformedDbData);
                transformedData.push(transformedDbData);
            } else if (dbName === '基础类数据资源' || dbName === '状态类数据资源' || dbName === '事务类数据资源') {
                standardDatabaseNode.children.push(transformedDbData);
            } else {
                themeDatabaseNode.children.push(transformedDbData);
            }
        }
        //transformedData.push(originalDataNode);
        transformedData.push(standardDatabaseNode);
        transformedData.push(themeDatabaseNode);
        return transformedData;
    }

    //搜索的字符串
    const [searchText, setSearchText] = useState()

    //根据表名搜索（无需完全相等，只需包含子串就行）
    //TODO:目前使用mock数据，待后续补充后端后再修改
    const searchMetaDataByName = (name) => {
        if (name === '' || name === undefined) {
            message.warning("请输入搜索内容").then();
        } else {
            const treeData = setTreeDataFromBackend(mockData.tree.filter((tree) => tree.name.includes(name)));
            setTreeData(treeData);
            // searchMetadataByName(name)
            //     .then(response => {
            //         // console.log("search by name and name is:", name);
            //         // console.log("get metadata by name, and the response is: ");
            //         // console.log(response);
            //         const treeData = setTreeDataFromBackend(response);
            //         setTreeData(treeData);
            //     })
            //     .catch(error => {
            //         console.log("get metadata by name failed, and the response is: ");
            //         console.log(error)
            //     })
        }
    }

    //重置搜索（恢复所有数据表）
    //TODO:目前使用mock数据，待后续补充后端后再修改
    const resetMetaData = () => {
        const treeData = setTreeDataFromBackend(mockData.tree);
        setTreeData(treeData);
        getMetaDataById(0);
        getTableData(tableName);
        // getAllMetadata()
        //     .then(response => {
        //         const treeData = setTreeDataFromBackend(response);
        //         setTreeData(treeData);
        //         getMetaDataById(3)
        //         console.log("get table data in 134")
        //         getTableData("drone_basic_info");
        //     })
        //     .catch(error => {
        //         console.log("get all metadata failed, and the response is: ");
        //         console.log(error)
        //     });
    };


    /**
     * 资源元数据板块
     */
    console.log("资源元数据板块");

    //资源元数据
    const [metadata, setMetadata] = useState([]);

    //当前展示的表名
    const [tableName, setTableName] = useState("");

    //针对某一数据表，展示资源元数据
    const setMetaDataFromBackend = (item) => {
        setMetadata([
            {
                title: '字段数',
                description: item.field_num.toString(),
            },
            {
                title: '名称',
                description: item.name,
            },
            {
                title: '创建者',
                description: item.creator,
            },
            {
                title: '数据源',
                description: item.data_source,
            },
            {
                title: '创建时间',
                description: new Date(item.create_time).toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }),
            },
            {
                title: '最近更新时间',
                description: new Date(item.last_update_time).toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }),
            },
            {
                title: '最近编辑时间',
                description: new Date(item.last_edit_time).toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }),
            },
            {
                title: '数据更新频率',
                description: item.data_update_frequency,
            },
            {
                title: '数据维护周期',
                description: item.data_maintenance_cycle,
            },
        ]);
        setTableName(item.table_name);
    }

    //根据id获取数据表的元数据
    //TODO:目前使用mock数据，待后续补充后端后再修改
    const getMetaDataById = (id) => {
        setMetaDataFromBackend(mockData.tree[id]);
        // getMetadataById(id)
        //     .then(response => {
        //         setMetaDataFromBackend(response.metadata);
        //     })
        //     .catch(error => {
        //         console.log("get metadata by id failed, and the response is: ");
        //         console.log(error)
        //     })
    }


    /**
     * 资源字段选择板块
     */
    console.log("资源字段选择板块");

    //选中的数据表字段
    const [selectedTags, setSelectedTags] = useState([]);

    //数据表的所有字段
    const [resourceColumns, setResourceColumns] = useState([]);
    const tags = resourceColumns.map(item => item.title);

    //选中/取消选中某一字段时，更新相应内容
    const handleTagClick = (tag, checked) => {
        const newSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((selectedTag) => selectedTag !== tag)
        setSelectedTags(newSelectedTags);
    }

    //根据得到的数据表字段，渲染前端
    const setFieldIndex = (cols) => {
        const columns = [];
        const selectedTags = [];

        //移除重复字段
        const keys = cols.reduce((acc, obj) => {
            Object.keys(obj).forEach(key => {
                if (!acc.includes(key)) {
                    acc.push(key);
                }
            })
            return acc;
        }, []);

        //存放处理后的字段
        keys.forEach((key, index) => {
            const column = {
                title: key,
                dataIndex: key,
                key: index,
                align: 'center'
            };
            columns.push(column);
            selectedTags.push(key);
        });

        setResourceColumns(columns);
        setResultColumns(columns);
        setSelectedTags(selectedTags);
    }

    //点击“资源跳转”时，跳转到对应表格内容
    //TODO:已注释，后续再考虑使不使用
    const navigateTo = useNavigate()
    const handleShowDetail = () => {
        console.log("ready to show table name is: ", tableName);
        var str = "/resourceManagement/dataManagement/databaseManagement/databaseDetail?tableName=" + tableName;
        navigateTo(str)
    }


    /**
     * 资源筛选板块
     */
    console.log("资源筛选板块");

    //数据表展示列
    const [resultColumns, setResultColumns] = useState([]);
    // const [resultColumns, setResultColumns] = useState([
    //     {title: '资源名称', dataIndex: 'name', key: 'id'},
    //     {title: '资源类别', dataIndex: 'type', key: 'model'},
    //     {title: '创建时间', dataIndex: 'ctime', key: 'type'},
    //     {title: '上次编辑时间', dataIndex: 'mtime', key: 'airport'},
    //     {
    //         key: 'action',
    //         title: '操作',
    //         render: (_, row) => (<Button type='link' onClick={() => handleShowMetadata(row.key)}>元数据</Button>)
    //     },
    // ]);

    //数据表展示的内容
    const [resultData, setResultData] = useState([]);

    //定义定制的组件
    const components = {
        header: {
            cell: props => (
                <th
                    {...props}
                    className="ant-table-cell"
                    style={{...props.style, minWidth: props.width}}
                >
                    <div {...props.onResize}>{props.children}</div>
                </th>
            ),
        },
    };

    //设置每一列的初始宽度为150
    const initialColumnWidth = 150;

    //初始化列宽度信息
    //TODO:根据不同字段设置宽度
    const initializeColumnWidths = () => {
        const widths = {};
        // widths[0] = 100;
        // widths[1] = 150;
        // widths[2] = 150;
        // widths[3] = 250;
        // widths[4] = 100;
        // widths[5] = 100;
        // widths[6] = 250;
        resultColumns.forEach((column, index) => {
            widths[index] = initialColumnWidth;
        });
        return widths;
    };

    //为每一列定义宽度
    const [columnsWidth, setColumnsWidth] = useState(initializeColumnWidths);

    //TODO:目前使用mock数据，待后续补充后端后再修改
    const getTableData = (name) => {
        switch (name) {
            case 'Disease':
                setResultData(mockData.diseaseTable);
                setFieldIndex(mockData.diseaseField);
                break;
            case 'Study':
                setResultData(mockData.studyTable);
                setFieldIndex(mockData.studyField);
                break;
            case 'DiseaseStudy':
                setResultData(mockData.diseaseStudyTable);
                setFieldIndex(mockData.diseaseStudyField);
                break;
            default:
                break;
        }
        // getTableDataByName(name)
        //     .then(response => {
        //         console.log("get table data by name, and the response is: ")
        //         console.log(response.data)
        //         console.log("===============================================")
        //         setResultData(response.data)
        //         setFieldIndex(response.data);
        //         console.log("result data:", resultData)
        //     })
        //     .catch(error => {
        //         console.log("get table data by name failed, and the response is: ");
        //         console.log(error)
        //     })
    }


    /**
     * useEffect
     */
    console.log("useEffect");

    //进入页面时触发
    //获取数据库资源，更新树状图；获取id为0的数据表进行默认展示
    //TODO:目前使用mock数据，待后续补充后端后再修改
    useEffect(() => {
        const treeData = setTreeDataFromBackend(mockData.tree);
        setTreeData(treeData);
        getMetaDataById(0);
        getTableData(tableName);
        // getAllMetadata()
        //     .then(response => {
        //         const treeData = setTreeDataFromBackend(response);
        //         setTreeData(treeData);
        //         console.log("get metadata by id 1 in 132")
        //         getMetaDataById(3)
        //         console.log("get table data in 134")
        //         getTableData("drone_basic_info");
        //     })
        //     .catch(error => {
        //         console.log("get all metadata failed, and the response is: ");
        //         console.log(error)
        //     });
    }, []);

    //修改selectedTags或resultColumns时触发
    //无效果
    useEffect(() => {
        console.log("now new setSelectedTags:");
        console.log(selectedTags);
        console.log("now new resultColumns:");
        console.log(resultColumns);
    }, [selectedTags, resultColumns]);

    //修改tableName时触发
    //根据表名获取表格数据
    useEffect(() => {
        console.log("now new tableName: ", tableName)
        getTableData(tableName)
    }, [tableName])

    //修改selectedTags时触发
    //根据选中字段修改数据表展示内容
    useEffect(() => {
        setResultColumns(resourceColumns.filter(column => selectedTags.includes(column.dataIndex)));
    }, [selectedTags]);


    /**
     * unused
     * @type {NavigateFunction}
     */


    const [filterForm] = Form.useForm()
    const [searchForm] = Form.useForm()
    const [isSearchModalVisible, setIsSearchModalVisible] = useState(false)
    const [isResultModalVisible, setIsResultModalVisible] = useState(false)
    const resource = [
        {
            label: '原始数据资源',
            value: '0',
        },
        {
            label: '基础类数据资源',
            value: '1',
        },
        {
            label: '状态类数据资源',
            value: '2',
        },
        {
            label: '事务类数据资源',
            value: '3',
        }
    ]

    // 定义拖拽调整列宽度的回调函数
    const handleResize = useCallback(index => (e, {size}) => {
        setColumnsWidth(prevWidths => ({
            ...prevWidths,
            [index]: size.width
        }));
    }, []);

    const searchMetaDataByType = (type) => {
        searchMetadataByType(type)
            .then(response => {
                console.log("search metadata by type, and the response is: ")
                console.log(response)
            })
            .catch(error => {
                console.log("search metadata by type failed, and the response is: ");
                console.log(error)
            })
    }

    const addMetaData = (rmMetadataEntity) => {
        addMetadata(rmMetadataEntity)
            .then(response => {
                console.log("add metadata, and the response is: ")
                console.log(response)
            })
            .catch(error => {
                console.log("add metadata failed, and the response is: ");
                console.log(error)
            })
    }

    const updateMetaData = (rmMetadataEntity) => {
        updateMetadata(rmMetadataEntity)
            .then(response => {
                console.log("update metadata, and the response is: ")
                console.log(response)
            })
            .catch(error => {
                console.log("update metadata failed, and the response is: ");
                console.log(error)
            })
    }

    const deleteMetaDataById = (id) => {
        deleteMetadata(id)
            .then(response => {
                console.log("delete metadata, and the response is: ")
                console.log(response)
            })
            .catch(error => {
                console.log("delete metadata failed, and the response is: ");
                console.log(error)
            })
    }


    // onsearch
    const onSearch = () => {
        // setIsResultModalVisible(true)
        setIsSearchModalVisible(false)
        const MultiSearchItems = {};
        // 获取表单数据
        searchForm.validateFields().then(values => {
            // 添加名称字段（如果有输入）
            if (values.name) {
                MultiSearchItems.key1 = values.name;
            }

            // 添加简介字段（如果有输入）
            if (values.description) {
                MultiSearchItems.key2 = values.description;
            }

            // 添加所属资源字段（如果有输入）
            if (values.resource) {
                MultiSearchItems.key3 = values.resource;
            }

            // 添加更新频率字段（如果有输入）
            if (values.task) {
                MultiSearchItems.key4 = values.task;
            }

            // 添加数据来源字段（如果有输入）
            if (values.dataSource) {
                MultiSearchItems.key5 = values.dataSource;
            }

            // 添加上次更新时间字段（如果有输入）
            if (values.time && values.time.length === 2) {
                MultiSearchItems.key6 = values.time[0].toISOString(); // 开始时间
                MultiSearchItems.key7 = values.time[1].toISOString(); // 结束时间
            }
            console.log("now show the multiSearchMetadata")
            console.log(MultiSearchItems)
            // 调用 multiSearchMetadata 函数并传递 MultiSearchItems 对象
            multiSearchMetadata(MultiSearchItems)
                .then(response => {
                    console.log("multiSearchMetadata success, and the response is: ");
                    console.log(response);
                    const treeData = setTreeDataFromBackend(response);
                    setTreeData(treeData);
                })
                .catch(error => {
                    console.log("multiSearchMetadata success, and the response is: ");
                    console.log(error);
                });
        }).catch(error => {
            console.error('Error:', error);
        });

    };


    const onFilter = () => {

    }

    const handleShowMetadata = () => {
        setIsResultModalVisible(false)
    }


    const [searchTextInner, setSearchTextInner] = useState('');
    const [searchedColumnInner, setSearchedColumnInner] = useState('');
    const searchInputInner = useRef(null);
    const handleSearchInner = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchTextInner(selectedKeys[0]);
        setSearchedColumnInner(dataIndex);
    };
    const handleResetInner = (clearFilters) => {
        clearFilters();
        setSearchTextInner('');
    };
    const getColumnSearchPropsInner = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                    borderRadius: 15,
                    borderStyle: "solid",
                    borderColor: "black",
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInputInner}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearchInner(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearchInner(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleResetInner(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchTextInner(selectedKeys[0]);
                            setSearchedColumnInner(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInputInner.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumnInner === dataIndex ? (
                // <Highlighter
                //     highlightStyle={{
                //         backgroundColor: '#ffc069',
                //         padding: 0,
                //     }}
                //     searchWords={[searchTextInner]}
                //     autoEscape
                //     textToHighlight={text ? text.toString() : ''}
                // />
                text
            ) : (
                text
            ),
    });

    return (
        <>
            <Panel title='资源概览'>
                <div className='resource-catelog-panel-container' style={{
                    display: 'flex',
                    justifyContent: 'space-evenly'
                }}>
                    <div className='resource-catalog-panel' style={{
                        minHeight: 300,
                        padding: '15px 15px',
                        margin: 7,
                        width: '50%',
                        borderRadius: 15,
                        borderStyle: "solid",
                        borderColor: "dimgrey"
                    }}>
                        <Title level={5} style={{marginTop: 5}}>资源列表</Title>
                        <Flex vertical={true} gap='small' style={{marginTop: 10}}>
                            <Input
                                allowClear
                                placeholder='输入关键字以搜索'
                                suffix={
                                    <>
                                        <Button type='primary' icon={<SearchOutlined/>} style={{margin: '7px 5px'}}
                                                onClick={() => searchMetaDataByName(searchText)}>
                                            搜索
                                        </Button>
                                        {/*<Button style={{margin: '7px 5px'}} onClick={() => {*/}
                                        {/*    setIsSearchModalVisible(true)*/}
                                        {/*}}>*/}
                                        {/*    高级搜索*/}
                                        {/*</Button>*/}
                                        <Button icon={<ReloadOutlined/>} style={{margin: '7px 5px'}}
                                                onClick={() => resetMetaData()}>
                                            重置
                                        </Button>
                                    </>
                                }
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                }}
                            />
                            <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                                <Tree
                                    checkable
                                    style={{padding: 12, minHeight: '300px'}}
                                    showLine={true}
                                    showIcon={true}
                                    defaultExpandedKeys={['0-1']}
                                    onSelect={(key, e) => {
                                        //TODO:目前0-0之类的会被排除，原写法待恢复
                                        console.log(e.node.key)
                                        if (!e.node.key.toString().includes("-")) {
                                            getMetaDataById(e.node.key);
                                            getTableData(tableName);
                                        }
                                    }}
                                    treeData={treeData}
                                />
                            </div>
                        </Flex>
                    </div>
                    <div className='resource-catalog-panel' style={{
                        minHeight: 300,
                        padding: '15px 15px',
                        margin: 7,
                        width: '50%',
                        borderRadius: 15,
                        borderStyle: "solid",
                        borderColor: "dimgrey"
                    }}>
                        <Title level={5} style={{marginTop: 5}}>元数据</Title>
                        <Flex wrap='wrap' gap='middle' style={{
                            marginTop: 10,
                            borderRadius: 5,
                            borderStyle: "solid",
                            borderColor: "lightgrey",
                            padding: '10px 20px',
                        }}>
                            {
                                metadata?.map(item => (
                                    <Description title={item.title}>{item.description}</Description>
                                ))
                            }
                        </Flex>

                        <Flex vertical={true} gap='small' style={{
                            borderRadius: 5,
                            borderStyle: "solid",
                            borderColor: "lightgrey",
                            marginTop: 20,
                            padding: '10px, 20px',
                        }}>
                            <Text strong={true} style={{marginLeft: 10, marginTop: 10}}>资源字段选择:</Text>

                            <Flex wrap='wrap' gap='small' style={{
                                padding: '10px, 20px',
                                borderRadius: 7,
                                width: '100%',
                                overflowY: 'auto',
                                maxHeight: '70px',
                            }}>
                                {tags.map((tag) => (
                                    <Tag.CheckableTag
                                        key={tag}
                                        checked={selectedTags.includes(tag)}
                                        onChange={(checked) => handleTagClick(tag, checked)}
                                    >
                                        {tag}
                                    </Tag.CheckableTag>
                                ))}
                            </Flex>
                        </Flex>
                        {/*<Flex>*/}
                        {/*    <Button type='primary' style={{*/}
                        {/*        margin: '0 auto',*/}
                        {/*        width: 100,*/}
                        {/*        height: 40,*/}
                        {/*        fontSize: 15,*/}
                        {/*    }} onClick={() => handleShowDetail()}>资源跳转</Button>*/}
                        {/*</Flex>*/}
                    </div>
                </div>
            </Panel>

            <Panel title='资源详情'>
                <Table
                    style={{
                        overflowX: 'auto',
                    }}
                    components={components}
                    //TODO:优化列宽（需要自适应才美观）
                    columns={resultColumns.map((column, index) => ({
                        ...column,
                        resizable: true, // 设置列可调整宽度
                        // width: columnsWidth[index] || initialColumnWidth, // 设置列的宽度为保存的宽度或初始宽度
                        onHeaderCell: column => ({
                            width: column.width,
                            onResize: handleResize(index),
                        }),

                        // ellipsis: true,
                        ...getColumnSearchPropsInner(column.dataIndex)
                    }))}
                    dataSource={resultData}
                />
            </Panel>

            <Modal title='资源目录高级搜索' open={isSearchModalVisible}
                   onOk={() => {
                       setIsSearchModalVisible(false)
                   }}
                   onCancel={() => {
                       setIsSearchModalVisible(false)
                   }}
                   okButtonProps={{style: {display: 'none'}}}
                   cancelButtonProps={{style: {display: 'none'}}}
                   width={500}>
                <Divider style={{
                    margin: '15px 0 20px 0'
                }}/>
                <Form form={searchForm}
                      onFinish={onSearch}
                      labelCol={{span: 5}}
                      wrapperCol={{span: 19}}
                      labelAlign='left'>
                    <Form.Item label='名称' name='name'>
                        <Input placeholder='请输入名称'/>
                    </Form.Item>
                    <Form.Item label='简介' name='description'>
                        <Input placeholder='请输入简介'/>
                    </Form.Item>
                    <Form.Item label='所属资源' name='resource'>
                        <Select placeholder='请选择所属资源'>
                            {
                                resource?.map((item) => (
                                    <Option value={item.value} key={item.value}>{item.label}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label='更新频率' name='task'>
                        <Input placeholder='请输入更新频率'/>
                    </Form.Item>
                    <Form.Item label='数据来源' name='dataSource'>
                        <Input placeholder='请输入数据来源'/>
                    </Form.Item>
                    <Form.Item label='上次更新时间' name='time'>
                        <RangePicker showTime/>
                    </Form.Item>
                    <Flex gap='middle' justify='flex-end'>
                        <Button type='primary' htmlType='submit'>查询</Button>
                        <Button htmlType='reset'>重置</Button>
                    </Flex>
                </Form>
            </Modal>
        </>
    )
}

export default ResourceCatalog