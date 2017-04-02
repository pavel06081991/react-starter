import { injectReducer, injectSagas } from 'utils/asyncInjectors';
import App from 'containers/App';

const loadModule = cb => (componentModule) => {
  cb(null, componentModule.default);
};

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err);
};

export default function createRoutes() {
  return {
    component: App,
    childRoutes: [
      {
        path: '/',
        name: 'cards',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('containers/Cards'),
          ]);
          const renderRoute = loadModule(cb);

          importModules.then(([component]) => {
            renderRoute(component);
          }).catch(errorLoading);
        },
      },
    ],
  };
}
