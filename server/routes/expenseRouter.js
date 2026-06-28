const { Router } = require("express"); 
const { getExpenseById, createExpense } = require('../controllers/expenseController');

const expenseRouter = Router();

expenseRouter.get("/", (req, res) => res.send("All Expenses")); 

expenseRouter.get("/:expenseId", getExpenseById);

expenseRouter.post("/", createExpense)

module.exports = expenseRouter;