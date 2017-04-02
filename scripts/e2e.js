const {
  PATHS,
} = require('../settings');

const selenium = require('selenium-standalone');
const Launcher = require('webdriverio').Launcher;
const apiServer = require(PATHS.apiFile);

const wdio = new Launcher(PATHS.wdioConfigFile);

function installSelenium() {
  selenium.install(onSeleniumInstallFinished);
}

function onSeleniumInstallFinished(error) {
  if (error) {
    console.error('Installing selenium failed', error.stacktrace);
    process.exitCode = 1;
    return;
  }

  startSelenium();
}

function startSelenium() {
  selenium.start(onSeleniumStarted);
}

function onSeleniumStarted(error, child) {
  if (error) {
    console.error('Running selenium failed', error.stacktrace);
    process.exitCode = 1;
    return;
  }

  selenium.child = child;
  startApiServer();
}

function startApiServer() {
  apiServer.start(onServerStarted);
}

function onServerStarted() {
  startTests();
}

function startTests() {
  wdio.run().then((code) => {
    closeProcess();
    process.exitCode = code;
  }, (error) => {
    console.error('Launcher failed to start the tests', error.stacktrace);
    closeProcess();
    process.exitCode = 1;
  });
}

function closeProcess() {
  apiServer.stop();
  selenium.child.kill();
}

installSelenium();
