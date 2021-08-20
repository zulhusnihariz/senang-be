require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('senang', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  port: '3000',
  dialect: 'postgres',
});

const models = {
  User: require('./user')(sequelize, Sequelize),
  Address: require('./profile/user-address')(sequelize, Sequelize),
  Product: require('./store/product')(sequelize, Sequelize),
  States: require('./general-setting/states')(sequelize, Sequelize),
  Areas: require('./general-setting/areas')(sequelize, Sequelize),
  Postcodes: require('./general-setting/postcodes')(sequelize, Sequelize),
  // UserPayment: require('./user-payment'),
};

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
  ``;
}

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
