import { Data, DataCenterRepo } from '../repo'
import { Todo } from './type'

export const createTodo = title => {
  return {
    id: Math.random(),
    title,
    completed: false,
    tags: ['test']
  }
}

export const createLongTodo = () => {
  return new Array(100).fill(0).map((_, index) => {
    return createTodo('test' + index)
  })
}

export class TodoRepo extends DataCenterRepo {
  constructor() {
    super()
    super.add({
      id: 'todoIds',
      ids: []
    })
  }

  private isFetching = false

  fetchTodoList() {
    // 访问层封装获取数据细则
    if (this.isFetching) {
      return
    }

    this.isFetching = true
    const pro = new Promise<Todo[]>(resolve => {
      setTimeout(() => {
        resolve(createLongTodo())
      }, 1000)
    })

    return pro
      .then(todos => {
        const ids: number[] = []
        todos.forEach(todo => {
          this.add(todo)
          ids.push(todo.id)
        })
      })
      .finally(() => {
        this.isFetching = false
      })
  }

  add(data: Data) {
    super.add(data)
    this.saveBig('todoIds', o => {
      o.ids.push(data.id)
    })
  }

  remove(id: string | number) {
    super.remove(id)
    this.saveBig('todoIds', data => {
      data.ids = data.ids.filter(id => id !== id)
    })
  }
}
