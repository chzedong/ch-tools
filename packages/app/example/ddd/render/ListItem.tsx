import React from 'react'
import { useTodoStore } from '../dataCenter/store'

export const CurrentTodo = () => {
  const [item] = useTodoStore(todos => todos[0])

  console.log('render current todo')

  if (!item) {
    return null
  }

  return (
    <div>
      {item.title} : {item.completed ? 'completed' : 'no completed'}
    </div>
  )
}
