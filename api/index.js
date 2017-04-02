const jsonServer = require('json-server');

const {
  API_PORT,
  API_HOST,
  PATHS,
} = require('../settings');

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

const server = {
  start(serverReadyCallback) {
    this.instance = app.listen(API_PORT, API_HOST, (err) => {
      if (err) {
        console.log(err);
      }

      console.log(`Api mock server is listening at ${API_HOST}:${API_PORT}`);

      serverReadyCallback && serverReadyCallback();
    });
  },
  stop() {
    this.instance.close();
  },
};

if (require.main === module) {
  server.start();
}

module.exports = server;
