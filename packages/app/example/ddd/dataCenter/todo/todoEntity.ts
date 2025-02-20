import { createTodo, TodoRepo } from './todoRepo'
import { Entity } from '../type'

// DDD 领域实体, 业务逻辑domain, 事件驱动的数据中心
export class TodoEntity extends Entity {
  private repo = new TodoRepo() // 数据访问层, 用于数据的增删改查, 专注于数据的操作，不关心业务逻辑

  async prepare() {
    await this.repo.fetchTodoList()
    this.emit('change') // 事件驱动
  }

  async addTodo(title) {
    // await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(null)
    //   }, 1000)
    // })

    this.repo.add(createTodo(title))
    this.emit('change')
  }

  async removeTodo(todo) {
    this.repo.remove(todo.id)
    // await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(null)
    //   }, 1000)
    // })
    this.emit('change')
  }

  toggleTodo(todo) {
    this.repo.save(todo.id, data => {
      data.completed = !data.completed
    })
    this.emit('change')
  }

  addTag(id: number, tag) {
    this.repo.save(id, data => {
      data.tags.push(tag)
    })
    this.emit('change')
  }

  // 获取数据
  getTodo(id: string | number) {
    return this.repo.get(id)
  }

  get length() {
    return this.repo.get('todoIds')?.ids.length || 0
  }

  get todoIds() {
    return (this.repo.get('todoIds')?.ids || []) as number[]
  }
}

export const createTodoEntity = () => {
  return new TodoEntity()
}
