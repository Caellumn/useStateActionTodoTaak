import { connect } from "@/dbconnect";
import { unstable_cache } from "next/cache";
import { Todo } from "@/types";

export const getAllTodos = unstable_cache(
  async (): Promise<Todo[]> => {
    try {
      const conn = await connect();
      const [rows] = await conn.query<Todo[]>("SELECT * FROM todo");
      return rows;
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
    const conn = await connect();
    await conn.query(
      "INSERT INTO todo (task, checked, image) VALUES (?, 0, ?)",
      [task, imageUrl]
    );
  } catch (error) {
    throw error;
  }
};

export const removeTodo = async (id: number): Promise<void> => {
  try {
    const conn = await connect();
    await conn.query("DELETE FROM todo WHERE id = ?", [id]);
  } catch (error) {
    throw error;
  }
};

export const toggleTodo = async (id: number): Promise<void> => {
  try {
    const conn = await connect();
    await conn.query(
      "UPDATE todo SET checked = CASE WHEN checked = 1 THEN 0 ELSE 1 END WHERE id = ?",
      [id]
    );
  } catch (error) {
    throw error;
  }
};
