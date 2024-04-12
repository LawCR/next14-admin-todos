import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

  await prisma.todo.deleteMany({}) // Delete all todos
  await prisma.user.deleteMany({}) // Delete all users

  const user = await prisma.user.create({
    data: {
      email: 'alvaro@gmail.com',
      name: 'Alvaro',
      password: bcrypt.hashSync('123456'),
      roles: ['admin', 'client'],
      todos: {
        create: [
          { title: 'Aprender Javascript', completed: true },
          { title: 'Aprender React', completed: true },
          { title: 'Aprender Typescript' },
          { title: 'Aprender Next.js 14' },
        ]
      },
    }
  })

  // await prisma.todo.createMany({
  //   data: [
  //     { title: 'Aprender Javascript', completed: true },
  //     { title: 'Aprender React', completed: true },
  //     { title: 'Aprender Typescript' },
  //     { title: 'Aprender Next.js 14' },
  //   ],
  // })

  return NextResponse.json({ message: 'Seed executed' })
}