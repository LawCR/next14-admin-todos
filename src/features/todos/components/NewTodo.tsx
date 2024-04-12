"use client"

import { IoTrashOutline } from "react-icons/io5";
import * as todosApi from '../helpers/todos'
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { onAddTodo, onDeleteTodosCompleted } from "../actions/todo-actions";

interface Props {
  userId?: string
}

export const NewTodo = ({ userId }: Props) => { 

  const [title, setTitle] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const isServerPath = pathname.includes('server-todos')

  const deleteTodosCompleted = async() => {
    if (isServerPath) {
      const message = await onDeleteTodosCompleted()
      toast.success(message)
      return
    } else {
      await todosApi.deleteTodos()
      router.refresh()
      toast.success(`Tarea completadas eliminadas`)
    }
  }

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim().length === 0) return

    if (isServerPath) {
      const todo = await onAddTodo(title, `Quiero poder ${title.toLowerCase()}`)
      if (typeof todo !== 'string') {
        toast.success(`Tarea SA "${todo.title}" creada`)
      } else {
        toast.error(todo)
      }
    } else {
      const { todo } = await todosApi.createTodo(title, userId!)
      setTitle('')
      router.refresh()
      toast.success(`Tarea "${todo.title}" creada`)
    }
  }

  return (
    <form className='flex w-full' onSubmit={onSubmit}>
      <input 
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" 
        value={title}
        onChange={ e => setTitle(e.target.value) }
      />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>
      
      <span className='flex flex-1'></span>

      <button 
        onClick={ deleteTodosCompleted }
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all gap-2">
        <IoTrashOutline />
        Borrar Completados
      </button>
    </form>
  )
}