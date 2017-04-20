import compression from 'compression';
import express from 'express';
import settings from '../settings';

const {
  PATHS,
} = settings;

const app = express();

app.use(compression());
app.use(express.static(PATHS.appBuildDir));

app.get('*', (req, res) => res.sendFile(PATHS.serverIndexFile));

export default app;
