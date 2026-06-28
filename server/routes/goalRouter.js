const { Router } = require("express"); 
const { getGoalById, createGoal } = require('../controllers/goalController');

const goalRouter = Router();

goalRouter.get("/", (req, res) => res.send("All Goals")); 

goalRouter.get("/:goalId", getGoalById);

goalRouter.post("/", createGoal)

module.exports = goalRouter;