import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Role = sequelize.define('Role', {
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'roles',
    timestamps: false
  });

  return Role;
};