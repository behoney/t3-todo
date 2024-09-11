

import { type Todo } from "@prisma/client";

// TODO:: move TodoWithUser to proper location
export interface TodoWithUser extends Todo {
  user: {
    name: string;
  };
}


export default function OurTodoList({
  initialTodos
}: {
  initialTodos: TodoWithUser[]
}) {
  // TODO:: refresh every 10 seconds or whenever the todo is updated

  // const [todos, setTodos] = useState<TodoWithUser[]>(initialTodos);

  // const updateTodos = async () => {
  //   try {
  //     const todos = await api.todo.getWhole();
  //     setTodos(todos as TodoWithUser[])
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   void updateTodos();
  //   setInterval(() => {
  //     void updateTodos();
  //   }, 10000)
  // }, [])

  return (

    <div className="flex flex-col gap-4 rounded-md bg-white p-4 w-full">
      {initialTodos.map((todo) => {
        return (

          <div
            key={todo.id}
            className="rounded-md bg-gray-100 px-4 py-2 text-black w-full"
          >
            <p className="text-lg font-bold">{todo.text}</p>
            <desc className="text-sm w-full text-right text-gray-500">{`By ${todo.user.name} @ ${todo.createdAt.toLocaleDateString()}`}</desc>
          </div>
        );
      })}
    </div>
  )
}
