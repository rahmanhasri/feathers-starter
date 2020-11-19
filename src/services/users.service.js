const { Service } = require('feathers-sequelize');

const User = require('../models/user.model');
const userHooks = require('../hooks/users.hook');

class UserService extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }

  async remove() {
    return null;
  }
}

module.exports = function users(app) {
  const options = {
    Model: User(app),
  };

  app.use('/users', new UserService(options, app));
  const service = app.service('users');
  service.hooks(userHooks);
};
