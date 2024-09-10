"use client";

import { api } from "@/trpc/react";
import { useState } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");

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

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
          className="w-full p-2 text-black rounded"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between mb-2">
            <span
              className={`flex-grow ${todo.completed ? "line-through text-gray-500" : ""
                }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => toggleTodoMutation.mutate({ id: todo.id })}
              className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            >
              Toggle
            </button>
            <button
              onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
              className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}