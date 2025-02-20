import React from 'react'
import { EntityId } from '../type'
import { createTodoEntity, TodoEntity } from './todoEntity'

export const TodoContext = React.createContext<TodoEntity | null>(null)

export const TodoProvider: React.FC<{ children: React.ReactNode; todoEntity: TodoEntity }> = props => {
  const { children, todoEntity } = props

  return <TodoContext.Provider value={todoEntity}>{children}</TodoContext.Provider>
}

const entityMap = new Map<EntityId, TodoEntity>()

export const getTodoEntity = (id: EntityId) => {
  if (!entityMap.has(id)) {
    entityMap.set(id, createTodoEntity())
  }
  return entityMap.get(id) as TodoEntity
}

window.entityMap = entityMap;
