import React from 'react'
import { List } from './List'
import { CurrentTodo } from './ListItem'
import { TodoProvider } from '../dataCenter/provider'

export const App = () => {
  return (
    <TodoProvider>
      <div>
        ========
        <CurrentTodo />
        ========
        <List />
      </div>
    </TodoProvider>
  )
}
