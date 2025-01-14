import React, { useEffect, useMemo } from 'react'
import { FormController } from './handler/controller'
import { createFieldProps, registryPlugin } from './gen'

import { FieldType, FormPlugin, FormSchema } from './types'

export const useForm = (schema: FormSchema, widgets: Record<string, FormPlugin>) => {
  const [fields, setFields] = React.useState<FieldType[]>([])

  const ctlRef = React.useRef<FormController>(null)
  if (!ctlRef.current) {
    ctlRef.current = new FormController(schema)
    ctlRef.current.on('change', (_fields: FieldType[]) => {
      setFields(_fields)
    })

    registryPlugin(ctlRef.current, widgets)
  }

  const fieldProps = useMemo(() => createFieldProps(schema, ctlRef.current!), [schema])

  useEffect(() => {
    if (!ctlRef.current) {
      return
    }

    ctlRef.current.pluginHandler.applyPlugins()
  }, [])

  return [
    { fields, fieldProps },
    {
      validateField: ctlRef.current.validateField,
      validateAll: ctlRef.current.validateAll,
      replaceField: ctlRef.current.replaceField,
      addPlugin: ctlRef.current.pluginHandler.addPlugin
    }
  ] as const
}
