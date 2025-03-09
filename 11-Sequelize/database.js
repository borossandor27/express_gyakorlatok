import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('pizza', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10, // Maximum 10 egyidejű kapcsolat
        min: 2,  // Minimum 2 kapcsolat mindig nyitva marad
        acquire: 30000, // 30 másodpercig próbálkozik a csatlakozással
        idle: 5000  // 5 másodperc után zárja be az inaktív kapcsolatokat
    }
});
