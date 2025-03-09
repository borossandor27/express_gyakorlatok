import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database.js';

export class Pizza extends Model {}

Pizza.init({
    pazon: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    pnev: { type: DataTypes.STRING(15), allowNull: false },
    par: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, modelName: 'pizza', timestamps: false });
