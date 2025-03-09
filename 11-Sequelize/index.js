import express from 'express';
import { sequelize } from './database.js';
import { Futar } from './models/Futar.js';
import { Pizza } from './models/Pizza.js';
import { Vevo } from './models/Vevo.js';
import { Rendeles } from './models/Rendeles.js';
import { Tetel } from './models/Tetel.js';

async function initDatabase() {
    try {
        await sequelize.sync(); // Meglévő struktúrát nem törli, csak létrehozza, ha még nincs
        console.log('Adatbázis szinkronizálva.');
    } catch (error) {
        console.error('Hiba az adatbázis szinkronizálásakor:', error);
    } finally {
        await sequelize.close();
    }
}

initDatabase();
async function resetDatabase() {
    try {
        await sequelize.sync({ force: true }); // FIGYELEM! Minden adat törlődik!
        console.log('Az adatbázis újralétrehozva.');
    } catch (error) {
        console.error('Hiba az adatbázis újralétrehozásakor:', error);
    } finally {
        await sequelize.close();
    }
}

// resetDatabase(); Minden adat törlődik!
async function updateDatabase() {
    try {
        await sequelize.sync({ alter: true }); // Megőrzi az adatokat, de frissíti a táblákat
        console.log('Az adatbázis frissítve.');
    } catch (error) {
        console.error('Hiba az adatbázis frissítésekor:', error);
    } finally {
        await sequelize.close();
    }
}

// updateDatabase();



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
