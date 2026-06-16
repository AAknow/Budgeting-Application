// index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sequelize, User, Expenses, Goals } = require("./models");

// Port Listener
const PORT = 8080;

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//=================================================
//==================//
//      Routes      //
//==================//

const expenseRouter = require("./routes/expenseRouter");
const goalRouter = require("./routes/goalRouter");  
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");

app.use("/user", userRouter); 
app.use("/expense", expenseRouter); 
app.use("/goal", goalRouter);
app.use("/", indexRouter); 

//=================================================
//==================//
// Database Testing //
//==================//

async function checkDatabase() {
    //try {
    //    await sequelize.authenticate();
    //    console.log('Connection has been established successfully.');
    //} catch (error) {
    //    console.error('Unable to connect to the database:', error);
    //}

    // create test user
    const testUser = await User.create({
        id: 1,
        name: "Test User",
        email: "test@example.com",
        password: "password123"
    });

    // check all users
    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log('All users:', JSON.stringify(users, null, 2));
    // check all column names in User table
    let columnNames = Object.keys(User.getAttributes());
    console.log(columnNames);
    
    // create test expense
    const testExpense = await Expenses.create({
        id: 1,
        userId: 1,
        expense: "Test Expense",
        amount: 300.00,
        date: new Date("2026-06-15")
    });

    // check all expenses
    const expenses = await Expenses.findAll();
    console.log(expenses.every(expense => expense instanceof Expenses)); // true
    console.log('All expenses:', JSON.stringify(expenses, null, 2));
    // check all column names in Expenses table
    columnNames = Object.keys(Expenses.getAttributes());
    console.log(columnNames); 

    // check all goals
    const goals = await Goals.findAll();
    console.log(goals.every(goal => goal instanceof Goals)); // true
    console.log('All goals:', JSON.stringify(goals, null, 2));
    // check all column names in Goals table
    columnNames = Object.keys(Goals.getAttributes());
    console.log(columnNames); 
}

//=================================================
//==================//
//     Startup      //
//==================//

// Temporarily updates tables (needs to disable similar lines in main logic)
async function start() {
   try {
        // sync tables (use when done testing)
        //await sequelize.sync();

	    // update tables on restart
        await sequelize.sync({ force: true });

        console.log("Database synced");
	 
	    // run temp database test function
        await checkDatabase();

	    // display if server is up on specified port
        app.listen(PORT, () => {
            console.log(`server listening on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
}

start();

//=================================================