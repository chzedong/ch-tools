import { TodoContext, todoList } from './todo'
import React from 'react'

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  window.todoList = todoList

  return <TodoContext.Provider value={todoList}>{children}</TodoContext.Provider>
}
