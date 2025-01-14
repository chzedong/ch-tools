import { FieldSnapshot, FieldType, FormPlugin, FormSchema } from './type'
import { SchemaParser as SchemaParser } from './schemaParser'
import { scheduleTask } from './scheduleTask'

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

  createFieldSnapshot = (): FieldSnapshot[] => {
    return this.fields.map(field => {
      return {
        name: field.name.join('.'),
        value: field.value
      }
    })
  }

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
  private _timer = 0
  notify = () => {
    if (this._timer) {
      return
    }

    // 节流 每一个宏任务批量更新
    this._timer = setTimeout(() => {
      console.info('notify:', this.fields)
      this.emit(cloneDeep(this.fields))
      clearTimeout(this._timer)
      this._timer = 0
    }, 0)
  }

  // 插件相关
  addPlugin = (plugin: FormPlugin) => {
    this.plugins.push(plugin)
    plugin.apply(this) // 插件初始化 会有副作用，可能修改表单，可能异步
  }

  applyPluginsBlurChange = async (key: string) => {

    const pro = (async () => {
      let snap = this.createFieldSnapshot()
      for (const plugin of this.plugins) {
        snap = await plugin.onBlur(key, snap)
      }
      return snap
    })()

    const task = scheduleTask('blur', pro)
    try {
      const snap: FieldSnapshot[] = await task.run()

      this.fields.forEach(field => {
        const snapItem = snap.find(item => {
          return item.name === field.name.join('.')
        })
        if (snapItem) {
          field.value = snapItem.value
        }
      })

      this.notify()
    } catch (error) {
      console.error(error)
    }
  }
}
