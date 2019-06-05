import { combineReducers, Reducer } from "redux";

import {
  initialTodoList,
  todosReducer,
  TodoState
} from "./todo-list/todo.state";

export interface AppState {
  todos: TodoState;
}

export function initialAppState(): AppState {
  return {
    todos: initialTodoList
  };
}

export default combineReducers<AppState>({
  todos: todosReducer as Reducer
});
