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
server.post('/api/cohorts', (req, res) => {
    db('cohorts')
        .insert(req.body)
        .then( ids => {
            const id = id[0];
            db('cohorts')
            .where({ id })
            .first()
            .then( zoo => res.status(201).json(zoo))
        })
        .catch( err => res.status(500).json(err));
})

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then( zoos => res.status(200).json(zoos))
        .catch( err => res.status(500).json(err));
});

const port = 5000;

server.listen(port, () => {
    console.log(`\n** API running on http://localhost:${port} **\n`)
});