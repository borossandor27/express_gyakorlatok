import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Login = sequelize.define('Login', {
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

  return Login;
};