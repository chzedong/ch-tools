import React from 'react'
import { Form } from 'antd'
import { useForm } from '../useForm'

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
      type: 'string',
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
  required: ['name']
}

const Demo = () => {
  const [{ fieldProps, fields }, ctl] = useForm(schema)

  // 根据schema生成表单项
  const formItems = fieldProps.map((field, index) => {
    const FieldComponent = field.component

    return (
      <Form.Item key={index} label={field.label} name={field.name} rules={field.rules}>
        {/* field component 只负责根据当前field表单数据渲染不同类型的表单组件，至于不同表单项的交互，比如联动抽象到插件里面去实现 */}
        <FieldComponent {...field.events} addPlugin={ctl.addPlugin} />
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
          ctl.replaceField(_[0])
        }}
      >
        {formItems}
      </Form>
      <button onClick={ctl.validateAll}>提交</button>
    </>
  )
}
