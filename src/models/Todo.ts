import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  task: string;
  checked: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    task: {
      type: String,
      required: true,
      maxlength: 45,
      minlength: 3,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default mongoose.models.Todo ||
  mongoose.model<ITodo>("Todo", TodoSchema);
