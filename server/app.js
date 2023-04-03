const express = require('express');
const cors = require('cors');
require('dotenv').config();

function createApp() {
  const routerAPI = require('./routers/index.router');

  const app = express();

  app.use(express.json());
  app.use(cors());

  routerAPI(app);

  return app;
}

module.exports = createApp;
