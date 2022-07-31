import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { todosReducer } from "./Todos/reducer";
import { AuthReducer } from "./auth/AuthReducer";
import { IssueReducer } from "./Issue/IssueReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  issue: IssueReducer,
  todos: todosReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
