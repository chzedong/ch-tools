import EventEmit from 'ch-tools-event'
import { SchemaParser } from './schemaParser'
import { PluginHandler } from './pluginHandler'
import { FieldHandler } from './fieldHandler'
import { Scheduler } from './scheduler'
import { genKey } from '../utils'

import { FieldType, FormSchema } from '../types'

export class FormController extends EventEmit {
  schemaParser: SchemaParser
  pluginHandler: PluginHandler
  fieldHandler: FieldHandler
  scheduler: Scheduler

  get fields() {
    return this.fieldHandler.fields
  }

  constructor(schema: FormSchema) {
    super()

    this.pluginHandler = new PluginHandler(this)
    this.schemaParser = new SchemaParser(schema)
    this.fieldHandler = new FieldHandler(this)
    this.scheduler = new Scheduler(this)
  }

  replaceField = (field: FieldType) => {
    this.fieldHandler.replaceField(field)
    this.notify()
  }

  validateField = (field: FieldType) => {
    this.fieldHandler.validateField(field)
    this.notify()
  }

  validateAll = () => {
    this.fieldHandler.validateAll()
    this.notify()
  }

  getField(key: string) {
    return this.fields.find(f => genKey(f.name) === key)
  }

  notify = () => {
    this.emit('change', [...this.fields])
  }
}
