const compression = require('compression');
const express = require('express');

const {
  PATHS,
} = require('../settings');

const app = express();

app.use(compression());
app.use(express.static(PATHS.appBuildDir));

app.get('*', (req, res) => res.sendFile(PATHS.serverIndexFile));

module.exports = app;
