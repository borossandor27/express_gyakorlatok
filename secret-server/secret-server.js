import express from 'express';
import crypto from 'crypto';
import moment from 'moment';

const app = express();

// Beépített middleware-ek használata
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Adatbázis helyettesítése memóriában tárolt objektummal
const secretsDB = {};

// Secret modell
class Secret {
  constructor(secretText, expireAfterViews, expireAfter) {
    this.hash = crypto.randomBytes(16).toString('hex');
    this.secretText = secretText;
    this.createdAt = new Date().toISOString();
    this.expiresAt = expireAfter === 0 
      ? null 
      : moment().add(expireAfter, 'minutes').toISOString();
    this.remainingViews = expireAfterViews;
  }
}

// POST /secret - Új titok hozzáadása
app.post('/v1/secret', (req, res) => {
  const { secret, expireAfterViews, expireAfter } = req.body;

  // Validációk
  if (!secret || !expireAfterViews || expireAfter === undefined) {
    return res.status(405).json({ error: 'Invalid input' });
  }

  if (expireAfterViews <= 0) {
    return res.status(405).json({ error: 'expireAfterViews must be greater than 0' });
  }

  // Új titok létrehozása
  const newSecret = new Secret(secret, expireAfterViews, expireAfter);
  secretsDB[newSecret.hash] = newSecret;

  // Válasz
  res.status(200).json({
    hash: newSecret.hash,
    secretText: newSecret.secretText,
    createdAt: newSecret.createdAt,
    expiresAt: newSecret.expiresAt,
    remainingViews: newSecret.remainingViews
  });
});

// GET /secret/{hash} - Titok lekérése hash alapján
app.get('/v1/secret/:hash', (req, res) => {
  const { hash } = req.params;
  const secret = secretsDB[hash];

  // Ha nem létezik a titok
  if (!secret) {
    return res.status(404).json({ error: 'Secret not found' });
  }

  // Ha lejárt az idő
  if (secret.expiresAt && new Date(secret.expiresAt) < new Date()) {
    delete secretsDB[hash];
    return res.status(404).json({ error: 'Secret expired' });
  }

  // Ha nincs több megtekintés
  if (secret.remainingViews <= 0) {
    delete secretsDB[hash];
    return res.status(404).json({ error: 'Secret has no remaining views' });
  }

  // Megtekintés csökkentése és válasz
  secret.remainingViews -= 1;
  
  // Ha elfogytak a megtekintések, töröljük
  if (secret.remainingViews <= 0) {
    delete secretsDB[hash];
  }

  res.status(200).json({
    hash: secret.hash,
    secretText: secret.secretText,
    createdAt: secret.createdAt,
    expiresAt: secret.expiresAt,
    remainingViews: secret.remainingViews
  });
});

// Szerver indítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Secret Server API running on port ${PORT}`);
});

export default app;