interface TaskType<T = any> {
  run: () => Promise<T>
}

const _tasks: Map<string, TaskType> = new Map()

export const scheduleTask = <T>(name: string, pro: Promise<T>) => {
  if (_tasks.has(name)) {
    _tasks.delete(name)
  }

  const task = {
    run: () => {
      return pro.then((res) => {
        const mapTask = _tasks.get(name);
        if (!_tasks.has(name) || mapTask !== task) {
          return Promise.reject(`task canceled: ${name} value: ${JSON.stringify(res)}`)
        } else {
          // _tasks.delete(name)

          return Promise.resolve(res)
        }
      })
    }
  }

  _tasks.set(name, task)

  return _tasks.get(name)!
}
