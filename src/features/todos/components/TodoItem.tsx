"use client"
import { startTransition, useOptimistic } from 'react'
import { Todo } from '@prisma/client'
import React from 'react'
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline, IoTrashOutline } from 'react-icons/io5'

interface Props {
  todo: Todo,
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>
  deleteTodo: (id: string) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo, deleteTodo }: Props) => {

  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      completed: newCompleteValue
    })
  )

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed))
      await toggleTodo(todoOptimistic.id, !todoOptimistic.completed)
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed))
    }
  }

  return (
    <div className={todoOptimistic.completed ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4 w-full'>
        <div 
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${todoOptimistic.completed ? 'bg-blue-100' : 'bg-red-100'}`}
          // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.completed)}
          onClick={onToggleTodo}
        >
          {
            todoOptimistic.completed
            ? <IoCheckboxOutline size={28}  />
            : <IoSquareOutline size={28} />
          }
        </div>
        <div className='text-center sm:text-left flex-grow line-clamp-3'>
          <h2 className={`font-m ${todoOptimistic.completed ? 'line-through' : ''}`}>
            { todoOptimistic.title }
          </h2>
          <h4 className='text-sm text-gray-400 font-light '>
            { todoOptimistic.description }
          </h4>
        </div>
        <button 
          onClick={ () => deleteTodo(todoOptimistic.id) }
          type='button' className="flex items-center justify-center rounded ml-1 bg-red-400 p-[6px] text-white hover:bg-red-700 transition-all">
          <IoTrashOutline 
          />
        </button>
      </div>
    </div>
  )
}
