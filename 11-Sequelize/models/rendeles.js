'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rendeles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rendeles.init({
    razon: DataTypes.INTEGER,
    vazon: DataTypes.INTEGER,
    fazon: DataTypes.INTEGER,
    idopont: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Rendeles',
  });
  return Rendeles;
};