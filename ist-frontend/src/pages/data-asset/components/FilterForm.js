import {Button, Form, Input, Select} from "antd";
import React from "react";
import '../../../style/InlineForm.css'
import config from '../../data-model/DataModel/config'

const {Option} = Select

const FilterForm = ({onFilterAsset}) => {
    const [filterForm] = Form.useForm()

    return (
        <Form form={filterForm} layout='inline' className='inline-form' onFinish={onFilterAsset}
              onReset={_ => {onFilterAsset(filterForm.getFieldsValue())}}>
            <Form.Item label='名称' name='modelName'>
                <Input placeholder='请输入模型名称'/>
            </Form.Item>
            <Form.Item label='模态' name='modal'>
                <Select placeholder='请选择模型类型'>
                    {
                        config.modelModals?.map((item) => (
                            <Option value={item.value} key={item.value}>{item.label}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
            <Form.Item label='类型' name='type'>
                <Select placeholder='请选择模型类型'>
                    {
                        config.modelTypes?.map((item) => (
                            <Option value={item.value} key={item.value}>{item.label}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
            <Form.Item label='业务域' name='domain'>
                <Input placeholder='请输入业务域名称'/>
            </Form.Item>
            <Form.Item label='描述' name='description'>
                <Input placeholder='请输入模型描述'/>
            </Form.Item>
            <Form.Item label='标签' name='tag'>
                <Input placeholder='请输入模型标签'/>
            </Form.Item>
            <Button type='primary' htmlType='submit'>筛选</Button>
            <Button htmlType='reset'>重置</Button>
        </Form>
    )
}

export default FilterForm
