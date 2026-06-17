const { Router } = require("express"); 
const { getIncomeById } = require('../controllers/incomeController');

const incomeRouter = Router();

incomeRouter.get("/", (req, res) => res.send("All Incomes")); 

incomeRouter.get("/:incomeId", getIncomeById);

module.exports = incomeRouter;