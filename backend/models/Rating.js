import { DataTypes } from 'sequelize';
export default (sequelize) => {
  const Rating = sequelize.define('Rating', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
  }, {
    tableName: 'ratings',
    timestamps: true,
    underscored: true,
  });

  return Rating;
};
