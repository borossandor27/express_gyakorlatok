import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json({ extended: true }));

const PORT = 3000;

const options = {
	method: 'GET',
	hostname: 'wft-geo-db.p.rapidapi.com',
	port: null,
	path: '/v1/geo/places/%7BplaceId%7D/distance?toPlaceId=Q60',
	headers: {
		'x-rapidapi-key': process.env.RAPIDAPI_KEY,
		'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
	}
};


app.get('/country/:code', async (req, res) => {
  const { code } = req.params;

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    const country = response.data[0];

    const result = {
      name: country.name.common,
      capital: country.capital?.[0] || 'Nincs adat',
      population: country.population,
      flag: country.flags?.png || 'Nincs zászló'
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt az országadat lekérdezésekor', details: error.message });
  }
});


app.use((req, res) => {

  res.status(404).send('Az oldal használata: /country/{országkód} (pl. http://localhost:3000/country/hu)');
});

app.listen(PORT, () => {
  console.log(`Szerver fut a http://localhost:${PORT} címen`);
});
