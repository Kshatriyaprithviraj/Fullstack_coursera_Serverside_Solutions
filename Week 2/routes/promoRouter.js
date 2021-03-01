const express = require('express');
const mongoose = require('mongoose');

const promoRouter = express.Router();
const Promotions = require('../models/promotions');

promoRouter.use(express.json());

// promoRouter.route('/')
//     .all((req, res, next) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         next();
//     })
//     .get((req, res, next) => {
//         res.end('Will send all the promotions to you.');
//     })
//     .post((req, res, next) => {
//         res.end('Will add the promotion: ' + req.body.name + ' with the details: ' + req.body.description);
//     })promoRouter.route('/')
//     .all((req, res, next) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         next();
//     })
//     .get((req, res, next) => {
//         res.end('Will send all the promotions to you.');
//     })
//     .post((req, res, next) => {
//         res.end('Will add the promotion: ' + req.body.name + ' with the details: ' + req.body.description);
//     })
//     .put((req, res, next) => {
//         res.statusCode = 403;
//         res.end('PUT operation not supported on /promotions.');
//     })
//     .delete((req, res, next) => {
//         res.end('Deleting all the promotions.');
//     });

// promoRouter.route('/:promoId')
//     .all((req, res, next) => {
//         // res.statusCode = 200;
//         // res.setHeader('Content-Type', 'text/plain');
//         // next();
//         // or 
//         res.writeHead(200, {
//             'Content-Type': 'text/plain'
//         });
//         next();
//     })
//     .get((req, res, next) => {
//         res.end('Will send all the details of the promotions:' + req.params.promoId + ' to you.');
//     })
//     .post((req, res, next) => {
//         // res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description);
//         res.statusCode = 403;
//         res.end('POST operation not supported on /promotions/' + req.params.promoId);
//     })
//     .put((req, res, next) => {
//         // res.statusCode = 403;
//         // res.end('PUT operation not supported on /dishes');
//         res.write('Updating the promotion: ' + req.params.promoId + '\n');
//         res.end('Will update the promotion: ' + req.params.name + ' with details: ' + req.body.description);
//     })
//     .delete((req, res, next) => {
//         res.end('Deleting promotion: ' + req.params.promoId);
//     });

//     .put((req, res, next) => {
//         res.statusCode = 403;
//         res.end('PUT operation not supported on /promotions.');
//     })
//     .delete((req, res, next) => {
//         res.end('Deleting all the promotions.');
//     });

// promoRouter.route('/:promoId')
//     .all((req, res, next) => {
//         // res.statusCode = 200;
//         // res.setHeader('Content-Type', 'text/plain');
//         // next();
//         // or 
//         res.writeHead(200, {
//             'Content-Type': 'text/plain'
//         });
//         next();
//     })
//     .get((req, res, next) => {
//         res.end('Will send all the details of the promotions:' + req.params.promoId + ' to you.');
//     })
//     .post((req, res, next) => {
//         // res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description);
//         res.statusCode = 403;
//         res.end('POST operation not supported on /promotions/' + req.params.promoId);
//     })
//     .put((req, res, next) => {
//         // res.statusCode = 403;
//         // res.end('PUT operation not supported on /dishes');
//         res.write('Updating the promotion: ' + req.params.promoId + '\n');
//         res.end('Will update the promotion: ' + req.params.name + ' with details: ' + req.body.description);
//     })
//     .delete((req, res, next) => {
//         res.end('Deleting promotion: ' + req.params.promoId);
//     });

promoRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Promotions.create(req.body)
            .then((promo) => {
                console.log('Leader Created ', promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res, next) => {
        Promotions.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

promoRouter.route('/:promoId')
    .get((req, res, next) => {
        Promotions.findById(req.params.promoId)
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })
    .put((req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, {
                $set: req.body
            }, {
                new: true
            })
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promoId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = promoRouter;