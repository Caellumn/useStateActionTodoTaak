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
  _id: string;
  task: string;
  checked: boolean;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ServerFeedback {
  type: string;
  message: string;
}
