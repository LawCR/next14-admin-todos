import { getUserSessionServer } from '@/features/auth/actions/auth-actions'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request) { 

  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit') || '10')
  const skip = Number(searchParams.get('skip') || '0')

  if (isNaN(limit)) {
    return NextResponse.json({ message: 'Invalid limit, must be a number' }, { status: 400 })
  }
  
  if (isNaN(skip)) {
    return NextResponse.json({ message: 'Invalid skip, must be a number' }, { status: 400 })
  }
  
  const todos = await prisma.todo.findMany({
    take: limit,
    skip,
  })

  return NextResponse.json({ message: 'List of todos', todos })
}

const postSchema = yup.object({
  title: yup.string().required(),
  userId: yup.string().required(),
  description: yup.string().optional().default(''),
  completed: yup.boolean().optional().default(false),
})

export async function POST(req: Request) {
  // const user = await getUserSessionServer()
  // console.log(user)
  try {
    
    const { title, description, completed, userId } = await postSchema.validate(await req.json());
    console.log(userId)
    if (!userId) {
      return NextResponse.json({ message: 'No Autorizadooo' }, { status: 401 })
    }
    
    // Validar que no exista un todo con el mismo title
    const todoExists = await prisma.todo.findFirst({ where: { title } })
    if (todoExists) {
      return NextResponse.json({ message: `Todo with title '${title}' already exists` }, { status: 400 })
    }

    const todo = await prisma.todo.create({ data: { title, description, completed, userId }  })

    return NextResponse.json({ 
      message: 'Todo created',
      todo 
    }, { status: 201 });
  } catch (error) {
    // return NextResponse.json({ message: error }, { status: 400 })
    console.log(error)
    return NextResponse.json(error, { status: 400 })
  }
}

export async function DELETE(req: Request) {

  try {
    await prisma.todo.deleteMany({where: {
      completed: true
    }})

    return NextResponse.json({ message: 'Completed todos deleted' })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 404 })
  }
}