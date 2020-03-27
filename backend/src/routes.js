
const express = require('express');
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');
const routes = express.Router();

// session routes: login

routes.post('/sessions', sessionController.create);

// Ongs
routes.get('/ongs', ongController.list);
routes.post('/ongs', ongController.create);

// Profile ongs
routes.get('/profile',profileController.listById);

// Incidents
routes.get('/incidents', incidentController.list);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;