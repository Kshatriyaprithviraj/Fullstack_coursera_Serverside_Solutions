const express = require('express');

const promoRouter = express.Router();

promoRouter.use(express.json());

promoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the promotions to you.');
    })
    .post((req, res, next) => {
        res.end('Will add the promotion: ' + req.body.name + ' with the details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions.');
    })
    .delete((req, res, next) => {
        res.end('Deleting all the promotions.');
    });

promoRouter.route('/:promoId')
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
        res.end('Will send all the details of the promotions:' + req.params.promoId + ' to you.');
    })
    .post((req, res, next) => {
        // res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description);
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })
    .put((req, res, next) => {
        // res.statusCode = 403;
        // res.end('PUT operation not supported on /dishes');
        res.write('Updating the promotion: ' + req.params.promoId + '\n');
        res.end('Will update the promotion: ' + req.params.name + ' with details: ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting promotion: ' + req.params.promoId);
    });

module.exports = promoRouter;