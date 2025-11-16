import { sequelize, Sequelize } from '../config/db.js';
import UserModel from './User.js';
import StoreModel from './Store.js';
import RatingModel from './Rating.js';

const db = {};


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = UserModel(sequelize);
db.Store = StoreModel(sequelize);
db.Rating = RatingModel(sequelize);


db.User.hasMany(db.Store, { foreignKey: 'store_owner_id', as: 'ownedStores' });
db.Store.belongsTo(db.User, { foreignKey: 'store_owner_id', as: 'owner' });

db.User.hasMany(db.Rating, { foreignKey: 'user_id' });
db.Rating.belongsTo(db.User, { foreignKey: 'user_id' });

db.Store.hasMany(db.Rating, { foreignKey: 'store_id' });
db.Rating.belongsTo(db.Store, { foreignKey: 'store_id' });

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully!');
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

export default db;
