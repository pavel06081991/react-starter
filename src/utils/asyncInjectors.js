import createReducer from 'reducers';

let store;

/**
 * Inject an asynchronously loaded reducer
 */
export function injectReducer(name, asyncReducer) {
  if (name in store.asyncReducers) return;

  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectSagas(sagas) {
  sagas.map(store.runSaga);
}

export function setStore(storeInstance) {
  store = storeInstance;
}
