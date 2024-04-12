// export const dynamic = 'force-dynamic';
// export const revalidate = 0;
import { getUserSessionServer } from "@/features/auth/actions/auth-actions";
import { NewTodo, TodosGrid } from "@/features/todos";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Listado de Todos - Server Actions",
  description: "Listado de todos con Server Actions"
};


export default async function ServerTodosPage() {

  const user = await getUserSessionServer()
  if (!user) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({ 
    where: { userId: user.id },
    orderBy: { title: 'asc' } 
  });
  
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Server Actions</h1>
      <div className="w-full px-3 mx-6 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}