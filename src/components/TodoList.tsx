import { getAllTodos } from "@/queries";
import TodoItem from "./TodoItem";

const TodoList = async () => {
  const todos = await getAllTodos();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  );
};
export default TodoList;
