import { Input, InputNumber, Select } from 'antd'
import { Plugin } from './type'
import { Field } from '@formily/core'

export class InputPlugin implements Plugin {
  type = 'input'

  component = Input

  validator = {
    triggerType: 'onBlur',
    validator: value => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!value || value === '123') {
            resolve('')
          } else {
            reject('错误❎')
          }
        }, 1000)
      })
    }
  }

  reactions = []
}

export class InputNumberPlugin implements Plugin {
  type = 'inputNumber'

  component = InputNumber

  validator = null;

  reactions = []
}

export class SelectPlugin implements Plugin {
  type = 'select'

  component = Select

  validator = null

  reactions = []
}


export class FormatPlugin implements Plugin {
  type = 'format'

  component = Input

  validator = null

  reactions = (state: Field, origin: any[]) => {
    setTimeout(() => {
      state.value = `格式是${origin?.join('||') || ''}`
    }, 1000)
  }
}
