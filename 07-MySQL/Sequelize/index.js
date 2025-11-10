import express from 'express';
import models, { sequelize } from './models/index.js';
import cors from 'cors';
import usersRoutes from './routes/users.js';
import rolesRoutes from './routes/roles.js';
import loginsRoutes from './routes/logins.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/roles', rolesRoutes);
app.use('/logins', loginsRoutes);

const PORT = 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
export default app;