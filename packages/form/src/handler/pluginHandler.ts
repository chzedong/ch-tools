import { FormController } from './controller'
import { genKey } from '../utils'

import { FieldSnapshot, FormPlugin } from '../types'
import { FieldHandler } from './fieldHandler'

export class PluginHandler {
  constructor(private formCtl: FormController) {}

  private _plugins: FormPlugin[] = []

  addPlugin(plugin: FormPlugin) {
    this._plugins.push(plugin)
  }

  getPluginComponent = (key: string) => {
    const plugin = this._plugins.find(plugin => plugin.name === key)
    if (plugin) {
      return plugin.component
    }
    return null
  }

  applyPluginsBlurChange = async (key: string) => {
    const initSnap = FieldHandler.createFieldSnapshot(this.formCtl.fields)

    const pro = (async () => {
      let snap = [...initSnap]

      for (const plugin of this._plugins) {
        if (plugin.onBlur) {
          snap = await plugin.onBlur(key, snap)
        }
      }

      return snap
    })()

    const task = this.formCtl.scheduler.createTask('blur', pro)
    try {
      const snap: FieldSnapshot[] = await task.run()

      this.formCtl.fields.forEach(field => {
        const index = snap.findIndex(item => {
          return genKey(item.name) === field.name.join('.')
        })

        if (initSnap[index] === snap[index]) {
          return
        }

        if (snap[index]) {
          this.formCtl.fields[index] = { ...field, value: snap[index].value }
        }
      })

      this.formCtl.notify()
    } catch (error) {
      console.error(error)
    }
  }

  applyPlugins = () => {
    this._plugins.forEach(plugin => {
      plugin.apply(this.formCtl)
    })
  }
}
