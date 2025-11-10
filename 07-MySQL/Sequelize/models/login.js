import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Login', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    login_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    success: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'logins',
    timestamps: false
  });
};
