const { Sequelize, Model, DataTypes } = require('sequelize');

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

// Create database relationships
User.hasMany(Expenses);
User.hasMany(Goals);

// Export everything
module.exports = {
    sequelize,
    User,
    Expenses,
    Goals
};