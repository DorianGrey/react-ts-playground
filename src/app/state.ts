import {initialTodoList, todosReducer, TodoState} from "./todo-list/todo.state";
import {combineReducers} from "redux";

export interface AppState {
  todos: TodoState;
}

export const initialAppState: AppState = {todos: initialTodoList};

export default combineReducers<AppState>({todos: todosReducer});