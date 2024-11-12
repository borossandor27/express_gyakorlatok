require('dotenv').config(); //-- .env fájl beolvasása
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

/**
 * Az alkalmazás a .env fájlban tárolt adatokat használja az e-mail küldéshez.
 * kétfaktoros azonosítás esetén a jelszó helyett az alkalmazás jelszavát kell megadni
 * https://myaccount.google.com/security
 * 
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Útvonal a megrendelés visszaigazolás küldéséhez
app.post('/send-order-confirmation', (req, res) => {
  const { customerEmail, orderId, orderDetails } = req.body;
console.log(customerEmail, orderId, orderDetails);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: `Order Confirmation - Order #${orderId}`,
    html: `
      <h1>Köszönjük a rendelését!</h1>
      <p>Rendelés száma: <strong>${orderId}</strong></p>
      <p>A rendelés részletei:</p>
      <ul>
        ${orderDetails.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <p>Amennyiben kérdése van, forduljon hozzánk bizalommal.</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Nem sikerült elküldeni az e-mailt.');
    } else {
      console.log('Email elküldve: ' + info.response);
      res.status(200).send('Visszaigazolás elküldve.');
    }
  });
});

app.listen(3000, () => {
  console.log('A szerver fut a http://localhost:3000 címen');
});
