# Fájl feltöltés ([Multer](https://www.npmjs.com/package/multer))-el

A hálózatos kommunikációban a legmegbízhatóbb adatcsere a karakterrel való kommunikáció. Az alkalmazásoknak nem csak szöveges információkat kell fogadniuk! Képek és dokumentumok feltöltését igen gyakran engedélyeznünk kell.

## kliens oldalon

Amennyiben nem karakteresen szeretnénk az adatokat továbbítani a form `enctype` tulajdonságánál jeleznünk kell és az erre a célra létrehozott beviteli mezőt kell használnunk.

```HTML
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="myFile" />
    <button type="submit">Feltöltés</button>
</form>
```

## szerver oldalon

A `req.file` objektum a következő információkat tartalmazza:

- `fieldname`: A mező neve (myFile).
- `originalname`: Az eredeti fájlnév.
- `filename`: Az új, egyedi fájlnév.
- `path`: A fájl teljes elérési útvonala a szerveren.

A Multer nemcsak egyetlen fájl kezelésére képes, hanem több fájl (`upload.array()`), vagy akár különböző nevű fájlmezők (`upload.fields()`) feldolgozására is.

## Fájl méretének és típusának korlátozása
A Multer beállításainál szűrőket is megadhatunk, például korlátozhatjuk a feltöltött fájl méretét vagy [típusát](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types).

```JavaScript
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Csak JPG és PNG fájlok tölthetők fel.'));
    }
  }
});
```

