// controllers/incomeController.js 
const { Incomes } = require("../models");

// Get Income by Id
async function getIncomeById(req, res) {
    const { incomeId } = req.params;

    const income = await Incomes.findByPk(incomeId);

    if (!income) {
        return res.status(404).send("Income not found");
    }

    res.send(`Income Name: ${income.income}`);
}

// Create income
async function createIncome(req, res) {
    try {
        console.log(req.body);

        const { userId, income, amount, date } = req.body;

        if (!userId || !income || !amount) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const newIncome = await Incomes.create({
            userId,
            income,
            amount,
            date
        });

        return res.status(201).json({
            message: "Income created successfully",
            data: newIncome
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = { getIncomeById, createIncome };
