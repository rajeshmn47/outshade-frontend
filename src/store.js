import { userReducer } from "./reducers/userReducer";
import { createLeaveReducer } from "./reducers/createLeaveReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  user: userReducer,
  leave: createLeaveReducer,
  category: categoryReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
