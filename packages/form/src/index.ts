import { FormController } from './handler/controller'
import { FieldHandler } from './handler/fieldHandler'
import { useForm } from './useForm'
import { genKey } from './utils'

export { FormController, useForm, FieldHandler, genKey }

export type { FormSchema, FormPlugin, FieldType, FieldSnapshot, FieldProps } from './types'
