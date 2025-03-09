import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database.js';

export class Futar extends Model {}

Futar.init({
    fazon: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    fnev: { type: DataTypes.STRING(25), allowNull: false },
    ftel: { type: DataTypes.STRING(15), allowNull: false }
}, { sequelize, modelName: 'futar', timestamps: false });
