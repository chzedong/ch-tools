import { TodoEntity } from './todoEntity'
import { useStore } from '../store'
import { TodoContext } from './provider'

// 接入层，将领域实体映射到组件，实现数据的响应式，数据变化时自动更新组件
export const useTodoStore = <T>(mapFunction: (store: TodoEntity) => T) => {
  const [state, todoList] = useStore(TodoContext, mapFunction)

  return [state, todoList] as const
}
