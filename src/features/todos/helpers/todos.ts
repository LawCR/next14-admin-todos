"use server"
import { Todo } from "@prisma/client";

interface TodoResponse {
  message: string
  todo: Todo
}

export const updateTodo = async(id: string, completed: boolean): Promise<TodoResponse> => {
  const body = { completed }

  const response = await fetch(`${process.env.BASE_URL}/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error('Failed to update todo')
  }

  const todo = await response.json()
  return todo
}

export const createTodo = async(title: string, userId: string, description: string = ''): Promise<TodoResponse> => {
  const body = { 
    title,
    description,
    userId
   }

   console.log({body})

  const response = await fetch(`${process.env.BASE_URL}/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  // console.log(response)

  // if (!response.ok) {
  //   throw new Error('Failed to create todo')
  // }

  const todo = await response.json()
  return todo
}

export const deleteTodo = async(id: string): Promise<TodoResponse> => {

  const response = await fetch(`${process.env.BASE_URL}/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete todo')
  }

  const todo = await response.json()
  return todo
}

export const deleteTodos = async(): Promise<TodoResponse> => {

  const response = await fetch(`${process.env.BASE_URL}/api/todos`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete todo completed')
  }

  const todo = await response.json()
  return todo
}