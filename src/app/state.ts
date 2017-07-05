import {intlReducer, IntlState} from "react-intl-redux";
import {combineReducers, Reducer} from "redux";

import {BROWSER_LANGUAGE, getMessagesForLang} from "./i18n/i18n";
import {initialTodoList, todosReducer, TodoState} from "./todo-list/todo.state";

export interface AppState {
  todos: TodoState;
  intl: IntlState;
}

export const initialAppState: AppState = {
  todos: initialTodoList,
  intl:  {
    locale:   BROWSER_LANGUAGE,
    messages: getMessagesForLang(BROWSER_LANGUAGE)
  }
};

export default combineReducers<AppState>({
  todos: todosReducer as Reducer<any>,
  intl:  intlReducer as Reducer<any>
});
