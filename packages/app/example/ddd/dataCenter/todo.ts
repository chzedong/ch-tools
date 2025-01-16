import { createContext } from 'react'
import { produce } from 'immer'
import EventEmit from 'ch-tools-event'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

const createTodo = title => {
  return {
    id: Math.random(),
    title,
    completed: false
  }
}

// 业务模型事件化，支持on change 事件, 同时统一数据修改规范，使用immer 框架，确保数据按照不可变数据规范进行修改
class TodoList extends EventEmit {
  todos: Todo[] = []

  changTodo(cb) {
    const ret = produce(this.todos, cb)

    this.todos = ret
    this.emit('change')
  }

  addTodo(title) {
    this.changTodo(todos => {
      todos.push(createTodo(title))
    })
  }

  removeTodo(todo) {
    this.changTodo(todos => {
      todos.splice(this.todos.indexOf(todo), 1)
    })
  }

  toggleTodo(todo) {
    this.changTodo(todos => {
      const index = todos.findIndex(item => item.id === todo.id)
      todos[index].completed = !todos[index].completed
    })
  }
}

export const todoList = new TodoList()
export const TodoContext = createContext<TodoList>(todoList)
