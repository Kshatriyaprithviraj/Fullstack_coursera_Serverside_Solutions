const express = require('express');

const leaderRouter = express.Router();

leaderRouter.use(express.json());

leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the leaders to you.');
    })
    .post((req, res, next) => {
        res.end('Will add the leader: ' + req.body.name + ' with the details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leadership');
    })
    .delete((req, res, next) => {
        res.end('Deleting all the leaders.');
    });

leaderRouter.route('/:leaderId')
    .all((req, res, next) => {
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'text/plain');
        // next()
        // or 
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the details of the leader:' + req.params.leaderId + ' to you.');
    })
    .post((req, res, next) => {
        // res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description);
        res.statusCode = 403;
        res.end('POST operation not supported on /leadership/' + req.params.leaderId);
    })
    .put((req, res, next) => {
        // res.statusCode = 403;
        // res.end('PUT operation not supported on /dishes');
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('Will update the leader: ' + req.params.name + ' with details: ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting leader: ' + req.params.leaderId);
    });

module.exports = leaderRouter;