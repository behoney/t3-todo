import { api } from "@/trpc/server";
import OurTodoList, { type TodoWithUser } from "../_components/OurTodoList";


export default async function OtherPage() {

  const initialTodos = await api.todo.getWhole() as TodoWithUser[];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">{"Our Todo"}</h1>
      <OurTodoList initialTodos={initialTodos} />
    </div>
  );
}