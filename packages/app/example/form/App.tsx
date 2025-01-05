import React from 'react'
import { Form } from 'antd'
import { useFormCtl } from './FomCtl'

export const App = () => {
  return (
    <div>
      <Demo />
    </div>
  )
}

// 根据json schema生成表单
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '姓名'
    },
    age: {
      type: 'number',
      title: '年龄'
    }
  },

  required: ['name']
}

const Demo = () => {
  const [{ fieldProps, fields }, ctl] = useFormCtl(schema)

  // 根据schema生成表单项
  const formItems = fieldProps.map((field, index) => {
    const FieldComponent = field.component
    return (
      <Form.Item key={index} label={field.label} name={field.name} rules={[{ required: true, message: `${field.label}不能为空` }]}>
        <FieldComponent />
      </Form.Item>
    )
  })

  console.log(fields, fieldProps)

  return (
    <>
      <Form
        layout="vertical"
        autoComplete="off"
        fields={fields}
        onFieldsChange={_ => {
          console.log(111)
          ctl.replaceField(_[0])
        }}
      >
        {formItems}
      </Form>
      <button onClick={ctl.validateAll}>提交</button>
    </>
  )
}
