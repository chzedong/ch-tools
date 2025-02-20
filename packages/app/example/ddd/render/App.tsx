import React, { useEffect } from 'react'
import { List } from './List'
import { CurrentTodo } from './ListItem'
import { getTodoEntity, TodoProvider } from '../dataCenter/todo/provider'

export const App = () => {
  const [curTodoId, setCurTodoId] = React.useState(-1)

  useEffect(() => {
    setCurTodoId(1)
  }, [])

  return (
    <div>
      <div>
        tabs:
        <ul>
          <li onClick={() => setCurTodoId(1)}>todo1</li>
          <li onClick={() => setCurTodoId(2)}>todo2</li>
          <li onClick={() => setCurTodoId(3)}>todo3</li>
        </ul>
      </div>
      {curTodoId !== -1 && (
        <TodoProvider todoEntity={getTodoEntity(curTodoId)}>
          <div>
            ========
            <CurrentTodo />
            ========
            <List />
          </div>
        </TodoProvider>
      )}
    </div>
  )
}
