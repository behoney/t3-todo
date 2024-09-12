"use client"

import { api } from "@/trpc/react";
import { useEffect } from "react";
import type { TodoWithUser } from "../_types/todo";


export default function OurTodoList({
  initialTodos
}: {
    initialTodos: readonly TodoWithUser[]
}) {
  const todoQuery = api.todo.getWhole.useQuery();
  const todos = todoQuery.data ?? initialTodos;

  useEffect(() => {
    const interval = setInterval(() => {
      void todoQuery.refetch();
    }, 15000);
    return () => clearInterval(interval);
  }, [])

  return (

    <div className="flex flex-col gap-4 rounded-md bg-white p-4 w-full max-w-md">
      {todos.map((todo) => {
        return (

          <div
            key={todo.id}
            className={`rounded-md bg-gray-100 px-4 py-2 text-black w-full
        ${todoQuery.isRefetching ? "bg-gray-200" : ""}`}
          >
            <p className="text-lg font-bold">{todo.text}</p>
            <desc className="text-sm w-full text-right text-gray-500">{`By ${todo.user.name} @ ${todo.createdAt.toLocaleDateString()}`}</desc>
          </div>
        );
      })}
    </div>
  )
}
