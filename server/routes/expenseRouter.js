const { Router } = require("express"); 
const { getExpenseById } = require('../controllers/expenseController');

const expenseRouter = Router();

expenseRouter.get("/", (req, res) => res.send("All Expenses")); 

expenseRouter.get("/:expenseId", getExpenseById);

module.exports = expenseRouter;