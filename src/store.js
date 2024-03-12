import { createStore, combineReducers } from 'redux';

import userReducer from './reducers/userReducer';
import appReducer from './reducers/appReducer';

//combining all the reducers
const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer
});

//creating the store
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//for using redux devtools for simple project
);

export default store;