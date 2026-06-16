// controllers/userController.js 
const { User } = require("../models"); 

async function getUserById(req, res) { 
    const { userId } = req.params; 
    const user = await User.findByPk(userId); 

    if (!user) { 
        res.status(404).send("User not found");
        return; 
    } 
    res.send(`User Name: ${user.name}`); 
}; 

module.exports = { getUserById };
