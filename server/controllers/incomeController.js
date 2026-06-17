// controllers/incomeController.js 
const { Incomes } = require("../models"); 

async function getIncomeById(req, res) { 
    const { incomeId } = req.params; 
    const income = await Incomes.findByPk(incomeId); 

    if (!income) { 
        res.status(404).send("Income not found");
        return; 
    } 
    res.send(`Income Name: ${income.income}`); 
}; 

module.exports = { getIncomeById };