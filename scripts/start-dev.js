import apiServer from '../api/';
import appServer from '../server/';

async function startDev() {
  await apiServer.start();
  await appServer.start();
}

startDev();
