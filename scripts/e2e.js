import selenium from 'selenium-standalone';
import { Launcher } from 'webdriverio';
import settings from '../settings';
import apiServer from '../api/';

const {
  PATHS,
} = settings;

const wdio = new Launcher(PATHS.wdioConfigFile);

function installSelenium() {
  return new Promise((resolve, reject) => {
    selenium.install((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

function startSelenium() {
  return new Promise((resolve, reject) => {
    selenium.start((error, child) => {
      if (error) {
        reject(error);
        return;
      }

      selenium.child = child;
      resolve();
    });
  });
}

async function startE2E() {
  try {
    await installSelenium();
    await startSelenium();
    await apiServer.start();
    process.exitCode = await wdio.run();
  } catch (err) {
    process.exitCode = 1;
    console.error('Running e2e tests failed', err.stacktrace);
  } finally {
    finishProcess();
  }
}

function finishProcess() {
  apiServer.stop();
  selenium.child && selenium.child.kill();
}

startE2E();
