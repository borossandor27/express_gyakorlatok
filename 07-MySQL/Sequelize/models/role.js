import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Role', {
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'roles',
    timestamps: false
  });
};
