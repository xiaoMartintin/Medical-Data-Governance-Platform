import {Card, Button, Tag, message, Popconfirm} from 'antd';
import {collectModelData, deleteDataModel} from '../../../../apis/DataModelingApi';
import {useNavigate} from 'react-router-dom';
import {formatModelModal, formatModelType} from '../methods';

const DataModelCard = ({model, onBindModel, onFinishDelete, showOperation = true}) => {
    const navigate = useNavigate()

    const handleViewDetails = (id) => {
        navigate(`/data-modeling/data-model/${id}`)
    }

    //TODO:恢复注释
    const handleCollectData = (id) => {
        message.success('成功采集数据').then();
        // collectModelData({
        //     modelId: id
        // }).then(_ => {
        //     message.success('成功采集数据').then();
        // }).catch(error => {
        //     message.error(`数据采集失败：${error.message}`).then();
        // })
    }

    const handleDelete = (id) => {
        //TODO:恢复注释
        onFinishDelete()
        message.success(`已删除模型 ${id}`).then();
        // deleteDataModel(id).then(_ => {
        //     message.success(`已删除模型 ${id}`).then();
        //     onFinishDelete()
        // }).catch(error => {
        //     message.error(`删除模型失败：${error.message}`).then();
        // })
    }

    return (
        <Card
            title={model.modelName}
            style={{width: '30%', minWidth: 300, margin: '12px 12px 12px 0'}}
            actions={[
                <Button onClick={() => handleViewDetails(model.id)}>详情</Button>,
                showOperation && <Button onClick={() => onBindModel(model)}>绑定</Button>,
                showOperation && !model.realtime && <Button onClick={() => handleCollectData(model.id)}>采集</Button>,
                showOperation && (<Popconfirm
                    title="警告"
                    description="是否确定删除该模型?"
                    onConfirm={() => handleDelete(model.id)}
                    okText="删除"
                    cancelText="取消"
                >
                    <Button danger>删除</Button>
                </Popconfirm>)].filter(i => i)}>
            <p>ID: {model.id}</p>
            <p>类型: {formatModelType(model.type)}</p>
            <p>模态: {formatModelModal(model.modal)}</p>
            <p>业务域: {model.domain}</p>
            <p>描述: {model.description || '无'}</p>
            <p>采集方式：{model.realtime ? '实时' : '手动'}</p>
            <p>标签: {model.tag.length > 0 ? model.tag.map((tag, idx) => (
                    <Tag color='blue' key={idx} style={{}}>{tag}</Tag>
                )
            ) : <Tag style={{margin: '2px 5px'}}>无</Tag>}</p>
            {/*<p>字段: {model.fields.map((field, idx) => (<Tag key={idx} style={{*/}
            {/*    margin: 3*/}
            {/*}}>{field.name}</Tag>))}</p>*/}
        </Card>)
}

export default DataModelCard
