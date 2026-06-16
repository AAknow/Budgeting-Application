// controllers/expenseController.js 
const { Expenses } = require("../models"); 

async function getExpenseById(req, res) { 
    const { expenseId } = req.params; 
    const expense = await Expenses.findByPk(expenseId); 

    if (!expense) { 
        res.status(404).send("Expense not found");
        return; 
    } 
    res.send(`Expense Name: ${expense.expense}`); 
}; 

module.exports = { getExpenseById };