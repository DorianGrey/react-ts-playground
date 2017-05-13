import {createStore, Reducer, Store} from "redux";
import rootReducer, {AppState, initialAppState} from "./state";

export default function configureStore(initialState: AppState | null): Store<AppState> {
  const initState = initialState || initialAppState;
  const store = createStore(rootReducer, initState, window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]());

  if (module.hot) {
    module.hot.accept("./state", () => {
      const nextReducer = require<{ default: Reducer<AppState> }>("./state").default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}