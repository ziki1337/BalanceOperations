const express = require('express');
const sequelize = require('./database');
const User = require('../models/user');

const app = express();
const port = 2727;

app.use(express.json());

// Маршрут для получения всех пользователей
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        res.status(500).json({ error: 'Ошибка сервера при получении пользователей' });
    }
});

// Маршрут для обновления баланса пользователя в меньшую сторону
app.post('/users/update-balance', async (req, res) => {
    const { userId, amount } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        if (user.balance < amount) {
            return res.status(400).json({ error: 'Недостаточно средств на балансе' });
        }

        user.balance -= amount;
        await user.save();

        return res.json({ message: 'Баланс успешно обновлен' });
    } catch (error) {
        console.error('Ошибка при обновлении баланса:', error);
        return res.status(500).json({ error: 'Ошибка сервера при обновлении баланса' });
    }
});
//В большую сторону
app.post('/users/update-balance-plus', async (req, res) => {
    const { userId, amount } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        user.balance += amount;
        await user.save();

        return res.json({ message: 'Баланс успешно обновлен' });
    } catch (error) {
        console.error('Ошибка при обновлении баланса:', error);
        return res.status(500).json({ error: 'Ошибка сервера при обновлении баланса' });
    }
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение с базой данных установлено успешно.');

        await sequelize.sync();
        console.log('Синхронизация базы данных выполнена успешно.');

        app.listen(port, () => {
            console.log(`Сервер запущен на http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Ошибка при запуске сервера:', error);
    }
};

startServer();