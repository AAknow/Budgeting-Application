const { Router } = require("express"); 
const { getGoalById } = require('../controllers/goalController');

const goalRouter = Router();

goalRouter.get("/", (req, res) => res.send("All Goals")); 

goalRouter.get("/:goalId", getGoalById);

module.exports = goalRouter;