import { useContext, useEffect, useRef, useState } from 'react'
import { Todo, TodoContext } from './todo'

export const useTodoStore = <T>(mapFunction: (store: Todo[]) => T) => {
  const todoList = useContext(TodoContext)
  const preRef = useRef<T>(mapFunction(todoList.todos))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setState] = useState<any>(0)
  const update = () => setState(pre => pre + 1)

  useEffect(() => {
    const handleChange = () => {
      const newState = mapFunction(todoList.todos)

      // 性能优化手段 减少不必要的更新
      if (preRef.current !== newState) {
        preRef.current = newState
        update()
      }
    }

    todoList.on('change', handleChange)
    return () => {
      todoList.off('change', handleChange)
    }
  }, [todoList])

  return [preRef.current, todoList] as const
}
