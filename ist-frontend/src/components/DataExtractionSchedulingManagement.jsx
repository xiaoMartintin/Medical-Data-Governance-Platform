import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, DatePicker, Table, Switch, Select, Modal, message } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined, CopyOutlined, PauseOutlined, StopOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Pie, Column } from '@ant-design/plots';
import '../style/DataExtractionSchedulingManagement.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const DataExtractionSchedulingManagement = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([
        {
            key: '1',
            jobName: 'JS脚本模版2_copy_1_cp',
            jobDescription: 'JS脚本测试2',
            runStatus: '未运行',
            schedule: '关闭',
            actions: [{ action: '创建', time: new Date('2023-07-01T10:00:00Z') }],
            createdAt: new Date('2023-07-01T10:00:00Z'),
        },
        {
            key: '2',
            jobName: 'SQL模版测试_copy_1_cp',
            jobDescription: 'SQL模版测试',
            runStatus: '运行中',
            schedule: '开启',
            actions: [
                { action: '创建', time: new Date('2023-07-02T10:00:00Z') },
                { action: '启动/继续', time: new Date('2023-07-02T11:00:00Z') },
            ],
            createdAt: new Date('2023-07-02T10:00:00Z'),
        },
        {
            key: '3',
            jobName: 'Python脚本模版_copy_1_cp',
            jobDescription: 'Python脚本测试',
            runStatus: '暂停',
            schedule: '关闭',
            actions: [
                { action: '创建', time: new Date('2023-07-03T10:00:00Z') },
                { action: '启动/继续', time: new Date('2023-07-03T11:00:00Z') },
                { action: '暂停', time: new Date('2023-07-03T12:00:00Z') },
            ],
            createdAt: new Date('2023-07-03T10:00:00Z'),
        },
        {
            key: '4',
            jobName: 'Ruby脚本模版_copy_1_cp',
            jobDescription: 'Ruby脚本测试',
            runStatus: '未运行',
            schedule: '开启',
            actions: [
                { action: '创建', time: new Date('2023-07-04T10:00:00Z') },
                { action: '停止', time: new Date('2023-07-04T11:00:00Z') },
            ],
            createdAt: new Date('2023-07-04T10:00:00Z'),
        },
        {
            key: '5',
            jobName: 'Node脚本模版_copy_1_cp',
            jobDescription: 'Node脚本测试',
            runStatus: '运行中',
            schedule: '关闭',
            actions: [
                { action: '创建', time: new Date('2023-07-05T10:00:00Z') },
                { action: '启动/继续', time: new Date('2023-07-05T11:00:00Z') },
            ],
            createdAt: new Date('2023-07-05T10:00:00Z'),
        },
        {
            key: '6',
            jobName: 'Go脚本模版_copy_1_cp',
            jobDescription: 'Go脚本测试',
            runStatus: '暂停',
            schedule: '开启',
            actions: [
                { action: '创建', time: new Date('2023-07-06T10:00:00Z') },
                { action: '启动/继续', time: new Date('2023-07-06T11:00:00Z') },
                { action: '暂停', time: new Date('2023-07-06T12:00:00Z') },
            ],
            createdAt: new Date('2023-07-06T10:00:00Z'),
        },
        {
            key: '7',
            jobName: 'Java脚本模版_copy_1_cp',
            jobDescription: 'Java脚本测试',
            runStatus: '未运行',
            schedule: '关闭',
            actions: [
                { action: '创建', time: new Date('2023-07-07T10:00:00Z') },
                { action: '停止', time: new Date('2023-07-07T11:00:00Z') },
            ],
            createdAt: new Date('2023-07-07T10:00:00Z'),
        },
        {
            key: '8',
            jobName: 'C#脚本模版_copy_1_cp',
            jobDescription: 'C#脚本测试',
            runStatus: '运行中',
            schedule: '开启',
            actions: [
                { action: '创建', time: new Date('2023-07-08T10:00:00Z') },
                { action: '启动/继续', time: new Date('2023-07-08T11:00:00Z') },
            ],
            createdAt: new Date('2023-07-08T10:00:00Z'),
        },
    ]);
    const [filteredData, setFilteredData] = useState(data);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('创建作业');
    const [currentJob, setCurrentJob] = useState(null);
    const [newJob, setNewJob] = useState({
        jobName: '',
        jobDescription: '',
        runStatus: '未运行',
        schedule: '关闭',
        actions: [],
        createdAt: new Date(),
    });
    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        updateChartData();
    }, [data]);

    const updateChartData = () => {
        const runStatusCount = data.reduce((acc, job) => {
            acc[job.runStatus] = (acc[job.runStatus] || 0) + 1;
            return acc;
        }, {});

        const pieData = Object.keys(runStatusCount).map(status => ({
            type: status,
            value: runStatusCount[status],
        }));

        setPieData(pieData);

        const actionCount = data.reduce((acc, job) => {
            job.actions.forEach(action => {
                acc[action.action] = (acc[action.action] || 0) + 1;
            });
            return acc;
        }, {});

        const barData = Object.keys(actionCount).map(action => ({
            category: action,
            count: actionCount[action],
        }));

        setBarData(barData);
    };

    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);

    const columns = [
        {
            title: '作业名称',
            dataIndex: 'jobName',
            key: 'jobName',
        },
        {
            title: '作业描述',
            dataIndex: 'jobDescription',
            key: 'jobDescription',
        },
        {
            title: '运行状态',
            dataIndex: 'runStatus',
            key: 'runStatus',
        },
        {
            title: '定期规则',
            dataIndex: 'schedule',
            key: 'schedule',
            render: (text, record) => (
                <Switch checked={text === '开启'} onChange={(checked) => handleScheduleToggle(record.key, checked)} />
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} className="action-button" onClick={() => showEditJobModal(record)}>编辑</Button>
                    <Button type="link" icon={<DeleteOutlined />} className="action-button" onClick={() => handleDeleteJob(record.key)}>删除</Button>
                    <Button type="link" icon={<CopyOutlined />} className="action-button" onClick={() => handleCopyJob(record)}>复制</Button>
                </span>
            ),
        },
    ];

    const handleSearch = () => {
        const values = form.getFieldsValue();
        const { jobName, runStatus, dateRange } = values;
        let filtered = data;
        if (jobName) {
            filtered = filtered.filter(item => item.jobName.includes(jobName));
        }
        if (runStatus && runStatus !== '全部') {
            filtered = filtered.filter(item => item.runStatus === runStatus);
        }
        if (dateRange && dateRange.length === 2) {
            const [start, end] = dateRange;
            filtered = filtered.filter(item => {
                const startDate = new Date(item.createdAt);
                const endDate = item.actions.length > 0 ? new Date(item.actions[item.actions.length - 1].time) : new Date();
                return (start <= endDate && end >= startDate);
            });
        }
        setFilteredData(filtered);
    };

    const showAddJobModal = () => {
        setModalTitle('创建作业');
        setNewJob({
            jobName: '',
            jobDescription: '',
            runStatus: '未运行',
            schedule: '关闭',
            actions: [],
            createdAt: new Date(),
        });
        setIsModalVisible(true);
    };

    const showEditJobModal = (job) => {
        setModalTitle('编辑作业');
        setNewJob({ ...job });
        setCurrentJob(job);
        setIsModalVisible(true);
    };

    const handleAddJob = () => {
        if (modalTitle === '创建作业') {
            const newData = {
                key: data.length + 1,
                ...newJob,
                createdAt: new Date(),
            };
            setData([...data, newData]);
            setFilteredData([...data, newData]);
            message.success('作业创建成功');
        } else {
            const updatedData = data.map(item => item.key === currentJob.key ? newJob : item);
            setData(updatedData);
            setFilteredData(updatedData);
            message.success('作业编辑成功');
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDeleteJob = (key) => {
        const updatedData = data.filter(item => item.key !== key);
        setData(updatedData);
        setFilteredData(updatedData);
        message.success('作业删除成功');
    };

    const handleBulkDelete = () => {
        const updatedData = data.filter(item => !selectedKeys.includes(item.key));
        setData(updatedData);
        setFilteredData(updatedData);
        message.success('批量删除成功');
        setSelectedKeys([]);
    };

    const handleCopyJob = (job) => {
        const newData = {
            key: data.length + 1,
            jobName: `${job.jobName}_copy`,
            jobDescription: job.jobDescription,
            runStatus: job.runStatus,
            schedule: job.schedule,
            actions: [...job.actions],
            createdAt: new Date(),
        };
        setData([...data, newData]);
        setFilteredData([...data, newData]);
        message.success('作业复制成功');
    };

    const handleBulkCopy = () => {
        const newData = selectedKeys.map(key => {
            const job = data.find(item => item.key === key);
            return {
                key: data.length + 1,
                jobName: `${job.jobName}_copy`,
                jobDescription: job.jobDescription,
                runStatus: job.runStatus,
                schedule: job.schedule,
                actions: [...job.actions],
                createdAt: new Date(),
            };
        });
        setData([...data, ...newData]);
        setFilteredData([...data, ...newData]);
        message.success('批量复制成功');
        setSelectedKeys([]);
    };

    const handlePauseJob = (key) => {
        const updatedData = data.map(item => item.key === key ? { ...item, runStatus: '暂停', actions: [...item.actions, { action: '暂停', time: new Date() }] } : item);
        setData(updatedData);
        setFilteredData(updatedData);
    };

    const handleStopJob = (key) => {
        const updatedData = data.map(item => item.key === key ? { ...item, runStatus: '未运行', actions: [...item.actions, { action: '停止', time: new Date() }] } : item);
        setData(updatedData);
        setFilteredData(updatedData);
    };

    const handleContinueJob = (key) => {
        const updatedData = data.map(item => item.key === key ? { ...item, runStatus: '运行中', actions: [...item.actions, { action: '启动/继续', time: new Date() }] } : item);
        setData(updatedData);
        setFilteredData(updatedData);
    };

    const handleScheduleToggle = (key, checked) => {
        const updatedData = data.map(item => item.key === key ? { ...item, schedule: checked ? '开启' : '关闭' } : item);
        setData(updatedData);
        setFilteredData(updatedData);
    };

    const handleSelect = (key) => {
        setSelectedKeys(prev =>
            prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
        );
    };

    const handleBulkAction = (action) => {
        if (action === '复制') {
            handleBulkCopy();
        } else if (action === '删除') {
            handleBulkDelete();
        } else {
            const updatedData = data.map(item =>
                selectedKeys.includes(item.key) ? { ...item, runStatus: action, actions: [...item.actions, { action, time: new Date() }] } : item
            );
            setData(updatedData);
            setFilteredData(updatedData);
            message.success(`批量操作成功：${action}`);
            setSelectedKeys([]);
        }
    };

    const pieConfig = {
        appendPadding: 10,
        data: pieData,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'inner',
            content: '{name}\n{percentage}',
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    };

    const barConfig = {
        data: barData,
        xField: 'category',
        yField: 'count',
        seriesField: 'category',
        legend: { position: 'top-left' },
    };

    return (
        <div className="data-extraction-scheduling-management">
            <Card title="调度作业管理" className="filter-card">
                <Form layout="inline" form={form}>
                    <Form.Item name="jobName" label="作业名称">
                        <Input placeholder="按作业名称查询" />
                    </Form.Item>
                    <Form.Item name="dateRange" label="运行日期">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item name="runStatus" label="运行状态">
                        <Select placeholder="请选择">
                            <Option value="全部">全部</Option>
                            <Option value="运行中">运行中</Option>
                            <Option value="未运行">未运行</Option>
                            <Option value="暂停">暂停</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>查询</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card className="action-card">
                <Button type="primary" className="action-button" icon={<PlusOutlined />} onClick={showAddJobModal} style={{ color: '#fff' }}>创建作业</Button>
                <Button className="action-button" icon={<CopyOutlined />} onClick={() => handleBulkAction('复制')}>复制作业</Button>
                <Button className="action-button" icon={<DeleteOutlined />} onClick={() => handleBulkAction('删除')}>删除作业</Button>
                <Button className="action-button" icon={<PauseOutlined />} onClick={() => handleBulkAction('暂停')}>暂停</Button>
                <Button className="action-button" icon={<StopOutlined />} onClick={() => handleBulkAction('未运行')}>停止</Button>
                <Button className="action-button" icon={<PlayCircleOutlined />} onClick={() => handleBulkAction('运行中')}>启动/继续</Button>
            </Card>
            <Table columns={columns} dataSource={filteredData} pagination={false} className="data-table" rowSelection={{
                selectedRowKeys: selectedKeys,
                onChange: (selectedRowKeys) => setSelectedKeys(selectedRowKeys),
            }} />
            <Card title="实例运行统计" className="stats-card">
                <Pie {...pieConfig} />
            </Card>
            <Card title="实例详情" className="details-card">
                <Column {...barConfig} />
            </Card>
            <Modal
                title={modalTitle}
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleAddJob}
                centered
            >
                <Form layout="vertical">
                    <Form.Item label="作业名称" required>
                        <Input
                            value={newJob.jobName}
                            onChange={e => setNewJob({ ...newJob, jobName: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="作业描述" required>
                        <Input
                            value={newJob.jobDescription}
                            onChange={e => setNewJob({ ...newJob, jobDescription: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="运行状态" required>
                        <Select
                            value={newJob.runStatus}
                            onChange={value => setNewJob({ ...newJob, runStatus: value })}
                        >
                            <Option value="运行中">运行中</Option>
                            <Option value="未运行">未运行</Option>
                            <Option value="暂停">暂停</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="定期规则" required>
                        <Switch
                            checked={newJob.schedule === '开启'}
                            onChange={checked => setNewJob({ ...newJob, schedule: checked ? '开启' : '关闭' })}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DataExtractionSchedulingManagement;
