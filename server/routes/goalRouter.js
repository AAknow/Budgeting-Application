const { Router } = require("express"); 
const goalRouter = Router();
 
goalRouter.get("/", (req, res) => res.send("All Goals")); 

goalRouter.get("/:goalId", (req, res) => { 
    const { goalId } = req.params; 
    res.send(`Goal ID: ${goalId}`); 
}); 

module.exports = goalRouter;