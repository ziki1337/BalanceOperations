const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('./database');

const umzug = new Umzug({
    migrations: {
        glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize }),
    context: sequelize.getQueryInterface(),
    logger: console,
});

const runMigrations = async () => {
    try {
        await umzug.up();
        console.log('All migrations performed successfully');
    } catch (error) {
        console.error('Migration failed', error);
    }
};

runMigrations();