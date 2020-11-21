const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const cors = require('cors');

const services = require('./services');
const sequelize = require('../migrations/sequelize');

const authentication = require('./authentication');
const middleware = require('./middlewares');

// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

app.configure(configuration());
// Add Cors Module
app.use(cors());
// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));

app.configure(express.rest());

// Add sequelize to feathers
app.configure(sequelize);

// Express routes or express middleware before goes to feather service
app.configure(middleware);

app.configure(authentication);

app.configure(services);

app.use(express.errorHandler());

module.exports = app;
