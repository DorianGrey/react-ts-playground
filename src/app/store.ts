import { createStore, Reducer, Store } from "redux";
import rootReducer, { AppState } from "./state";

export default function configureStore(
  initialState: AppState
): Store<AppState> {
  const store = createStore(
    rootReducer,
    initialState,
    window["__REDUX_DEVTOOLS_EXTENSION__"] &&
      window["__REDUX_DEVTOOLS_EXTENSION__"]()
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
