import TodoList from "@/components/TodoList";
import TodoInputForm from "@/components/InputForm";

const page = () => {
  return (
    <div>
      <h1>Home</h1>
      <TodoInputForm />
      <TodoList />
    </div>
  );
};

export default page;
