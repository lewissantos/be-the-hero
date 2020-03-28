
const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); // import celebrate to validate

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');
const routes = express.Router();

// session routes: login
routes.post('/sessions', sessionController.create);

// Ongs
routes.get('/ongs', ongController.list);

// validate routes
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.create);

// Profile ongs
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), profileController.listById);

// Incidents
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentController.list);

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),        
    }).unknown()
}),  incidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentController.delete);

module.exports = routes;