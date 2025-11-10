import { Sequelize } from 'sequelize';
import UserModel from './user.js';
import RoleModel from './role.js';
import LoginModel from './login.js';

const sequelize = new Sequelize('userdb', 'root', 'jelszó', {
  host: 'localhost',
  dialect: 'mysql'
});

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