"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTodoAction } from "@/serverActions";
import { ServerFeedback } from "@/types";

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
    >
      {isPending ? "Adding..." : "Add"}
    </Button>
  );
}

export default function TodoInputForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: ServerFeedback, formData: FormData) => {
      return await addTodoAction(formData);
    },
    {
      type: "",
      message: "",
    }
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="task"
            className="block text-sm font-medium text-gray-700"
          >
            Add a new todo
          </label>
          <Input
            type="text"
            id="task"
            name="task"
            placeholder="Enter your todo"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL (optional)
          </label>
          <Input
            type="url"
            id="image"
            name="image"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex justify-end">
          <SubmitButton isPending={isPending} />
        </div>

        {state.message && (
          <div
            className={`mt-2 p-2 rounded ${
              state.type === "error"
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
