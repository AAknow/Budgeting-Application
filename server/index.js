// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// User model
class User extends Model {}
User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize, modelName: 'users' });

// Expenses model
class Expenses extends Model {}
User.init({
    expense: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE
}, { sequelize, modelName: 'expenses' });

// Goals model
class Goals extends Model {}
User.init({
    expense: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE
}, { sequelize, modelName: 'goals' });

// Sync models with database
sequelize.sync();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const userRouter = require("./routes/userRouter"); 
const financeRouter = require("./routes/financeRouter"); 
const indexRouter = require("./routes/indexRouter");

app.use("/user", userRouter); 
app.use("/finance", financeRouter); 
app.use("/", indexRouter); 

// Port Listener
const PORT = 8080;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`server listening on port ${PORT}`);
})