import { Rule } from 'antd/es/form'
import { FunctionComponent } from 'react'

export interface FieldType<T = any> {
  name: string[]
  errors?: string[]
  validating?: boolean
  validated?: boolean
  touched?: boolean
  value?: T
}

// field 校验相关
interface FieldValidate {
  rules: Rule[]
}

export interface FieldProps extends FieldValidate {
  component: FunctionComponent
  label: string
  name: string[]
}

export interface FormSchema {
  type: string
  properties: {
    [key: string]: {
      type: string
      title: string
    }
  }
  required?: string[]
}
