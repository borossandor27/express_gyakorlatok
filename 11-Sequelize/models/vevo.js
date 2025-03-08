'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vevo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vevo.init({
    vazon: DataTypes.INTEGER,
    vnev: DataTypes.STRING,
    vcim: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vevo',
  });
  return Vevo;
};