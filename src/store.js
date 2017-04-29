import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from 'reducers';
import { setStore as setStoreToAsyncInjectors } from 'utils/asyncInjectors';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const middlewares = [
    sagaMiddleware,
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

  sagaMiddleware.run(rootSaga);

  return store;
}
