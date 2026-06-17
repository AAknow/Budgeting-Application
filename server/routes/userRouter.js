const { Router } = require("express"); 
const { getUserById } = require('../controllers/userController');

const userRouter = Router();

userRouter.get("/", (req, res) => res.send("All Users")); 

userRouter.get("/:userId", getUserById);

module.exports = userRouter;