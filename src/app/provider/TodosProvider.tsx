import React, { createContext, FC, useContext, useState } from "react";
import { TodoModel } from "../todo-list/todo.model";

interface TodosContext {
  todos: readonly TodoModel[];
  addTodo: (headline: string, description: string, deadline: Date) => void;
  updateTodo: (todo: TodoModel) => void;
  deleteTodo: (id: number) => void;
}

const TodosContext = createContext<TodosContext>({
  todos: [],
  addTodo: (_headline: string, _description: string, _deadline: Date) => {},
  updateTodo: (_todo: TodoModel) => {},
  deleteTodo: (_id: number) => {}
});

export const TodosProvider: FC = ({ children }) => {
  const [todos, setTodos] = useState<readonly TodoModel[]>([
    {
      id: 1,
      headline: "Test todo",
      description: "A lot of stuff to be done!",
      deadline: new Date(Date.now() + 60 * 60 * 1000),
      created: new Date()
    },
    {
      id: 2,
      headline: "Test todo2",
      description: "A lot of stuff to be done!",
      deadline: new Date(Date.now() + 60 * 60 * 1000),
      created: new Date()
    }
  ]);

  const addTodo = (headline: string, description: string, deadline: Date) => {
    const newTodo = {
      id: Math.random() * 1000,
      created: new Date(),
      headline,
      description,
      deadline
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (todo: TodoModel) => {
    const oldIndex = todos.findIndex(e => e.id === todo.id);
    if (oldIndex >= 0) {
      const newTodos = [...todos];
      newTodos[oldIndex] = todo;
      setTodos(newTodos);
    }
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter(e => e.id !== id);
    setTodos(newTodos);
  };

  const value = {
    todos,
    addTodo,
    deleteTodo,
    updateTodo
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export function useTodos() {
  return useContext(TodosContext);
}
