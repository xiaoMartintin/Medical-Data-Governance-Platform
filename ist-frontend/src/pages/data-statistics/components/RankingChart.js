import { Table } from 'antd';
import "../../../style/ranking_chart.css"

const columns = [
    {
        title: '#',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => index + 1
    },
    {
        title: '病种',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '病例数量',
        dataIndex: 'value',
        key: 'value'
    }
];

const RankingChart = ({dataSource, text}) => (
    <div className="ranking-container" style={{ width: '100%', height: '400px'}}>
        <text>{text}</text>
        <div style={{overflow:'auto', height:'350px'}}>
        <Table columns={columns}  dataSource={dataSource.sort((a, b) => b.value - a.value)} pagination={false}/>
        </div>
    </div>
);

export default RankingChart;
