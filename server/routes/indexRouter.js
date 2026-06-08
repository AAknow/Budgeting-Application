const { Router } = require("express"); 
const indexRouter = Router();
 
indexRouter.get("/", (req, res) => res.send("Full Index")); 

indexRouter.get("/:indexId", (req, res) => { 
    const { indexId } = req.params; 
    res.send(`Index ID: ${indexId}`); 
});

module.exports = indexRouter;