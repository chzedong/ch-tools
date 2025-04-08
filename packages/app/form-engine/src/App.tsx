import React from 'react'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@formily/react'
import { Button } from 'antd'
import { layout, schema, SchemaParser } from './schema'
import { WidgetsPlugin } from '../plugin'
import {FormatPlugin, InputNumberPlugin, InputPlugin, SelectPlugin } from '../plugin/plugins'
import { FormItem } from '../components/FormItem'
import { syncReaction } from './effects'

// 协议解析器
const schemaParser = new SchemaParser(schema)
// 物料体系
const widgetsPlugin = new WidgetsPlugin()
widgetsPlugin.registerPlugin(new InputPlugin())
widgetsPlugin.registerPlugin(new InputNumberPlugin())
widgetsPlugin.registerPlugin(new SelectPlugin())
widgetsPlugin.registerPlugin(new FormatPlugin())
// vm
const form = createForm({
  effects: (form: any) => {
    schemaParser.forEachProperty((key, value) => {
      if (schemaParser.getDependencies(key).length > 0) {
        const plugin = widgetsPlugin.getPlugin(value.type)
        syncReaction(form, schemaParser.getDependencies(key), [key], plugin.reactions)
      }
    })
  }
})

export const App = () => {
  window.form = form

  console.log('app render')
  return (
    // 视图层桥接表单模型的入口，共享状态
    <FormProvider form={form}>
      {layout.map((items: string[], index: number) => {
        return (
          <div key={index}>
            {items.map(id => {
              const { type, title } = schemaParser.getProperty(id)
              const plugin = widgetsPlugin.getPlugin(type)
              return (
                <Field
                  key={id}
                  name={id}
                  title={title}
                  validator={plugin.validator}
                  component={[plugin.component]}
                  // reactions={plugin.reactions}
                  decorator={[FormItem, { label: title, name: id }]}
                />
              )
            })}
          </div>
        )
      })}
      <div>
        <Button
          onClick={() => {
            form.submit()
          }}
        >
          提交
        </Button>
      </div>
    </FormProvider>
  )
}

// 1. 多列布局 done
// 2. 表单异步验证 done
// 3. 表单异步联动
