import React from 'react'
import { useTodoStore } from '../dataCenter/todo/store'

export const CurrentTodo = () => {
  const [id, todoEntity] = useTodoStore(todoList => todoList.todoIds[0])

  console.log('render current todo', todoEntity)

  if (!id) {
    return null
  }

  const item = todoEntity.getTodo(id)

  console.log('render current todo', item, id)
  return (
    <div>
      {item.title} : {item.completed ? 'completed' : 'no completed'}
    </div>
  )
}
