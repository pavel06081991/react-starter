const {
  PATHS,
} = require('../settings');

const appServer = require(PATHS.serverFile);
const apiServer = require(PATHS.apiFile);

apiServer.start(() => {
  appServer.start();
});
