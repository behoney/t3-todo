"use client"

import { api } from "@/trpc/react";
import type { TodoWithUser } from "../_types/todo";

export default function OurTodoList({
  initialTodos,
}: {
  initialTodos: readonly TodoWithUser[];
}) {
  const todoQuery = api.todo.getWhole.useQuery();
  const todos = todoQuery.data ?? initialTodos;

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-md bg-white p-4">
      {todos.map((todo) => {
        return (
          <div
            key={todo.id}
            className={`w-full rounded-md bg-gray-100 px-4 py-2 text-black ${todoQuery.isRefetching ? "bg-gray-200" : ""}`}
          >
            <p className="text-lg font-bold">{todo.text}</p>
            <desc className="w-full text-right text-sm text-gray-500">{`By ${todo.user.name} @ ${todo.createdAt.toLocaleDateString()}`}</desc>
          </div>
        );
      })}
    </div>
  );
}
