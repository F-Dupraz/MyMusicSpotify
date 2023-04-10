const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', (req, res, next) => {
  pool.query('SELECT songs.name AS name, artists.name AS artist FROM songs INNER JOIN artists ON songs.artistid = artists.id ORDER BY artists.name ASC')
    .then((result) => {
      res.status(200).json(result.rows);
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res, next) => {
  const songId = req.params.id;
  
  pool.query('SELECT songs.name AS name, artists.name AS artist FROM songs INNER JOIN artists ON songs.artistid = artists.id WHERE songs.id=$1', [songId])
    .then((result) => {
      if(result.rowCount) {
        res.status(200).json(result.rows);
      } else {
        res.status(404).json({ "Error 404:": "The given id doesn't exist." });
      } 
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/name/:name', (req, res, next) => {
  const songName = req.params.name;

  pool.query('SELECT songs.name AS name, artists.name AS artist FROM songs INNER JOIN artists ON songs.artistid = artists.id WHERE songs.name=$1', [songName])
    .then((result) => {
      if(result.rowCount) {
        res.status(200).json(result.rows);
      } else {
        res.status(404).json({ "Error 404:": "The given name doesn't exist." });
      } 
    }).catch((err) => {
      res.status(500).json({Error: err});
    });
});

router.get('/artist/:artist', (req, res, next) => {
  const songArtist = req.params.artist;

  pool.query('SELECT songs.name AS name, artists.name AS artist FROM songs INNER JOIN artists ON songs.artistid = artists.id WHERE songs.artistid=$1', [songArtist])
    .then((result) => {
      if(result.rowCount) {
        res.status(200).json(result.rows);
      } else {
        res.status(404).json({ "Error 404:": "The given artist doesn't exist." });
      } 
    }).catch((err) => {
      res.status(500).json({Error: err});
    });
});

router.post('/', (req, res, next) => {
  const newSong = req.body;

  pool.query('INSERT INTO songs(name, artistid) VALUES($1, (SELECT id FROM artists WHERE name=$2)) RETURNING *', [newSong.trackName, newSong.artistName])
    .then((result) => {
      res.status(201).json(result.rows);
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const songId = req.params.id;

  pool.query('DELETE FROM songs WHERE id=$1', [songId])
    .then((result) => {
      res.status(204).json(result);
    }).catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
