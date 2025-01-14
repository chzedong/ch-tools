import { FormController } from './controller'

interface TaskType<T = any> {
  run: () => Promise<T>
}

export class Scheduler {
  constructor(private ctl: FormController) {}

  _tasks: Map<string, TaskType> = new Map()

  createTask = <T>(name: string, pro: Promise<T>) => {
    if (this._tasks.has(name)) {
      this._tasks.delete(name)
    }

    const task = {
      run: () => {
        return pro.then(res => {
          const mapTask = this._tasks.get(name)
          if (!this._tasks.has(name) || mapTask !== task) {
            return Promise.reject(`task canceled: ${name} value: ${JSON.stringify(res)}`)
          } else {
            return Promise.resolve(res)
          }
        })
      }
    }

    this._tasks.set(name, task)

    return this._tasks.get(name)!
  }

}
