import {applyMiddleware, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'

function makeStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  );
}

let store;

if(localStorage.getItem('snapshot') !== null) {
  store = makeStore(JSON.parse(localStorage.getItem('snapshot')));
} else {
  store = makeStore()
}

store.subscribe(() => {
  localStorage.setItem('snapshot', JSON.stringify(store.getState()))
});

export default store