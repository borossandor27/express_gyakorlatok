import express from 'express';
import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('pizza', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

class Futar extends Model {}
Futar.init({
    fazon: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    fnev: { type: DataTypes.STRING(25), allowNull: false },
    ftel: { type: DataTypes.STRING(15), allowNull: false }
}, { sequelize, modelName: 'futar', timestamps: false });

class Pizza extends Model {}
Pizza.init({
    pazon: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    pnev: { type: DataTypes.STRING(15), allowNull: false },
    par: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, modelName: 'pizza', timestamps: false });

class Vevo extends Model {}
Vevo.init({
    vazon: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    vnev: { type: DataTypes.STRING(30), allowNull: false },
    vcim: { type: DataTypes.STRING(30), allowNull: false }
}, { sequelize, modelName: 'vevo', timestamps: false });

class Rendeles extends Model {}
Rendeles.init({
    razon: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    vazon: { type: DataTypes.INTEGER.UNSIGNED, references: { model: Vevo, key: 'vazon' } },
    fazon: { type: DataTypes.INTEGER.UNSIGNED, references: { model: Futar, key: 'fazon' } },
    idopont: { type: DataTypes.DATE, allowNull: false }
}, { sequelize, modelName: 'rendeles', timestamps: false });

class Tetel extends Model {}
Tetel.init({
    razon: { type: DataTypes.INTEGER.UNSIGNED, references: { model: Rendeles, key: 'razon' } },
    pazon: { type: DataTypes.INTEGER.UNSIGNED, references: { model: Pizza, key: 'pazon' } },
    db: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, modelName: 'tetel', timestamps: false });

// Model kapcsolatok
Rendeles.belongsTo(Vevo, { foreignKey: 'vazon' });
Rendeles.belongsTo(Futar, { foreignKey: 'fazon' });
Tetel.belongsTo(Rendeles, { foreignKey: 'razon' });
Tetel.belongsTo(Pizza, { foreignKey: 'pazon' });

const app = express();
app.use(express.json());

// Rendelés tranzakció kezeléssel
app.post('/rendeles', async (req, res) => {
    const { vazon, fazon, tetelek } = req.body;
    const t = await sequelize.transaction();
    try {
        const ujRendeles = await Rendeles.create({ vazon, fazon, idopont: new Date() }, { transaction: t });
        for (const tetel of tetelek) {
            await Tetel.create({ razon: ujRendeles.razon, pazon: tetel.pazon, db: tetel.db }, { transaction: t });
        }
        await t.commit();
        res.status(201).json(ujRendeles);
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, async () => {
    await sequelize.sync();
    console.log('Server running on http://localhost:3000');
});
