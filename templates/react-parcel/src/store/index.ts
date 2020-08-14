import { combineReducers, createStore, applyMiddleware, Action } from 'redux';
import ReduxThunk from 'redux-thunk';

const reducers = combineReducers({});

const LOG_OUT = 'LOG_OUT';
interface LogOutAction extends Action<typeof LOG_OUT> {}
type RootActions = LogOutAction;

export const logOut = (): RootActions => ({
  type: 'LOG_OUT'
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return reducers(state, action);
};

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export type RootState = ReturnType<typeof rootReducer>;
export default store;
