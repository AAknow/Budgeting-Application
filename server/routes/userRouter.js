const { Router } = require("express"); 
const { getUserById } = require('../controllers/userController');

const userRouter = Router();

userRouter.get("/", (req, res) => res.send("All Users")); 

userRouter.get("/:userId", getUserById);

//userRouter.get("/", (req, res) => res.send("All Users")); 

//userRouter.get("/:userId", (req, res) => { 
//    const { userId } = req.params; 
//    res.send(`User ID: ${userId}`); 
//}); 


module.exports = userRouter;