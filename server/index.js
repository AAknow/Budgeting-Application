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
Expenses.init({
    expense: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE
}, { sequelize, modelName: 'expenses' });

// Goals model
class Goals extends Model {}
Goals.init({
    goal: DataTypes.STRING,
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


//-----------------------------------------

// Testing Database Connection
async function checkDatabase() {
    //try {
    //    await sequelize.authenticate();
    //    console.log('Connection has been established successfully.');
    //} catch (error) {
    //    console.error('Unable to connect to the database:', error);
    //}

    // check all users
    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log('All users:', JSON.stringify(users, null, 2));

    // check all expenses
    const expenses = await Expenses.findAll();
    console.log(expenses.every(expense => expense instanceof Expenses)); // true
    console.log('All expenses:', JSON.stringify(expenses, null, 2));

    // check all goals
    const goals = await Goals.findAll();
    console.log(goals.every(goal => goal instanceof Goals)); // true
    console.log('All goals:', JSON.stringify(goals, null, 2));
}

checkDatabase();

//-----------------------------------------