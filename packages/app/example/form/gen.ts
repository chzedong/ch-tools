import { SchemaParser } from './schemaParser'
import { FormSchema } from './type'
import { widgetsMap } from './widgets'

interface Triggers {
  onBlur: (key: string) => void
}

export const createFieldProps = (schema: FormSchema, triggers: Triggers) => {
  const schemaParser = new SchemaParser(schema)

  return Object.keys(schemaParser.getProperties()).map(key => {
    const property = schemaParser.getProperty(key)

    return {
      component: widgetsMap[property.type],
      label: property.title,
      name: [key],
      rules: [{ required: schemaParser.isRequired(key), message: `${property.title}不能为空` }],
      events: {
        onBlur: () => triggers.onBlur(key)
      }
    }
  })
}
