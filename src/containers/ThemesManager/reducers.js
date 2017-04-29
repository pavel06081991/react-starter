import { fromJS } from 'immutable';
import {SAVE_THEME, SAVE_CONTEXT, TOGGLE_HMR} from './constants';

const themesManagerInitialState = fromJS({
  activeThemeName: 'default',
  isHmrActivated: false,
});

export default function themesManager(state = themesManagerInitialState, action) {
  switch (action.type) {
    case SAVE_THEME:
      return state.merge({
        theme: action.theme,
        activeThemeName: action.themeName,
      });
    case SAVE_CONTEXT:
      return state.set('context', action.context);
    case TOGGLE_HMR:
      return state.set('isHmrActivated', action.isHmrActivated);
    default:
      return state
  }
}
