import { FieldType, FormPlugin, FormSchema } from './type'
import { SchemaParser as SchemaParser } from './schemaParser'

const cloneDeep = (obj: any) => JSON.parse(JSON.stringify(obj))

class EventEmit {
  listeners: any[] = []

  on(cb: any) {
    this.listeners.push(cb)
  }

  emit(args: any) {
    this.listeners.forEach(cb => cb(args))
  }
}

export class FormCtl extends EventEmit {
  schemaParser: SchemaParser
  fields: FieldType[]

  plugins: FormPlugin[] = []

  constructor(schema: FormSchema) {
    super()

    this.schemaParser = new SchemaParser(schema)

    this.fields = this._initFields()
  }

  // fields相关
  _initFields(): FieldType[] {
    return Object.keys(this.schemaParser.getProperties()).map(key => {
      const property = this.schemaParser.getProperty(key)

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

    this.notify()
  }

  _validateField(field: FieldType) {
    const fieldName = this._genKey(field.name)

    const index = this.fields.findIndex(f => {
      return this._genKey(f.name) === this._genKey(field.name)
    })

    field.validated = true
    field.touched = true

    // required
    if (this.schemaParser.isRequired(fieldName) && !field.value) {
      field.errors = [`${this.schemaParser.getProperty(fieldName).title}不能为空`]
    } else {
      field.errors = []
    }

    this.fields[index] = field
  }

  validateField = (field: FieldType) => {
    this._validateField(field)

    this.notify()
  }

  validateAll = () => {
    this.fields.forEach(field => {
      this._validateField(field)
    })

    this.notify()
  }

  getField(key: string) {
    return this.fields.find(f => this._genKey(f.name) === key)
  }

  // 通信相关
  notify = () => {
    this.emit(cloneDeep(this.fields))
  }

  // 插件相关
  addPlugin = (plugin: FormPlugin) => {
    this.plugins.push(plugin)
    plugin.apply(this)
  }

  applyPluginsBlurChange = (key: string) => {
    this.plugins.forEach(plugin => {
      plugin.onBlur(key)
    })
  }
}
