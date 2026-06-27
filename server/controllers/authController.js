const { User } = require("../models");

//=================================================
//==================//
//      Login       //
//==================//

async function login(req, res) {
    try {
        const { email, password } = req.body;

        //check that both fields were provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required."
            });
        };

        // Find the user by email
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            })
        };

        // Check Password
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password."
            })
        };

        // Login Successful
        return res.status(200).json({
            message: "Login Successful!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Server Error."
        });
    }
}

//=================================================
//==================//
//      Login       //
//==================//

async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        //check that all fields were provided
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill out all fields."
            });
        };

        // Check if email already exists
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with that email already exists."
            })
        };

        //Create the user
        const newUser = await User.create({
            name,
            email,
            password
        });

        return res.status(201).json({
            message: "Account Created Succesfully!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Server Error."
        });
    }
};

module.exports = {login, signup};