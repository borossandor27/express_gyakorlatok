import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database.js';
import { Vevo } from './Vevo.js';
import { Futar } from './Futar.js';

export class Rendeles extends Model {}

Rendeles.init({
    razon: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    vazon: { type: DataTypes.INTEGER.UNSIGNED, references: { model: Vevo, key: 'vazon' } },
    fazon: { type: DataTypes.INTEGER.UNSIGNED, references: { model: Futar, key: 'fazon' } },
    idopont: { type: DataTypes.DATE, allowNull: false }
}, { sequelize, modelName: 'rendeles', timestamps: false });
