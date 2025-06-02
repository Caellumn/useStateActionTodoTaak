import { RowDataPacket } from "mysql2";

export interface Id extends RowDataPacket {
  id: number;
}
export interface Todo extends Id {
  task: string;
  checked: number;
  image: string;
}

export interface ServerFeedback {
  type: string;
  message: string;
}
