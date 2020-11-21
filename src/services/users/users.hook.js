const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const Joi = require('joi');
const errors = require('@feathersjs/errors');

const validations = {
  userCreate() {
    return async (context) => {
      const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30)
          .required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
      });
      const result = schema.validate(context.data);
      if (result.error) {
        return Promise.reject(new errors.BadRequest(result.error));
      }
      return context;
    };
  },
};

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [validations.userCreate(), hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt'), (context) => {
      // disable feathers service
      context.result = null;
      return context;
    }],
  },

  after: {
    all: [
      protect('password'),
      (context) => {
        // disable feathers event emit
        context.event = null;
        return context;
      },
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
