"use client"
import { Todo } from '@prisma/client'
import React from 'react'
import { TodoItem } from './TodoItem'
import * as todosApi from '../helpers/todos'
import { usePathname, useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { onDeleteTodoById, onToggleTodo } from '../actions/todo-actions'


interface Props {
  todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {

  const router = useRouter()
  const pathname = usePathname()
  const isServerPath = pathname.includes('server-todos')

  const toggleTodo = async(id: string, completed: boolean) => {
    if (isServerPath) {
      const todo = await onToggleTodo(id, completed)
      if (typeof todo !== 'string') {
        toast.success(`Tarea SA "${todo.title}" ${todo.completed ? 'completada' : 'pendiente'}`)
      } else {
        toast.error(todo)
      }
    } else {
      const { todo } = await todosApi.updateTodo(id, completed)
      router.refresh()
      toast.success(`Tarea "${todo.title}" ${todo.completed ? 'completada' : 'pendiente'}`)
    }
  }

  const deleteTodo = async(id: string) => {
    if (isServerPath) {
      const todo = await onDeleteTodoById(id)
      if (typeof todo !== 'string') {
        toast.success(`Tarea SA "${todo.title}" eliminada`)
      } else {
        toast.error(todo)
      }
    } else {
      const { todo } = await todosApi.deleteTodo(id)
      router.refresh()
      toast.success(`Tarea "${todo.title}" eliminada`)
    }
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
      <Toaster />
      {
        todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo} 
          />
        ))
      }
    </div>
  )
}
