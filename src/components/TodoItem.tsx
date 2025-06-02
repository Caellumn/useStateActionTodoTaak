"use client";

import { Check, Trash, Square, ChevronDown, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toggleTodoAction, removeTodoAction } from "@/serverActions";
import { Todo } from "@/types";
import { useState } from "react";
import TodoImage from "./Image";

interface TodoItemProps {
  todo: Todo;
}

function isValidUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = async () => {
    try {
      await toggleTodoAction(todo._id); // Changed from todo.id
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeTodoAction(todo._id); // Changed from todo.id
    } catch (error) {
      console.error(error);
    }
  };

  //OLD SQL
  // const handleToggle = async () => {
  //   try {
  //     await toggleTodoAction(todo.id);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleRemove = async () => {
  //   try {
  //     await removeTodoAction(todo.id);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Accordion
        type="single"
        collapsible
        value={isOpen ? "todo-details" : ""}
        onValueChange={(value) => setIsOpen(!!value)}
      >
        <AccordionItem value="todo-details" className="border-none">
          <div className="flex items-center gap-3 p-3">
            <Button
              className="flex-shrink-0 p-1 hover:bg-gray-100 rounded"
              onClick={handleToggle}
              variant="ghost"
              size="sm"
            >
              {todo.checked ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Square className="w-5 h-5 text-gray-400" />
              )}
            </Button>
            <AccordionTrigger className="flex-1 text-left py-0 hover:no-underline [&>svg]:hidden">
              <span
                className={`${
                  todo.checked ? "line-through text-gray-500" : "text-gray-900"
                }`}
              >
                {todo.task}
              </span>
            </AccordionTrigger>
            <div className="flex items-center gap-2 ml-auto">
              <Button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                size="sm"
              >
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
              <Button
                className="flex-shrink-0 p-1 hover:bg-red-50 rounded text-red-500 hover:text-red-700"
                onClick={handleRemove}
                variant="ghost"
                size="sm"
              >
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <AccordionContent className="px-3 pb-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              {isValidUrl(todo.image) ? (
                <TodoImage
                  src={todo.image!}
                  alt={`Image for ${todo.task}`}
                  width={300}
                  height={200}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <ImageOff className="w-12 h-12 mb-2" />
                  <p className="text-sm">No picture available</p>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
