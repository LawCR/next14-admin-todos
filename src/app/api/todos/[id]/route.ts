import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

interface Segments {
  params: {
    id: string
  }
}

// const getTodo = async (id: string): Promise<Todo | undefined> => {
//   try {
//     const todo = await prisma.todo.findUniqueOrThrow({
//       where: { id }
//     })
//     return todo
//   } catch (error) {
//     return undefined
//   }
// }

export async function GET(request: Request, { params }: Segments ) { 

  const { id } = params
  try {
    const todo = await prisma.todo.findUniqueOrThrow({
      where: { id }
    })
    return NextResponse.json({ message: 'Todo found', todo })
  } catch (error) {
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 })
  }
}

const putSchema = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  completed: yup.boolean().optional(),
})

export async function PUT(req: Request, { params }: Segments) {
  const { id } = params
  try {
    await prisma.todo.findUniqueOrThrow({ where: { id } })

    const { title, description, completed } = await putSchema.validate(await req.json());


    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { title, description, completed }
    })

    return NextResponse.json({ message: 'Todo Updated', todo: updatedTodo })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 404 })
  }
}

export async function DELETE(req: Request, { params }: Segments) {

  const { id } = params

  try {
    await prisma.todo.findUniqueOrThrow({ where: { id } })

    const deletedTodo = await prisma.todo.delete({ where: { id } })

    return NextResponse.json({ message: 'Todo Deleted', todo: deletedTodo })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 404 })
  }
}