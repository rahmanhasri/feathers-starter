const app = require('../src/app');

const {
  username,
  password,
  database,
  host,
  port,
  dialect,
} = app.get('db');

module.exports = {
  username,
  password,
  database,
  host,
  port,
  dialect,
};
