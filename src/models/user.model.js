const { Model, DataTypes } = require('sequelize');

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient');
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize: sequelizeClient,
    modelName: 'User',
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    },
  });

  return User;
};
