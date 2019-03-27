const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile'); 

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.send('James Basile: WebDB III Challenge')
})


//POST new cohort
server.post('/api/cohorts')

const port = 5000;

server.listen(port, () => {
    console.log(`\n** API running on http://localhost:${port} **\n`)
});