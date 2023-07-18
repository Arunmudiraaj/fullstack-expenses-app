const express = require("express");
const app = express();
const sequelize = require("./database");
const expenseRoutes = require("./routes/expense");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/expenses", expenseRoutes);

sequelize.sync().then((res) => {
  app.listen(8080);
});
