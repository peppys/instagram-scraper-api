const config = require('./config');
const express = require('express');
const kue = require('kue');
const setupUserRoutes = require('./routes/user');
const worker = require('./scraperWorker');

var app = express();

// Start worker
worker(kue.createQueue(config.kue), {
    timeout: 15000,
    sleep: 10000
});

// Setup user api routes & listen
setupUserRoutes(app)
    .listen(config.api.port, () => {
        console.log('API server listening on port %i', config.api.port);
    });

// Setup kue UI
kue.app.listen(config.api.kueUiPort, () => {
    console.log('Kue UI server listening on port %i', config.api.kueUiPort);
})
