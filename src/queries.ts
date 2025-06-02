import { connect } from "@/dbconnect";
import { unstable_cache } from "next/cache";
import { Todo } from "@/types";
import TodoModel from "@/models/Todo";

export const getAllTodos = unstable_cache(
  async (): Promise<Todo[]> => {
    try {
      await connect();
      const todos = await TodoModel.find({}).sort({ createdAt: -1 }).lean();

      //ignore the any type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return todos.map((todo: any) => ({
        _id: todo._id.toString(),
        task: todo.task,
        checked: todo.checked,
        image: todo.image,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      }));
    } catch (error) {
      throw error;
    }
  },
  ["todos"],
  { tags: ["todos"] }
);

export const addTodo = async (
  task: string,
  imageUrl: string | null = null
): Promise<void> => {
  try {
    await connect();
    await TodoModel.create({
      task,
      checked: false,
      image: imageUrl,
    });
  } catch (error) {
    throw error;
  }
};

export const removeTodo = async (id: string): Promise<void> => {
  try {
    await connect();
    await TodoModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export const toggleTodo = async (id: string): Promise<void> => {
  try {
    await connect();
    const todo = await TodoModel.findById(id);
    if (todo) {
      todo.checked = !todo.checked;
      await todo.save();
    }
  } catch (error) {
    throw error;
  }
};

// OLD SQL
// export const getAllTodos = unstable_cache(
//   async (): Promise<Todo[]> => {
//     try {
//       const conn = await connect();
//       const [rows] = await conn.query<Todo[]>("SELECT * FROM todo");
//       return rows;
//     } catch (error) {
//       throw error;
//     }
//   },
//   ["todos"],
//   { tags: ["todos"] }
// );

// export const addTodo = async (
//   task: string,
//   imageUrl: string | null = null
// ): Promise<void> => {
//   try {
//     const conn = await connect();
//     await conn.query(
//       "INSERT INTO todo (task, checked, image) VALUES (?, 0, ?)",
//       [task, imageUrl]
//     );
//   } catch (error) {
//     throw error;
//   }
// };

// export const removeTodo = async (id: number): Promise<void> => {
//   try {
//     const conn = await connect();
//     await conn.query("DELETE FROM todo WHERE id = ?", [id]);
//   } catch (error) {
//     throw error;
//   }
// };

// export const toggleTodo = async (id: number): Promise<void> => {
//   try {
//     const conn = await connect();
//     await conn.query(
//       "UPDATE todo SET checked = CASE WHEN checked = 1 THEN 0 ELSE 1 END WHERE id = ?",
//       [id]
//     );
//   } catch (error) {
//     throw error;
//   }
// };
