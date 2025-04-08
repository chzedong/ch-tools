import { Field, Form, onFieldValueChange } from '@formily/core'

export const syncReaction = (form: Form, targetKey: string[], reactKey: string[], callback: (state: Field, target: any[]) => void) => {
  targetKey.forEach(key => {
    onFieldValueChange(key, (field: Field) => {
      const targetValues: any[] = []

      for (let i = 0; i < targetKey.length; i++) {
        if (key === targetKey[i]) {
          targetValues.push(field.value)
        } else {
          const targetField = form.query(targetKey[i]).get('value')
          targetValues.push(targetField)
        }
      }

      for (let i = 0; i < reactKey.length; i++) {
        form.setFieldState(reactKey[i], state => callback(state as Field, targetValues))
      }
    })
  })
}
