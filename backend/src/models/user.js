'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association
    }
  }

  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false
    },
    passwordHash: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
    name: {
      singular: "user",
      plural: "users"
    }
  });
  return User;
};