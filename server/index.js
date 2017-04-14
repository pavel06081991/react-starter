import settings from '../settings';

const {
  ACTIVE_ENV,
  SERVER_PORT,
  SERVER_HOST,
} = settings;

const appServer = {
  async start() {
    const { default: app } = await import(`./${ACTIVE_ENV}`);

    return new Promise((resolve, reject) => {
      this.instance = app.listen(SERVER_PORT, SERVER_HOST, (err) => {
        if (err) {
          reject(err);
          return;
        }

        console.log(`App server is listening at ${SERVER_HOST}:${SERVER_PORT}`);
        resolve();
      });
    });
  },
  stop() {
    this.instance.close();
  },
};

if (require.main === module) {
  appServer.start();
}

export default appServer;
