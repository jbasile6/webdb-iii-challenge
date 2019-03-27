const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile'); 

const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());




const port = 5000;

server.listen(port, () => {
    console.log(`\n** API running on http://localhost:${port} **\n`)
});