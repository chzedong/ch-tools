import { Rule } from 'antd/es/form'
import { FunctionComponent } from 'react'
import { FormController } from './handler/controller'

export interface FieldType<T = any> {
  name: string[]
  errors?: string[]
  validating?: boolean
  validated?: boolean
  touched?: boolean
  value?: T
}

export type FieldSnapshot = FieldType

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
      trigger?: string[]
    }
  }
  required?: string[]
}

export interface FormPlugin {
  name: string

  component: FunctionComponent | any

  apply(ctl: FormController): void

  onBlur?(key: string, fields: FieldSnapshot[]): Promise<FieldSnapshot[]>
}
