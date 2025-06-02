"use server";

import { addTodo, removeTodo, toggleTodo } from "@/queries";
import { revalidateTag } from "next/cache";
import { ServerFeedback } from "./types";

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export async function addTodoAction(fd: FormData): Promise<ServerFeedback> {
  const task: string = fd.get("task") as string;
  const imageUrl: string = fd.get("image") as string;

  // Validate task length
  if (task.length < 3) {
    return {
      type: "error",
      message: "Task must be at least 3 characters long",
    };
  }
  if (task.length > 45) {
    return {
      type: "error",
      message: `Task must be less than 45 characters long, you entered ${task.length} characters`,
    };
  }

  // Validate image URL if provided
  if (imageUrl && !isValidUrl(imageUrl)) {
    return {
      type: "error",
      message: "Please provide a valid image URL",
    };
  }

  try {
    // Pass both task and image URL to addTodo
    await addTodo(task, imageUrl || null);
    revalidateTag("todos");
    return {
      type: "success",
      message: "Task added successfully",
    };
  } catch (error) {
    throw error;
  }
}

// Updated to use string IDs
export const removeTodoAction = async (id: string) => {
  try {
    await removeTodo(id);
    revalidateTag("todos");
  } catch (error) {
    throw error;
  }
};

// Updated to use string IDs
export const toggleTodoAction = async (id: string) => {
  try {
    await toggleTodo(id);
    revalidateTag("todos");
  } catch (error) {
    throw error;
  }
};

//keep this for reference
// export const addTodoAction = async (title: string) => {
//   try {
//     await addTodo(title);
//     revalidateTag("todos");
//   } catch (error) {
//     throw error;
//   }
// };
//end keep this for reference

//OLD SQL

// function isValidUrl(url: string): boolean {
//   try {
//     new URL(url);
//     return true;
//   } catch {
//     return false;
//   }
// }

// export async function addTodoAction(fd: FormData): Promise<ServerFeedback> {
//   const task: string = fd.get("task") as string;
//   const imageUrl: string = fd.get("image") as string;

//   // Validate task length
//   if (task.length < 3) {
//     return {
//       type: "error",
//       message: "Task must be at least 3 characters long",
//     };
//   }
//   if (task.length > 45) {
//     return {
//       type: "error",
//       message: `Task must be less than 45 characters long, you entered ${task.length} characters`,
//     };
//   }

//   // Validate image URL if provided
//   if (imageUrl && !isValidUrl(imageUrl)) {
//     return {
//       type: "error",
//       message: "Please provide a valid image URL",
//     };
//   }

//   try {
//     // Pass both task and image URL to addTodo
//     await addTodo(task, imageUrl || null);
//     revalidateTag("todos");
//     return {
//       type: "success",
//       message: "Task added successfully",
//     };
//   } catch (error) {
//     throw error;
//   }
// }

// export const removeTodoAction = async (id: number) => {
//   try {
//     await removeTodo(id);
//     revalidateTag("todos");
//   } catch (error) {
//     throw error;
//   }
// };

// export const toggleTodoAction = async (id: number) => {
//   try {
//     await toggleTodo(id);
//     revalidateTag("todos");
//   } catch (error) {
//     throw error;
//   }
// };
