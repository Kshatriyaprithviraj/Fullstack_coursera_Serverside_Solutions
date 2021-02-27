const express = require('express');

const dishRouter = express.Router();

dishRouter.use(express.json());

dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the dishes to you.');
    })
    .post((req, res, next) => {
        res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })
    .delete((req, res, next) => {
        res.end('Deleting all the dishes.');
    });

dishRouter.route('/:dishId')
    .all((req, res, next) => {
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'text/plain');
        // next();
        // or 
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the details of the dish:' + req.params.dishId + ' to you.');
    })
    .post((req, res, next) => {
        // res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description);
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.dishId);
    })
    .put((req, res, next) => {
        // res.statusCode = 403;
        // res.end('PUT operation not supported on /dishes');
        res.write('Updating the dish: ' + req.params.dishId + '\n');
        res.end('Will update the dish: ' + req.params.name + ' with details: ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting dish: ' + req.params.dishId);
    });

module.exports = dishRouter;