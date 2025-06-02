import { RowDataPacket } from "mysql2";

export interface Id extends RowDataPacket {
  id: number;
}

//old sql
// export interface Todo extends Id {
//   task: string;
//   checked: number;
//   image: string;
// }

export interface ServerFeedback {
  type: string;
  message: string;
}

export interface Todo {
  _id: string; // Changed from id: number
  task: string;
  checked: boolean; // Changed from number
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ServerFeedback {
  type: string;
  message: string;
}
