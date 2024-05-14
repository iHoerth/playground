const Sequelize = require("sequelize");

const settings = {
  db: "HospitalDB",
  user: "root",
  password: "123321",
};

// Set up a new Sequelize instance
const sequelize = new Sequelize(settings.db, settings.user, settings.password, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize, Sequelize };
