import React, { useMemo } from 'react'
import { FieldType, FormSchema } from './type'
import { FormCtl } from './fomCtl'
import { createFieldProps } from './gen'

export const useForm = (schema: FormSchema) => {
  const [fields, setFields] = React.useState<FieldType[]>([])

  const ctlRef = React.useRef<FormCtl>(null)
  if (!ctlRef.current) {
    ctlRef.current = new FormCtl(schema)
    ctlRef.current.on((_fields: FieldType[]) => {
      setFields(_fields)
    })
  }

  const onBlur = (key: string) => {
    ctlRef.current?.applyPluginsBlurChange(key)
  }

  const fieldProps = useMemo(() => createFieldProps(schema, { onBlur }), [schema])

  return [
    { fields, fieldProps },
    {
      validateField: ctlRef.current.validateField,
      validateAll: ctlRef.current.validateAll,
      replaceField: ctlRef.current.replaceField,
      addPlugin: ctlRef.current.addPlugin
    }
  ] as const
}
