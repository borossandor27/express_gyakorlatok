import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database.js';
import { Rendeles } from './rendeles.js';
import { Pizza } from './Pizza.js';

export class Tetel extends Model {}

Tetel.init({
    razon: { type: DataTypes.INTEGER.UNSIGNED, references: { model: Rendeles, key: 'razon' } },
    pazon: { type: DataTypes.INTEGER.UNSIGNED, references: { model: Pizza, key: 'pazon' } },
    db: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, modelName: 'tetel', timestamps: false });
