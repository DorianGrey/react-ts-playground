import React, { createContext, FC, useContext, useState } from "react";
import produce from "immer";
import noop from "lodash-es/noop";

import type { TodoModel } from "../routes/todo-list/todo.model";

interface TodosContext {
  todos: readonly TodoModel[];
  addTodo: (headline: string, description: string, deadline: Date) => void;
  updateTodo: (todo: TodoModel) => void;
  deleteTodo: (id: number) => void;
}

const TodosContext = createContext<TodosContext>({
  todos: [],
  addTodo: noop,
  updateTodo: noop,
  deleteTodo: noop,
});

export const TodosProvider: FC = ({ children }) => {
  const [todos, setTodos] = useState<readonly TodoModel[]>([
    {
      id: 1,
      headline: "Test todo",
      description: "A lot of stuff to be done!",
      deadline: new Date(Date.now() + 60 * 60 * 1000),
      created: new Date(),
    },
    {
      id: 2,
      headline: "Test todo2",
      description: "A lot of stuff to be done!",
      deadline: new Date(Date.now() + 60 * 60 * 1000),
      created: new Date(),
    },
  ]);

  const addTodo = (headline: string, description: string, deadline: Date) => {
    const newTodo = {
      id: Math.random() * 1000,
      created: new Date(),
      headline,
      description,
      deadline,
    };
    setTodos(
      produce(todos, (draft) => {
        draft.push(newTodo);
      })
    );
  };

  const updateTodo = (todo: TodoModel) => {
    const oldIndex = todos.findIndex((e) => e.id === todo.id);
    if (oldIndex >= 0) {
      setTodos(
        produce(todos, (draft) => {
          draft[oldIndex] = todo;
        })
      );
    }
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((e) => e.id !== id);
    setTodos(newTodos);
  };

  const value = {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export function useTodos(): TodosContext {
  return useContext(TodosContext);
}
