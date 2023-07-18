const sequelize = require("../database");
const Sequelize = require("sequelize");

const expense = sequelize.define("expenses", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  amount: { type: Sequelize.INTEGER, allowNull: false },
  title: { type: Sequelize.STRING, allowNull: false },
  category: { type: Sequelize.STRING, allowNull: false },
});

module.exports = expense;
