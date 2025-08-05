import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [20, 60]
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
   password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        
        len: {
          args: [8, 16],
          msg: 'Password must be between 8 and 16 characters long.'
        },
        
        is: {
          args: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]).{8,16}$/,
          msg: 'Password must contain at least one uppercase letter and one special character or number.'
        }
      }
    },
    address: {
      type: DataTypes.STRING(400),
      allowNull: false,
      validate: {
        len: [0, 400]
      }
    },
    role: {
      type: DataTypes.ENUM('System Administrator', 'Normal User', 'Store Owner'),
      defaultValue: 'Normal User',
      allowNull: false,
    },
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  });

  return User;
};