const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("expenses", "root", "lonewarrior70951", {
  dialect: "mysql",
});

module.exports = sequelize;
