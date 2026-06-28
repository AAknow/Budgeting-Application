// controllers/expenseController.js 
const { Expenses } = require("../models"); 

// Get Expense by Id
async function getExpenseById(req, res) { 
    const { expenseId } = req.params; 
    const expense = await Expenses.findByPk(expenseId); 

    if (!expense) { 
        res.status(404).send("Expense not found");
        return; 
    } 
    res.send(`Expense Name: ${expense.expense}`); 
};

// Create expense
async function createExpense(req, res) {
    try {
        console.log(req.body);

        const { userId, expense, amount, date } = req.body;

        if (!userId || !expense || !amount) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const newExpense = await Expenses.create({
            userId,
            expense,
            amount,
            date
        });

        return res.status(201).json({
            message: "Expense created successfully",
            data: newExpense
        });
    }
    catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = { getExpenseById, createExpense };