import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./ducks";
import mySaga from "./saga";
import { composeWithDevTools } from "redux-devtools-extension";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// then run the saga
sagaMiddleware.run(mySaga);