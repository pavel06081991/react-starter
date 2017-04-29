import 'babel-polyfill';
import 'normalize.css';
import 'common/styles/global';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from 'store';
import { AppContainer } from 'react-hot-loader';
import ThemesManager from 'containers/ThemesManager';
import App from 'containers/App';

injectTapEventPlugin();

const initialState = {};
const store = configureStore(initialState);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ThemesManager>
          <MuiThemeProvider>
            <Router>
              <Route exact path="/" component={App}/>
            </Router>
          </MuiThemeProvider>
        </ThemesManager>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render();

if (__IS_DEVELOPMENT_ENV__) {
  module.hot && module.hot.accept('containers/App', render);
}
