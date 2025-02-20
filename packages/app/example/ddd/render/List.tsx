import React, { memo, useEffect } from 'react'
import { useTodoStore } from '../dataCenter/todo/store'
import { TodoEntity } from '../dataCenter/todo/todoEntity'
import { todoTagsSelector } from '../dataCenter/todo/selector'

let index = 0

export const ListItem = memo(({ id }: { id: number }) => {
  const [item, todoList] = useTodoStore(todoList => todoList.getTodo(id))

  return (
    <div onClick={() => todoList.toggleTodo(item)}>
      {item?.title} {item?.completed ? '1111' : '0000'}
      <ListItemTag id={item.id as number} />
    </div>
  )
})

export const ListItemTag = memo(({ id }: { id: number }) => {
  const [tags, todoList] = useTodoStore(todoList => todoTagsSelector(todoList.getTodo(id)))

  console.log('render tag', tags)
  return (
    <>
      <span> | {tags.map(item => item)} </span>
      <button onClick={() => todoList.addTag(id, 'tag' + index++)}>add tag</button>
    </>
  )
})

export const List = () => {
  const [len, todoList] = useTodoStore((todoList: TodoEntity) => todoList.todoIds.length)

  useEffect(() => {
    todoList.prepare()
  }, [todoList])

  return (
    <div>
      {todoList.todoIds.slice(-50).map(item => {
        return <ListItem id={item} key={item} />
      })}
      <button onClick={() => todoList.addTodo('test' + index++)}>add</button>
    </div>
  )
}
