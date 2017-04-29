import { watchGetTheme } from 'containers/ThemesManager/sagas';

export default function* rootSaga() {
  yield [
    watchGetTheme(),
  ];
}