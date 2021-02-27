const express = require('express');
const http = require('http');
const morgan = require('morgan');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Mounding Routers
app.use('/dishes', dishRouter);
app.use('/leadership', leaderRouter);
app.use('/promotions', promoRouter);

// app.all('/dishes', (req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// });
// app.get('/dishes', (req, res, next) => {
//     res.end('Will send all the dishes to you.');
// });

// app.post('/dishes', (req, res, next) => {
//     res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description);
// });

// app.put('/dishes', (req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /dishes');
// });

// app.delete('/dishes', (req, res, next) => {
//     res.end('Deleting all the dishes.');
// });

// app.get('/dishes/:dishId', (req, res, next) => {
//     res.end('Will send all the details of the dish:' + req.params.dishId + ' to you.');
// });

// app.post('/dishes/:dishId', (req, res, next) => {
//     // res.end('Will add the dish: ' + req.body.name + ' with the details: ' + req.body.description);
//     res.statusCode = 403;
//     res.end('POST operation not supported on /dishes/' + req.params.dishId);
// });

// app.put('/dishes/:dishId', (req, res, next) => {
//     // res.statusCode = 403;
//     // res.end('PUT operation not supported on /dishes');
//     res.write('Updating the dish: ' + req.params.dishId + '\n');
//     res.end('Will update the dish: ' + req.params.name + ' with details: ' + req.body.description);
// });

// app.delete('/dishes/:dishId', (req, res, next) => {
//     res.end('Deleting dish: ' + req.params.dishId);
// });

app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
    // console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    htmlString = "<html><body><h1>This is an Express Server</h1></body><style>body { background: linear-gradient(to right, blue, red); text-align: center; }</style></html>";
    res.end(htmlString);
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server listening at http://${hostname}:${port}`);
});