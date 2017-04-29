import { select, put, takeLatest } from 'redux-saga/effects';
import {saveContext, saveTheme} from './actions';
import {CHANGE_THEME} from './constants';

function* getThemesContext() {
  const themeContext = require.context('components/', true, /styles\.css$/);

  yield put(saveContext(themeContext));
}

function* getTheme(action) {
  const {themeName} = action;

  yield getThemesContext();

  const state = yield select();

  const context = state.getIn(['themesManager', 'context']);

  let theme = {};

  context.keys().forEach((filePath) => {
    if (!filePath.includes(`themes/${themeName}`)) {
      return;
    }

    theme[filePath.split('./')[1].split('/')[0]] = context(filePath);
  });

  yield put(saveTheme(theme, themeName))
}

export function* watchGetTheme() {
  yield takeLatest('CHANGE_THEME', getTheme);
}
