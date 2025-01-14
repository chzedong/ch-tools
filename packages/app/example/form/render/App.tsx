import React from 'react'
import { Form } from 'antd'
import { useForm } from 'ch-tools-form'
import * as widgets from '../widgets'

export const App = () => {
  return (
    <div>
      <Demo />
    </div>
  )
}

// 根据json schema生成表单 如何表示字段联动
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'name',
      title: '姓名'
    },
    age: {
      type: 'number',
      title: '年龄'
    },
    // 计算字段，依赖姓名和 年龄
    computed: {
      type: 'computed',
      title: '计算字段',
      trigger: ['name:blur', 'age:blur']
    }
  },
  required: ['input']
}

const Demo = () => {
  const [{ fieldProps, fields }, ctl] = useForm(schema, widgets)

  const formItems = fieldProps.map((field, index) => {
    const FieldComponent = field.component

    return (
      <Form.Item key={index} label={field.label} name={field.name} rules={field.rules}>
        <FieldComponent {...field.events} addPlugin={ctl.addPlugin} />
      </Form.Item>
    )
  })

  console.log('render: ', fields, fieldProps)
  return (
    <>
      <Form
        layout="vertical"
        autoComplete="off"
        fields={fields}
        onFieldsChange={_ => {
          ctl.replaceField(_[0])
        }}
      >
        {formItems}
      </Form>
      <button onClick={ctl.validateAll}>提交</button>
    </>
  )
}
