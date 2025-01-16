import React from 'react'
import { useTodoStore } from '../dataCenter/store'

let index = 0

export const List = () => {
  const [todos = [], todoList] = useTodoStore(todos => todos)

  return (
    <div>
      {todos.map(item => {
        return (
          <div key={item.id} onClick={() => todoList.toggleTodo(item)}>
            {item.title} {item.completed ? '1111' : '0000'}
          </div>
        )
      })}
      <button onClick={() => todoList.addTodo('test' + index++)}>add</button>
    </div>
  )
}
