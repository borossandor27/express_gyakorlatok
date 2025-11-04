import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'wft-geo-db.p.rapidapi.com';

app.get('/cities', async (req, res) => {
    const { countryId } = req.query;
    try {
        // Axios lekérdezési paraméterek alapértelmezett beállításokkal
        const params = {
            // Fixen beállítjuk a limitet (pl. 10 eredmény/oldal)
            limit: 10, 
            // Fixen beállítjuk a rendezést a népesség szerint, csökkenő sorrendben (legnagyobb városok jönnek először)
            sort: '-population'
        };

        if (countryId) {
            // Hozzáadjuk a countryId-t az API kéréshez, ha megadták
            params.countryIds = countryId.toUpperCase(); // Célszerű nagybetűssé konvertálni a biztonság kedvéért
            console.log(`Lekérdezés: Városok a(z) ${countryId.toUpperCase()} országból.`);
        } else {
            console.log("Lekérdezés: Összes város (limitálva és népesség szerint rendezve).");
        }

        // Axios kérés elküldése
        const response = await axios.get(BASE_URL, {
            params: params, // Ide kerül a countryId, limit, sort
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        });

        // Visszaküldjük a választ a kliensnek
        res.status(200).json(response.data);

    } catch (error) {
        console.error("Hiba történt az API kérés során:", error.message);
        
        if (error.response) {
            // Visszaküldjük a külső API státuszkódját és hibaüzenetét
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'Sikertelen API hívás vagy hálózati hiba' });
        }
    }
});

app.use((req, res) => {
    res.status(404).send('Az oldal használata: /cities?countryId={országkód} (pl. http://localhost:3000/cities?countryId=HU)');
});

app.listen(PORT, () => {
    console.log(`Express szerver fut: http://localhost:${PORT}`);
    console.log(`Példa: Magyar városok (rendezve): http://localhost:${PORT}/cities?countryId=HU`);
});