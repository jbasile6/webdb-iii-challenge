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
            .then( cohort => res.status(201).json(cohort))
        })
        .catch( err => res.status(500).json(err));
})

//GET all cohorts
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then( cohorts => res.status(200).json(cohorts))
        .catch( err => res.status(500).json(err));
});

//GET cohort by id
server.get('/api/cohorts/:id', (req, res) => {
    const cohortId = req.params.id;

    db('cohorts')
        .where({ id: cohortId })
        .first()
        .then( cohort => {
            if (!cohort) {
                res.status(404).json({ error: `Cohort id #${cohortId} does not exist` })
            } else {
                res.status(200).json(cohort)
            }
        })
        .catch( err => res.status(500).json(err));
});


//PUT edit cohort by id
server.put('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .update(req.body)
        .then( count => {
            if (count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ error: 'Cohort ID does not exist'})
            }
        })
        .catch( err => res.status(500).json(err))
})


//DELETE cohort by id
server.delete('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .del()
        .then( count => {
            if (count > 0) {
                res.status(204).json(count)
            } else {
                res.status(404).json({ error: 'Cohort ID does not exist'})
            }
        })
        .catch( err => res.status(500).json(err))
})


const port = 5000;

server.listen(port, () => {
    console.log(`\n** API running on http://localhost:${port} **\n`)
});