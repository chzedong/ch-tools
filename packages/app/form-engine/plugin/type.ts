import { FieldValidator } from '@formily/core'

export interface Plugin {
  type: string
  component: any
  validator: FieldValidator | any
  reactions: any
}
