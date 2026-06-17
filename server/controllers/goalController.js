// controllers/goalController.js 
const { Goals } = require("../models"); 

async function getGoalById(req, res) { 
    const { goalId } = req.params; 
    const goal = await Goals.findByPk(goalId); 

    if (!goal) { 
        res.status(404).send("Goal not found");
        return; 
    } 
    res.send(`Goal Name: ${goal.goal}`); 
}; 

module.exports = { getGoalById };