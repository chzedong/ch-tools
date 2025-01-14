import { FormController } from './handler/controller'
import { SchemaParser } from './handler/schemaParser'

import { FormPlugin, FormSchema } from './types'

export const createFieldProps = (schema: FormSchema, ctl: FormController) => {
  const schemaParser = new SchemaParser(schema)

  return Object.keys(schemaParser.getProperties()).map(key => {
    const property = schemaParser.getProperty(key)
    const component = ctl.pluginHandler.getPluginComponent(key)

    return {
      component,
      label: property.title,
      name: [key],
      rules: [{ required: schemaParser.isRequired(key), message: `${property.title}不能为空` }],
      events: {
        onBlur: () => ctl.pluginHandler.applyPluginsBlurChange(key)
      }
    }
  })
}

export const registryPlugin = (ctl: FormController, widgets: Record<string, FormPlugin>) => {
  for (const key in widgets) {
    const widget = widgets[key]
    ctl.pluginHandler.addPlugin(widget)
  }
}
