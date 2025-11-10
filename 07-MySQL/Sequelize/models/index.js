import { Sequelize } from 'sequelize';
import UserModel from './user.js';
import RoleModel from './role.js';
import LoginModel from './login.js';
import config from '../config/config.json' with { type: 'json' }; // használja ugyanazt a config fájlt, amit a sequelize-cli és migrációk is

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  }
);

const models = {
  User: UserModel(sequelize),
  Role: RoleModel(sequelize),
  Login: LoginModel(sequelize)
};

// Kapcsolatok
models.User.belongsTo(models.Role, { foreignKey: 'role_id' });
models.Role.hasMany(models.User, { foreignKey: 'role_id' });

models.Login.belongsTo(models.User, { foreignKey: 'user_id' });
models.User.hasMany(models.Login, { foreignKey: 'user_id' });

export { sequelize };
export default models;