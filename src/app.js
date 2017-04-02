import 'babel-polyfill';
import 'normalize.css';
import 'styles/global';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from 'store';
import createRoutes from 'routes';
import { makeSelectLocationState } from 'selectors';

injectTapEventPlugin();

const initialState = {};
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

const routes = createRoutes(store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router
        history={history}
        routes={routes}
        render={
          applyRouterMiddleware(useScroll())
        }
      />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app'),
);
