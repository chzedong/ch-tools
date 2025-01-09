import { FormSchema } from "./type"

export class SchemaParser {

  constructor(private schema: FormSchema) {}

  getProperty = (name: string) => {
    return this.schema.properties[name]
  }

  isRequired = (name: string) => {
    return this.schema.required?.includes(name)
  }

  getProperties = () => {
    return this.schema.properties
  }
}
