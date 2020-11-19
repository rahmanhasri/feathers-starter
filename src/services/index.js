const users = require('./users.service.js');

module.exports = (app) => {
  app.configure(users);
};
