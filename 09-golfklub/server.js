const { json } = require('body-parser');
const express = require('express');
const app = express();
app.use(json());
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',   // password for your MySQL server
    database: 'golfklub'
});
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL server');
        return;
    }
    console.log('Connected to MySQL server');
});
const router = express.Router();
app.use('/golf', router);
router.get('/ugyfelek', (req, res) => {
    connection.query('SELECT `uazon`,`unev`,`uemail`, `utel`, `uszuletett` FROM `ugyfelek` WHERE 1', (err, rows) => {
        if (err) {
            res.status(500);
            console.log('Error in query');
            return;
        }
        res.status(200).json(rows);
    });
}
);
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});