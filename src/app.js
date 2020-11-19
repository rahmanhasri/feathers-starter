const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const cors = require('cors');

const services = require('./services');
const sequelize = require('../migrations/sequelize');

// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

app.configure(configuration());
app.use(cors());
// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));

app.configure(express.rest());

app.configure(sequelize);

app.configure(services);

app.use(express.errorHandler());

module.exports = app;
