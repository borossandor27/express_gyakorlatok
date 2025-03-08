'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Futar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Futar.init({
    fazon: DataTypes.INTEGER,
    fnev: DataTypes.STRING,
    ftel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Futar',
  });
  return Futar;
};