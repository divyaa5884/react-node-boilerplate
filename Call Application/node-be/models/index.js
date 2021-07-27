const Sequelize = require('sequelize');
const dbConfig = require("./../config/secrets");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});
  
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userDetails = require('./userDetail')(sequelize, Sequelize);
db.callLogs = require('./callLog')(sequelize, Sequelize);

module.exports = db;