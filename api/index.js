import jsonServer from 'json-server';
import settings from '../settings';

const {
  API_PORT,
  API_HOST,
  PATHS,
} = settings;

const app = jsonServer.create();

const middlewares = jsonServer.defaults({
  static: PATHS.appBuildDir,
});

const router = jsonServer.router(PATHS.apiDataFile);

app.use(middlewares);

app.use(jsonServer.rewriter({
  '/api/': '/',
}));

app.use(router);

const apiServer = {
  start() {
    return new Promise((resolve, reject) => {
      this.instance = app.listen(API_PORT, API_HOST, (err) => {
        if (err) {
          reject(err);
          return;
        }

        console.log(`Api server is listening at ${API_HOST}:${API_PORT}`);
        resolve();
      });
    });
  },
  stop() {
    this.instance.close();
  },
};

if (require.main === module) {
  apiServer.start();
}

export default apiServer;
