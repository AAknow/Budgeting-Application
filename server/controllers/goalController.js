// controllers/goalController.js 
const { Goals } = require("../models");

// Get Goal by Id
async function getGoalById(req, res) {
    const { goalId } = req.params;

    const goal = await Goals.findByPk(goalId);

    if (!goal) {
        return res.status(404).send("Goal not found");
    }

    res.send(`Goal Name: ${goal.goal}`);
}

// Create goal
async function createGoal(req, res) {
    try {
        console.log(req.body);

        const { userId, goal, amount, date } = req.body;

        if (!userId || !goal || !amount) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const newGoal = await Goals.create({
            userId,
            goal,
            amount,
            date
        });

        return res.status(201).json({
            message: "Goal created successfully",
            data: newGoal
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = { getGoalById, createGoal };
