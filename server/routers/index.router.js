const express = require('express');

const songsRouter = require('./songs.router');
const artistsRouter = require('./artists.router');

function routerAPI(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/songs', songsRouter);
  router.use('/artists', artistsRouter);
}

module.exports = routerAPI;
