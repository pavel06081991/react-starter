import {CHANGE_THEME, SAVE_CONTEXT, SAVE_THEME} from './constants';

export const changeTheme = (themeName) => {
  return {
    type: CHANGE_THEME,
    themeName
  }
};

export const saveContext = (context) => {
  return {
    type: SAVE_CONTEXT,
    context
  }
};

export const saveTheme = (theme, themeName) => {
  return {
    type: SAVE_THEME,
    theme,
    themeName
  }
};
