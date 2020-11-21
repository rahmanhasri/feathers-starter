const users = require('./users/users.service.js');

const test = (app) => {
  // MOVE to class or own service file
  app.use('/maman', {
    find() {
      return this.app.service('users').find();
    },

    setup(appFeathers) {
      this.app = appFeathers;
    },
  });
};

module.exports = (app) => {
  app.configure(users);
  app.configure(test);
};
