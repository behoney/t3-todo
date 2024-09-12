  export interface Todo {
    id: string;
    text: string;
    completed: boolean;
  }

export interface TodoWithUser extends Todo {
  user: {
    name: string;
  };
}
