import { compose, createStore, Reducer, Store } from "redux";
import rootReducer, { AppState } from "./state";

export default function configureStore(
  initialState: AppState
): Store<AppState> {
  const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]
    ? window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]()
    : compose;

  const store = createStore(rootReducer, initialState, composeEnhancers);

  if (module.hot) {
    module.hot.accept("./state", () => {
      const nextReducer = require<{ default: Reducer<AppState> }>("./state")
        .default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
