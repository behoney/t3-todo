import type { Todo as PrismaTodo } from "@prisma/client";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoWithUser extends PrismaTodo {
  user: {
    name: string;
  };
}
