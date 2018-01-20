import { applyMiddleware, compose, createStore, Reducer, Store } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import rootReducer, { AppState } from "./state";

import { loadLanguageEpic } from "./i18n/i18n";

export default function configureStore(
  initialState: AppState
): Store<AppState> {
  const rootEpic = combineEpics(loadLanguageEpic);
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const composeEnhancers =
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  if (module.hot) {
    module.hot.accept("./state", () => {
      const nextReducer = require<{ default: Reducer<AppState> }>("./state")
        .default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
