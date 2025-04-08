import { Plugin } from './type'

export class WidgetsPlugin {
  private plugins: Record<string, Plugin> = {}

  constructor() {}

  // 注册插件
  registerPlugin(plugin: Plugin) {
    this.plugins[plugin.type] = plugin
  }

  // 获取插件
  getPlugin(name: string) {
    return this.plugins[name]
  }

  forEachPlugin(callback: (plugin: Plugin) => void) {
    Object.values(this.plugins).forEach(plugin => {
      callback(plugin)
    })
  }
}
