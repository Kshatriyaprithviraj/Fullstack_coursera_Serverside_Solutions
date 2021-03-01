const express = require('express');
const mongoose = require('mongoose');

const leaderRouter = express.Router();
const Leaders = require('../models/leaders');

leaderRouter.use(express.json());

// leaderRouter.route('/')
//     .all((req, res, next) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         next();
//     })
//     .get((req, res, next) => {
//         res.end('Will send all the leaders to you.');
//     })
//     .post((req, res, next) => {
//         res.end('Will add the leader: ' + req.body.name + ' with the details: ' + req.body.description);
//     })
//     .put((req, res, next) => {
//         res.statusCode = 403;
//         res.end('PUT operation not supported on /leadership');
//     })
//     .delete((req, res, next) => {
//         res.end('Deleting all the leaders.');
//     });

// leaderRouter.route('/:leaderId')
//     .all((req, res, next) => {
//         // res.statusCode = 200;
//         // res.setHeader('Content-Type', 'text/plain');
//         // next()
//         // or 
//         res.writeHead(200, {
//             'Content-Type': 'text/plain'
//         });
//         next();
//     })
//     .get((req, res, next) => {
//         res.end('Will send all the details of the leader:' + req.params.leaderId + ' to you.');
//     })
//     .post((req, res, next) => {
//         // res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description);
//         res.statusCode = 403;
//         res.end('POST operation not supported on /leadership/' + req.params.leaderId);
//     })
//     .put((req, res, next) => {
//         // res.statusCode = 403;
//         // res.end('PUT operatiodishIdn not supported on /dishes');
//         res.write('Updating the leader: ' + req.params.leaderId + '\n');
//         res.end('Will update the leader: ' + req.params.name + ' with details: ' + req.body.description);
//     })
//     .delete((req, res, next) => {
//         res.end('Deleting leader: ' + req.params.leaderId);
//     });

leaderRouter.route('/')
    .get((req, res, next) => {
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Leaders.create(req.body)
            .then((leader) => {
                console.log('Leader Created ', leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leadership');
    })
    .delete((req, res, next) => {
        Leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leadership/' + req.params.leaderId);
    })
    .put((req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
                $set: req.body
            }, {
                new: true
            })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = leaderRouter;