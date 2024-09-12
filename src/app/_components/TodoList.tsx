"use client";

import { api } from "@/trpc/react";
import { useState } from "react";
import type { Todo } from "../_types/todo";



export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");
  // TODO:: client side pagination
  const [page, setPage] = useState(1);

  const addTodoMutation = api.todo.create.useMutation({
    onSuccess: (newTodo) => {
      setTodos((prev) => [...prev, newTodo]);
      setNewTodoText("");
    },
  });

  const toggleTodoMutation = api.todo.toggle.useMutation({
    onSuccess: (updatedTodo) => {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    },
  });

  const deleteTodoMutation = api.todo.delete.useMutation({
    onSuccess: (deletedTodoId) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== deletedTodoId));
    },
  });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodoMutation.mutate({ text: newTodoText });
    }
  };

  const validateTodoText = newTodoText.trim().length > 4;


  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
          className="w-full p-2 text-black rounded"
          required
          disabled={addTodoMutation.isPending}
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={addTodoMutation.isPending || !validateTodoText}
        >
          Add Todo
        </button>
      </form>
      <ul>
        {todos.slice(0, page * 10).map((todo) => (
          <li key={todo.id} className="flex items-center justify-between mb-2">
            <span
              className={`flex-grow ${todo.completed ? "line-through text-gray-500" : ""}`}
            >
              {todo.text}
            </span>
            <button
              disabled={toggleTodoMutation.isPending}
              onClick={() => toggleTodoMutation.mutate({ id: todo.id })}
              className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Toggle
            </button>
            <button
              disabled={deleteTodoMutation.isPending}
              onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
              className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage(Math.max(1, Math.min(page + 1, Math.ceil(todos.length / 10))))}
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page * 10 >= todos.length}
          type="button"
        >
          load more
        </button>
      </div>
    </div>
  );
}