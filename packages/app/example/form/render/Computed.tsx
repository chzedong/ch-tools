import React, { useEffect } from 'react'
import { FormPlugin } from '../type'
import { FormCtl } from '../fomCtl'

class ComputedPlugin extends FormPlugin {
  private ctl: FormCtl // 表单控制器, 插件可以访问的唯一上下文，可以通过它获取表单数据，更新表单数据

  private eventMap: { [key: string]: string[] } = {} // 事件映射，key为事件类型，value为触发事件的字段名

  private depKeys: string[] = [] // 依赖字段，使用场景表单联动 依赖字段变化，计算字段也会变化

  apply(ctl: FormCtl) {
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

    const ret = this._calculate()
    const field = ctl.getField('computed')!
    field.value = ret
    ctl.replaceField(field)
  }

  _calculate() {
    let ret = 0

    for (const key of this.depKeys) {
      const field = this.ctl.getField(key)!
      if (field.name[0] === 'name') {
        ret += field.value.length
      }

      if (field.name[0] === 'age') {
        ret += field.value
      }
    }

    return ret
  }

  onBlur(key: string) {
    if (this.eventMap['blur'].includes(key)) {
      const ret = this._calculate()
      const field = this.ctl.getField('computed')!
      field.value = ret
      this.ctl.replaceField(field)
    }
  }
}

export const Computed = (props: { addPlugin: (plugin: FormPlugin) => void; value: any }) => {
  useEffect(() => {
    const plugin = new ComputedPlugin()
    props.addPlugin(plugin)
  }, [])

  return <div>{props.value}</div>
}
