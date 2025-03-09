import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database.js';

export class Vevo extends Model {}

Vevo.init({
    vazon: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    vnev: { type: DataTypes.STRING(30), allowNull: false },
    vcim: { type: DataTypes.STRING(30), allowNull: false }
}, { sequelize, modelName: 'vevo', timestamps: false });
