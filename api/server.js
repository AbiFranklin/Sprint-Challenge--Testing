const express = require('express');
const knex = require('knex');

const dbConfig = require('../knexfile')
const server = express();
const db = knex(dbConfig.development);

server.use(express.json());


server.get('/', (req, res) => {
  db('games')
  .then(rows => {
    res.status(200).json(rows);
  })
  .catch(err => {
      res.status(500).json({ error: 'Failed get games' })
    })
})

server.post('/', (req, res) => {
  const body = req.body;
  if (body.title && body.genre) {
    db('games').insert(body)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to add game' })
    })
  } else {
    res.status(422).json({ error: 'Missing Title and/or genre' });
  }
})



module.exports = server;
