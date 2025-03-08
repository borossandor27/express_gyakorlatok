'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tetel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tetel.init({
    razon: DataTypes.INTEGER,
    pazon: DataTypes.INTEGER,
    db: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tetel',
  });
  return Tetel;
};