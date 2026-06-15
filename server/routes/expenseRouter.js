const { Router } = require("express"); 
const expenseRouter = Router();
 
expenseRouter.get("/", (req, res) => res.send("All Expenses")); 

expenseRouter.get("/:expenseId", (req, res) => { 
    const { expenseId } = req.params; 
    res.send(`Expense ID: ${expenseId}`); 
}); 

module.exports = expenseRouter;