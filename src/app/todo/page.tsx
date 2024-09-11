import { TodoList } from "@/app/_components/TodoList";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { type Todo } from "@prisma/client";

export default async function TodoPage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl text-white">Please sign in to view your todos.</p>
      </div>
    );
  }

  let todos: Todo[] = [];
  try {
    todos = await api.todo.getAll();
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight">Todo List</h1>
        <TodoList initialTodos={todos} />
      </div>
    </main>
  );
}