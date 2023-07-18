const expenses = require("../model/expense");
module.exports.getAllExpenses = (req, res) => {
  expenses
    .findAll()
    .then((data) => {
      const arrayData = data.map((item) => item.dataValues);

      res.json(arrayData);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports.addExpense = (req, res) => {
  const { amount, title, category } = req.body;
  expenses
    .create({
      amount: amount,
      title: title,
      category: category,
    })
    .then((obj) => {
      res.json(obj);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports.deleteExpense = (req, res) => {
  const id = req.params.id;
  expenses
    .findByPk(id)
    .then((item) => item.destroy())
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports.editExpense = (req, res) => {
  const id = req.params.id;
  const { amount, title, category } = req.body;
  expenses
    .findByPk(id)
    .then((item) => {
      item.amount = amount;
      item.title = title;
      item.category = category;
      return item.save();
    })
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};
