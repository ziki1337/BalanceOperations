const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('DataBase9', 'Belokurov', 'qwerty123', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;