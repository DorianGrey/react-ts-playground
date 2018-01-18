import { intlReducer, IntlState } from "react-intl-redux";
import { combineReducers, Reducer } from "redux";

import { BROWSER_LANGUAGE } from "./i18n/i18n";
import { Translations } from "./i18n/languagePacks/languagePack";
import {
  initialTodoList,
  todosReducer,
  TodoState
} from "./todo-list/todo.state";

export interface AppState {
  todos: TodoState;
  intl: IntlState;
}

export function initialAppState(messages: Translations): AppState {
  return {
    todos: initialTodoList,
    intl: {
      locale: BROWSER_LANGUAGE,
      messages
    }
  };
}

export default combineReducers<AppState>({
  todos: todosReducer as Reducer<any>,
  intl: intlReducer as Reducer<any>
});
