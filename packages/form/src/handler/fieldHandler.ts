import { FormController } from './controller'
import { genKey } from '../utils'

import { FieldSnapshot, FieldType } from '../types'

export class FieldHandler {
  fields: FieldType[]
  constructor(private ctl: FormController) {
    this.fields = this._initFields()
  }

  _initFields(): FieldType[] {
    return Object.keys(this.ctl.schemaParser.getProperties()).map(key => {
      const property = this.ctl.schemaParser.getProperty(key)

      return {
        name: [key],
        value: property.type === 'number' ? 0 : '',
        errors: [],
        validating: false,
        validated: false,
        touched: false
      }
    })
  }

  replaceField(field: FieldType) {
    const index = this.fields.findIndex(f => {
      return genKey(f.name) === genKey(field.name)
    })
    this.fields[index] = field
  }

  validateField(field: FieldType) {
    const fieldName = genKey(field.name)

    const index = this.fields.findIndex(f => {
      return genKey(f.name) === genKey(field.name)
    })

    field.validated = true
    field.touched = true

    // required
    if (this.ctl.schemaParser.isRequired(fieldName) && !field.value) {
      field.errors = [`${this.ctl.schemaParser.getProperty(fieldName).title}不能为空`]
    } else {
      field.errors = []
    }

    this.fields[index] = { ...field }
  }

  validateAll = () => {
    this.fields.forEach(field => {
      this.validateField(field)
    })
  }

  getField(key: string) {
    return this.fields.find(f => genKey(f.name) === key)
  }

  getFields() {
    return this.fields
  }

  static createFieldSnapshot = (fields: FieldType[]): FieldSnapshot[] => {
    return fields.map(field => {
      return {
        name: field.name,
        value: field.value,
        errors: field.errors,
        validating: field.validating,
        validated: field.validated,
        touched: field.touched
      }
    })
  }
}
