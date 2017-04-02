const {
  ACTIVE_ENV,
  SERVER_PORT,
  SERVER_HOST,
} = require('../settings');

const server = {
  start(serverReadyCallback) {
    const app = require(`./${ACTIVE_ENV}`);

    this.instance = app.listen(SERVER_PORT, SERVER_HOST, (err) => {
      if (err) {
        console.log(err);
      }

      console.log(`App server is listening at ${SERVER_HOST}:${SERVER_PORT}`);

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
