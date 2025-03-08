const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

// Sequelize kapcsolat
const sequelize = new Sequelize('pizza', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Modellek betöltése
const Futar = require('./models/futar')(sequelize, DataTypes);
const Pizza = require('./models/pizza')(sequelize, DataTypes);
const Vevo = require('./models/vevo')(sequelize, DataTypes);
const Rendeles = require('./models/rendeles')(sequelize, DataTypes);
const Tetel = require('./models/tetel')(sequelize, DataTypes);

// Kapcsolatok definiálása
Rendeles.belongsTo(Vevo, { foreignKey: 'vazon' });
Rendeles.belongsTo(Futar, { foreignKey: 'fazon' });
Tetel.belongsTo(Rendeles, { foreignKey: 'razon' });
Tetel.belongsTo(Pizza, { foreignKey: 'pazon' });

// Middleware
app.use(express.json());

// Pizza rendelés végpont (tranzakcióval)
app.post('/rendeles', async (req, res) => {
  const { vazon, fazon, pizzak } = req.body;

  const t = await sequelize.transaction();

  try {
    // Rendelés létrehozása
    const rendeles = await Rendeles.create({ vazon, fazon, idopont: new Date() }, { transaction: t });

    // Tételek hozzáadása
    for (const pizza of pizzak) {
      await Tetel.create({ razon: rendeles.razon, pazon: pizza.pazon, db: pizza.db }, { transaction: t });
    }

    // Tranzakció commit
    await t.commit();

    res.status(201).json({ message: 'Rendelés sikeresen felvéve!', rendeles });
  } catch (error) {
    // Tranzakció rollback
    await t.rollback();
    res.status(500).json({ message: 'Hiba történt a rendelés felvételekor', error });
  }
});

// Szerver indítása
app.listen(port, () => {
  console.log(`Szerver fut a http://localhost:${port} címen.`);
});