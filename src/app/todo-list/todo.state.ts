import findIndex from "lodash-es/findIndex";
import { Action } from "redux";

import { TodoModel } from "./todo.model";

interface TodoAction<P> extends Action {
  payload: P;
}

export type TodoAddAction = TodoAction<TodoModel>;
export type TodoUpdateAction = TodoAction<TodoModel>;
export type TodoDeleteAction = TodoAction<{ id: number }>;
export type TodoState = TodoModel[];

const ACTION_TYPES = {
  ADD_TODO: "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  DELETE_TODO: "DELETE_TODO"
};

Object.freeze(ACTION_TYPES);

export function AddTodo(headline: string, description: string, deadline: Date) {
  return {
    type: ACTION_TYPES.ADD_TODO,
    payload: {
      id: Math.random() * 1000,
      created: new Date(),
      headline,
      description,
      deadline
    }
  };
}

export function UpdateTodo(todo: TodoModel) {
  return {
    type: ACTION_TYPES.UPDATE_TODO,
    payload: todo
  };
}

export function DeleteTodo(id: number) {
  return {
    type: ACTION_TYPES.DELETE_TODO,
    payload: {
      id
    }
  };
}

export const initialTodoList: TodoState = [
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
];

export const todosReducer = (
  state: TodoState = initialTodoList,
  action: TodoAddAction | TodoUpdateAction | TodoDeleteAction
) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODO:
      return [...state, action.payload];
    case ACTION_TYPES.UPDATE_TODO:
      const act = action as TodoUpdateAction;
      const oldIndex = findIndex(state, e => !!e && e.id === act.payload.id);
      if (oldIndex >= 0) {
        const newState = [...state];
        newState[oldIndex] = act.payload;
        return newState;
      } else {
        return state;
      }
    case ACTION_TYPES.DELETE_TODO:
      return state.filter((e: TodoModel) => e.id !== action.payload.id);
    default:
      return state;
  }
};
