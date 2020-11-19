const { Sequelize } = require('sequelize');

module.exports = (app) => {
  const {
    database,
    username,
    password,
    host,
    port,
    dialect,
  } = app.get('db');

  const sequelize = new Sequelize(
    database,
    username,
    password,
    {
      host,
      port,
      dialect,
      define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
      operatorsAliases: Sequelize.Op,
      logging: process.env.NODE_ENV === 'production' ? false : console.log,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  );

  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function setup(...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const { models } = sequelize;
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        (models[name]).associate(models);
      }
    });

    // Sync to the database
    sequelize.sync().catch((err) => {
      // logger.info(JSON.stringify(err));
      console.log('ERROR', JSON.stringify(err));
    });

    return result;
  };
};
