/* eslint-disable @typescript-eslint/no-unsafe-function-type */

// 事件总线
class EventEmit {
  private _eventMap: { [key: string]: Function[] } = {}

  on(eventName: string, fn: Function) {
    if (!this._eventMap[eventName]) {
      this._eventMap[eventName] = []
    }
    this._eventMap[eventName].push(fn)
  }

  off(eventName: string, fn: Function) {
    if (!this._eventMap[eventName]) {
      return
    }
    this._eventMap[eventName] = this._eventMap[eventName].filter(f => f !== fn)
  }

  emit(eventName: string, ...args: any[]) {
    if (!this._eventMap[eventName]) {
      return
    }
    this._eventMap[eventName].forEach(fn => fn(...args))
  }
}

export default EventEmit
