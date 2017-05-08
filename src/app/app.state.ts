import {todosReducer, TodoState} from "./todo-list/todo.state";
import {combineReducers} from "redux";

export interface AppState {
  todos: TodoState;
}

export const AppReducers = combineReducers({todos: todosReducer});