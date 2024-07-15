const { DataTypes } = require('sequelize');
const sequelize = require('../src/database');

const User = sequelize.define('User', {
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 10000,
        allowNull: false
    }
});

module.exports = User;