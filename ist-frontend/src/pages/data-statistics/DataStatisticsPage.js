import React from "react";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import {getDataAssets} from "../../apis/data-asset";
import {Divider, message, Table} from "antd";
import config from "../data-source/config";
import RankingChart from "./components/RankingChart";
const columns = [
    {
        title: '资产id',
        dataIndex: 'id',
        align: 'center',
    },
    {
        title: '模型名称',
        dataIndex: 'modelName',
        align: 'center',
    },
    {
        title: '描述',
        dataIndex: 'description',
        align: 'center',
    },
    {
        title: '业务域',
        dataIndex: 'domain',
        align: "center"
    }
];
class DataStatisticsPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataAssets:[],
            expandRowKeys: [],
            PieChart_Series:[
                {
                    name: '数据源',
                    type: 'pie',
                    radius: '50%',
                    data:[]
                }
            ]
        }
    }
    onExpand = (expanded, record) => {
        const { expandRowKeys } = this.state;
        console.log(expandRowKeys)
        if (expanded) {
            expandRowKeys.push(record.id);
        } else {
            const index = expandRowKeys.indexOf(record.id);
            if (index !== -1) {
                expandRowKeys.splice(index, 1);
            }
        }
        this.setState({ expandRowKeys });
    }

    getPieChartSeriesData = (data) => {
        let series_data =  config.dataSourceType.map(item => ({ name: item.label, value: 0 , label_value: item.value}));
        data.forEach(item => {
            item.dataSources.forEach(source => {
                let foundItem = series_data.find(seriesItem => seriesItem.label_value === source.type);
                if (foundItem) {
                    foundItem.value = foundItem.value + 1;
                }
            });
        });
        return series_data
    }
    fetchAsset = () => {
        const params = {
            modelName: '',
            modal: '',
            type: '',
            domain: '',
            description: '',
            tag: ''
        }

        getDataAssets(params).then(data => {
            const series_data = this.getPieChartSeriesData(data)
            this.setState({
                dataAssets:data,
                PieChart_Series:[
                    {
                        name: '数据源',
                        type: 'pie',
                        radius: '50%',
                        data: series_data
                    }
                ]
            })
        }).catch(error => {
            message.error(`加载数据资产失败：${error.message}`).then(r =>{} )
        })
        return () => {

        }
    }
    componentDidMount() {
        this.state = {
            dataAssets:[],
            PieChart_Series:[
                {
                    name: '数据源',
                    type: 'pie',
                    radius: '50%',
                    data:[]
                }
            ]
        }
        this.fetchAsset()
    }
    render() {
        if (this.state.PieChart_Series[0].data.length === 0 || this.state.dataAssets.length === 0) {
            return <></>;
        }
        return(
            <>
                <div className="Main_Container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <div className="Top_Container" style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                        <div style={{ flex: 1, margin: '0 10px'  }}>
                            <PieChart seriesData={this.state.PieChart_Series[0].data}/>
                        </div>
                        <div style={{ flex: 1, margin: '0 10px' }}>
                            <BarChart dataSource={this.state.PieChart_Series[0].data} text="条形图"/>
                        </div>
                        <div style={{ flex: 1, margin: '0 20px'  }}>
                            <RankingChart dataSource={this.state.PieChart_Series[0].data}/>
                        </div>
                    </div>
                    <Divider/>
                    <div className="Bottom_Container" style={{ flex: 1 }}>
                        <h3>仅展示前100条数据资产</h3>
                       <Table columns={columns}
                              dataSource={this.state.dataAssets.slice(0,100)}
                              rowKey="id"
                              expandable={{
                                  expandedRowRender: record => (
                                      this.state.expandRowKeys.includes(record.id) ?
                                          <Table
                                              columns={[
                                                  {title: '数据源id', dataIndex: 'dataSourceId'},
                                                  {title: '类型', dataIndex: 'type'},
                                                  {title: 'url', dataIndex: 'url'}
                                              ]}
                                              dataSource={record.dataSources}
                                              pagination={false}
                                          /> : null
                                  ),
                                  onExpand: this.onExpand
                              }}
                              pagination={{
                                  pageSize:10,
                                  showSizeChanger: true,
                                  showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
                                  showQuickJumper: true}}>
                       </Table>
                    </div>
                </div>
            </>
        );
    }
}
export default DataStatisticsPage;
