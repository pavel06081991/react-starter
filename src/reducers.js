import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import appReducer from 'containers/App/reducers';
import themesManagerReducer from 'containers/ThemesManager/reducers';

export default function createReducer(asyncReducers) {
  return combineReducers({
    form: formReducer,
    app: appReducer,
    themesManager: themesManagerReducer,
    ...asyncReducers,
  });
}
