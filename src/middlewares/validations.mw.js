const Joi = require('joi');
const errors = require('@feathersjs/errors');

module.exports = {
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
