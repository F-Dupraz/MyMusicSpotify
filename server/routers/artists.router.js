const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM artists ORDER BY name ASC')
    .then((result) => {
      res.status(200).json(result.rows);
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res, next) => {
  const artistId = req.params.id;
  
  pool.query('SELECT * FROM artists WHERE id=$1', [artistId])
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
  const artistName = req.params.name;

  pool.query('SELECT * FROM artists WHERE name=$1', [artistName])
    .then((result) => {
      if(result.rowCount) {
        res.status(200).json(result.rows);
      } else {
        res.status(404).json({ "Error 404:": "The given name doesn't exist." });
      } 
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res, next) => {
  const newArtist = req.body;

  pool.query('INSERT INTO artists(name) VALUES($1)', [newArtist.name])
    .then((result) => {
      res.status(201).json(result);
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const artistId = req.params.id;

  pool.query('DELETE FROM artists WHERE id=$1', [artistId])
    .then((result) => {
      res.status(204).json(result.rows);
    }).catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
