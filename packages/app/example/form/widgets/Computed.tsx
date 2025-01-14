import React from 'react'
import { FormPlugin, FieldSnapshot, FormController, FieldHandler, genKey } from 'ch-tools-form'

const Computed = (props: { value: any }) => {
  return <div>{props.value}</div>
}

class ComputedPlugin implements FormPlugin {
  private ctl: FormController

  private eventMap: { [key: string]: string[] } = {}

  private depKeys: string[] = []

  name: string = 'computed'

  component = Computed

  async apply(ctl: FormController) {
    this.ctl = ctl

    const property = ctl.schemaParser.getProperty('computed')
    const trigger = property.trigger || []

    for (const key of trigger) {
      const [name, event] = key.split(':')
      if (!this.eventMap[event]) {
        this.eventMap[event] = [name]
      } else {
        this.eventMap[event].push(name)
      }

      this.depKeys.push(name)
    }

    const ret = this._calculate(FieldHandler.createFieldSnapshot(ctl.fields))
    const field = ctl.getField('computed')!
    ctl.replaceField({ ...field, value: ret })
  }

  _calculate(fields: FieldSnapshot[]) {
    let ret = 0

    for (const key of this.depKeys) {
      const field = fields.find(f => genKey(f.name) === key)!
      if (genKey(field.name) === 'name') {
        ret += field.value.length
      }

      if (genKey(field.name) === 'age') {
        ret += field.value
      }
    }

    return ret
  }

  list = [1000, 5000]

  async onBlur(key: string, fields: FieldSnapshot[]) {
    if (this.eventMap['blur'].includes(key)) {
      const ret = this._calculate(fields)

      // 随机延时
      await new Promise(resolve => {
        setTimeout(
          () => {
            resolve(ret)
          },
          this.list[Math.round((Math.random() * 1000) % 2)]
        )
      })

      return fields.map(field => {
        if (genKey(field.name) === 'computed') {
          return {
            ...field,
            value: ret
          }
        }

        return field
      })
    }

    return []
  }
}


export default new ComputedPlugin()
