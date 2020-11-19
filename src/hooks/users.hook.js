const { userCreate } = require('../middlewares/validations.mw');
const { hashPassword } = require('../middlewares/users.mw');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [userCreate(), hashPassword()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
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
