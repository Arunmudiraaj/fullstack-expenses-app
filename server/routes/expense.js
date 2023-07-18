const express = require("express");
const routes = express.Router();
const expensesController = require("../controllers/expenses");

routes.get("/all", expensesController.getAllExpenses);
routes.post("/add", expensesController.addExpense);
routes.delete("/delete/:id", expensesController.deleteExpense);
routes.put("/edit/:id", expensesController.editExpense);

module.exports = routes;
