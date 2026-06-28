const { Router } = require("express"); 
const { getIncomeById, createIncome } = require('../controllers/incomeController');

const incomeRouter = Router();

incomeRouter.get("/", (req, res) => res.send("All Incomes")); 

incomeRouter.get("/:incomeId", getIncomeById);

incomeRouter.post("/", createIncome)

module.exports = incomeRouter;