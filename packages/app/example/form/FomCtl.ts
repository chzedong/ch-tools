import React from 'react'
import { FieldProps, FieldType, FormSchema } from './type'
import { widgetsMap } from './widgets'


const cloneDeep = (obj: any) => JSON.parse(JSON.stringify(obj))
export class FormCtl {
  schema: FormSchema
  fields: FieldType[]
  fieldProps: FieldProps[]

  constructor(schema: FormSchema) {
    this.schema = schema

    this.fields = this.initFields()
    this.fieldProps = this.initFieldProps()
  }

  initFieldProps(): FieldProps[] {
    return Object.keys(this.schema.properties).map(key => {
      const property = this.schema.properties[key]
      return {
        component: widgetsMap[property.type],
        label: property.title,
        name: [key],
        rules: [{ required: this.schema.required?.includes(key), message: `${property.title}不能为空` }]
      }
    })
  }

  initFields(): FieldType[] {
    return Object.keys(this.schema.properties).map(key => {
      return {
        name: [key],
        value: this.schema.properties[key].type === 'number' ? 0 : '',
        errors: [],
        validating: false,
        validated: false,
        touched: false
      }
    })
  }

  _genKey = (name: string[]) => name.join('.')

  _replaceField(field: FieldType) {
    const index = this.fields.findIndex(f => {
      return this._genKey(f.name) === this._genKey(field.name)
    })
    this.fields[index] = field
  }

  // 用于react的api 需要替换指针
  replaceField = (field: FieldType) => {
    this._replaceField(field)

    this.fields = [...this.fields]
  }

  _validateField(field: FieldType) {
    const index = this.fields.findIndex(f => {
      return this._genKey(f.name) === this._genKey(field.name)
    })

    field.validated = true
    field.touched = true

    // required
    if (this.schema.required?.includes(field.name[0]) && !field.value) {
      field.errors = [`${this.fieldProps[index].label}不能为空`]
    } else {
      field.errors = []
    }

    this.fields[index] = field
  }

  validateField = (field: FieldType) => {
    this._validateField(field)

    this.fields = [...this.fields]
  }

  validateAll = () => {
    this.fields.forEach(field => {
      this._validateField(field)
    })

    this.fields = cloneDeep(this.fields)
  }
}

const useUpdate = () => {
  const [, setState] = React.useState({})
  return () => setState({})
}

export const useFormCtl = (schema: FormSchema) => {
  const ctlRef = React.useRef<FormCtl>(null)
  if (!ctlRef.current) {
    ctlRef.current = new FormCtl(schema)
  }

  const update = useUpdate()

  const fields = ctlRef.current.fields
  const fieldProps = ctlRef.current.fieldProps

  const validateField = (field: FieldType) => {
    ctlRef.current?.validateField(field)
    update()
  }

  const validateAll = () => {
    ctlRef.current?.validateAll()
    update()
  }

  const replaceField = (field: FieldType) => {
    ctlRef.current?.replaceField(field)
    update()
  }

  return [
    { fields, fieldProps },
    {
      validateField,
      validateAll,
      replaceField
    }
  ] as const
}
