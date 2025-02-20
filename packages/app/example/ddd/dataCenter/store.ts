import { useContext, useEffect, useRef, useState } from 'react'
import { Entity } from './type'

// 接入层，将领域实体映射到组件，实现数据的响应式，数据变化时自动更新组件
export const useStore = <S extends Entity, T>(context, mapFunction: (store: S) => T) => {

  const entity = useContext<S>(context) // 获取领域实体, 使用上下文传递实体
  const preRef = useRef<T>(mapFunction(entity)) // 缓存上一次的数据，mapFunction 为数据映射函数，缓存派生数据

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setState] = useState<any>(0)
  const update = () => setState(pre => pre + 1)

  useEffect(() => {

    const handleChange = () => {
      const newState = mapFunction(entity) // 数据映射, 获取最新的数据

      // 性能优化手段 减少不必要的更新 仅当数据发生变化时才更新组件
      if (preRef.current !== newState) {
        preRef.current = newState
        update() // 触发组件更新
      }
    }

    entity.on('change', handleChange)
    return () => {
      entity.off('change', handleChange)
    }
  }, [entity])


  const newState = mapFunction(entity);
  if(newState !== preRef.current) {
    preRef.current = newState
  }

  return [preRef.current, entity] as const
}
