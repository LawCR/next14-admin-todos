"use server"

import { getUserSessionServer } from "@/features/auth/actions/auth-actions"
import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const sleep = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000)) 

export const onToggleTodo = async (id: string, completed: boolean): Promise<Todo | string> => {
  // await sleep(3)
  const user = await getUserSessionServer()
  
  if (!user) {
    return "No Autorizado"
  }

  try {
    await prisma.todo.findUniqueOrThrow({ where: { id } })
    const todo = await prisma.todo.update({ 
      where: { id, userId: user.id }, 
      data: { completed } 
    })

    // throw new Error('Failed to update todo')

    revalidatePath('/dashboard/server-todos')

    return todo
  } catch (error: any) {
    // console.log(error?.message || 'Error al actualizar la tarea (Default)')
    return error?.message || 'Error al actualizar la tarea (Default)'
  }
}

export const onAddTodo = async (title: string, description: string = ''): Promise<Todo | string> => {
  const user = await getUserSessionServer()
  
  if (!user) {
    return "No Autorizadooo"
  }
  try {
    const todoExists = await prisma.todo.findFirst({ where: { title } })
    if (todoExists) {
      return `Todo with title '${title}' already exists`
    }

    const todo = await prisma.todo.create({ data: { title, description, userId: user?.id }  })
    revalidatePath('/dashboard/server-todos')
    return todo
  } catch (error: any) {
    return error?.message || 'Error al crear la tarea (Default)'
  }
}

export const onDeleteTodosCompleted = async (): Promise<string> => {
  const user = await getUserSessionServer()
  
  if (!user) {
    return "No Autorizado"
  }

  try {
    await prisma.todo.deleteMany({ where: { completed: true, userId: user.id } })
    revalidatePath('/dashboard/server-todos')
    return 'Tareas completadas eliminadas'
  } catch (error: any) {
    return error?.message || 'Error al eliminar las tareas completadas (Default)'
  }
}


export const onDeleteTodoById = async (id: string): Promise<Todo | string> => {
  
  const user = await getUserSessionServer()
  
  if (!user) {
    return "No Autorizado"
  }

  try {
    const todo = await prisma.todo.delete({ where: { id, userId: user.id } })
    revalidatePath('/dashboard/server-todos')
    return todo
  } catch (error: any) {
    return error?.message || 'Error al eliminar la tarea (Default)'
  }
}