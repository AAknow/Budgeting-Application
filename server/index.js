// index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

// Port Listener
const PORT = 8080;

//=================================================
//==================//
//  Database Setup  //
//==================//

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// User model
class User extends Model {}
User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUID.V4,
        allowNull: false
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize, modelName: 'users' });

// Expenses model
class Expenses extends Model {}
Expenses.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUID.V4,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'User',
            key: 'id',
        }
    },
    expense: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE
}, { sequelize, modelName: 'expenses' });

// Goals model
class Goals extends Model {}
Goals.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUID.V4,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'User',
            key: 'id',
        }
    },
    goal: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE
}, { sequelize, modelName: 'goals' });

// Sync models with database (is currently being applied in the start function)
//sequelize.sync();

// Create database relationships
User.hasMany(Expenses);
User.hasMany(Goals);

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//=================================================
//==================//
//      Routes      //
//==================//

// Routes
const userRouter = require("./routes/userRouter"); 
const financeRouter = require("./routes/financeRouter"); 
const indexRouter = require("./routes/indexRouter");

app.use("/user", userRouter); 
app.use("/finance", financeRouter); 
app.use("/", indexRouter); 

//=================================================
//==================//
// Database Testing //
//==================//

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
    const user = await User.findByPk(0);
    console.log(users.every(user => user instanceof User)); // true
    console.log('All users:', JSON.stringify(users, null, 2));
    // check all column names in User table
    let columnNames = Object.keys(User.getAttributes());
    console.log(columnNames); 

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
	 // update tables
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