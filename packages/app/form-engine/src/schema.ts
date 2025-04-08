import { FormSchema } from 'ch-tools-form'

// 接口表单协议，轻量化的表达方案
export const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'input',
      title: '姓名'
    },
    age: {
      type: 'inputNumber',
      title: '年龄'
    },
    area: {
      type: 'select',
      title: '地区'
    },
    format: {
      type: 'format',
      title: '格式',
      dependencies: ['name', 'age']
    }
  }
}

// 布局信息
export const layout: string[][] = [['name'], ['age'], ['area'], ['format']]

export class SchemaParser {
  constructor(private schema: FormSchema) {}

  getProperty = (name: string) => {
    return this.schema.properties[name]
  }

  isRequired = (name: string) => {
    return this.schema.required?.includes(name)
  }

  getProperties = () => {
    return this.schema.properties
  }

  forEachProperty = (callback: (key: string, value: any) => void) => {
    Object.entries(this.schema.properties).forEach(([key, value]) => {
      callback(key, value)
    })
  }

  getDependencies = (name: string) => {
    return this.schema.properties[name].dependencies || []
  }
}
