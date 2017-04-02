import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from 'reducers';
import { setStore as setStoreToAsyncInjectors } from 'utils/asyncInjectors';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];
  const store = createStore(
    createReducer(),
    fromJS(initialState),
    applyMiddleware(...middlewares),
  );

  setStoreToAsyncInjectors(store);

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  return store;
}
