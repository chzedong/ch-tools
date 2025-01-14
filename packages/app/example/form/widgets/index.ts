import { Input, InputNumber } from 'antd'
import ComputedPlugin from './Computed'

export const InputPlugin = {
  name: 'name',
  component: Input,
  apply() {
    console.log('apply input plugin')
  }
}

export const InputNumberPlugin = {
  name: 'age',
  component: InputNumber,
  apply() {
    console.log('apply inputNumber plugin')
  }
}

export { ComputedPlugin }
