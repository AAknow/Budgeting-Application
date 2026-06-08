const { Router } = require("express"); 
const financeRouter = Router();
 
financeRouter.get("/", (req, res) => res.send("All Finances")); 

financeRouter.get("/:financeId", (req, res) => { 
    const { financeId } = req.params; 
    res.send(`Finance ID: ${financeId}`); 
}); 

module.exports = financeRouter;