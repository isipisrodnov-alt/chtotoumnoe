const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; 
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost', 
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'shop',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'kotik30897',
});

pool.getConnection()
    .then(() => {
        console.log('Подключение к MySQL установлено');
    })
    .catch(err => {
        console.error('Ошибка подключения к MySQL:', err);
    });

app.get('/api/test', (req, res) => {
    res.json({ message: 'API работает!', timestamp: new Date() });
});

app.get('/api/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT NOW() as current_time');
        res.json({ 
            message: 'Подключение к БД работает!',
            current_time: rows[0].current_time
        });
    } catch (error) {
        console.error('Ошибка теста БД:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/appointments/simple', async (req, res) => {
    try {
        console.log('Запрос к appointments...');
        const [rows] = await pool.query('SELECT * FROM Appointments LIMIT 5'); 
        console.log(`Найдено записей: ${rows.length}`); 
        res.json(rows);
    } catch (error) {
        console.error('Ошибка запроса appointments:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/appointments', async (req, res) => {
    try {
        console.log('Полный запрос к appointments...');
        
        const [simpleResult] = await pool.query('SELECT COUNT(*) as count FROM Appointments'); 
        console.log(`📈 Всего записей: ${simpleResult[0].count}`); 
        
        const [rows] = await pool.query(`
            SELECT 
                a.id,
                a.user_id,
                a.service_id,
                a.appointment_date
            FROM appointments a
            ORDER BY a.appointment_date DESC
        `); 

        console.log(`Результат: ${rows.length} записей`);
        res.json(rows);
        
    } catch (error) {
        console.error('Ошибка полного запроса:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/payments/simple', async (req, res) => {
    try {
        console.log('Запрос к payments...');
        const [rows] = await pool.query('SELECT * FROM Payments LIMIT 5');
        console.log(`Найдено записей: ${rows.length}`);
        res.json(rows);
    } catch (error) {
        console.error('Ошибка запроса payments:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/payments', async (req, res) => {
    try {
        console.log('Полный запрос к payments...');
        
        const [simpleResult] = await pool.query('SELECT COUNT(*) as count FROM Payments');
        console.log(`📈 Всего записей: ${simpleResult[0].count}`);
        
        const [rows] = await pool.query(`
            SELECT 
                p.id,
                p.appointment_id,
                p.amount,
                p.payment_date
            FROM Payments p
            ORDER BY p.payment_date DESC
        `);
        
        console.log(`Результат: ${rows.length} записей`);
        res.json(rows);
        
    } catch (error) {
        console.error('Ошибка полного запроса:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/roles/simple', async (req, res) => {
    try {
        console.log('Запрос к roles...');
        const [rows] = await pool.query('SELECT * FROM Roles LIMIT 5');
        console.log(`Найдено записей: ${rows.length}`);
        res.json(rows);
    } catch (error) {
        console.error('Ошибка запроса roles:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/roles', async (req, res) => {
    try {
        console.log('Полный запрос к roles...');
        
        const [simpleResult] = await pool.query('SELECT COUNT(*) as count FROM Roles');
        console.log(`📈 Всего записей: ${simpleResult[0].count}`);
        
        const [rows] = await pool.query(`
            SELECT 
                r.id,
                r.role_name
            FROM Roles r
        `);
        
        console.log(`Результат: ${rows.length} записей`);
        res.json(rows);
        
    } catch (error) {
        console.error('Ошибка полного запроса:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/services/simple', async (req, res) => {
    try {
        console.log('Запрос к services...');
        const [rows] = await pool.query('SELECT * FROM Services LIMIT 5');
        console.log(`Найдено записей: ${rows.length}`);
        res.json(rows);
    } catch (error) {
        console.error('Ошибка запроса services:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/services', async (req, res) => {
    try {
        console.log('Полный запрос к services...');
        
        const [simpleResult] = await pool.query('SELECT COUNT(*) as count FROM Services');
        console.log(`📈 Всего записей: ${simpleResult[0].count}`);
        
        const [rows] = await pool.query(`
            SELECT 
                s.id,
                s.service_name,
                s.price
            FROM Services s
        `);
        
        console.log(`Результат: ${rows.length} записей`);
        res.json(rows);
        
    } catch (error) {
        console.error('Ошибка полного запроса:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/users/simple', async (req, res) => {
    try {
        console.log('Запрос к users...');
        const [rows] = await pool.query('SELECT * FROM Users LIMIT 5');
        console.log(`Найдено записей: ${rows.length}`);
        res.json(rows);
    } catch (error) {
        console.error('Ошибка запроса users:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        console.log('Полный запрос к users...');
        
        const [simpleResult] = await pool.query('SELECT COUNT(*) as count FROM Users');
        console.log(`📈 Всего записей: ${simpleResult[0].count}`);
        
        const [rows] = await pool.query(`
            SELECT 
                u.id,
                u.username,
                u.password,
                u.role_id
            FROM Users u
        `);
        
        console.log(`Результат: ${rows.length} записей`);
        res.json(rows);
        
    } catch (error) {
        console.error('Ошибка полного запроса:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log('Тестовые endpoints:');
    console.log(`1) http://localhost:${PORT}/api/test`);
    console.log(`2) http://localhost:${PORT}/api/test-db`);
    console.log(`3) http://localhost:${PORT}/api/appointments/simple`);
    console.log(`4) http://localhost:${PORT}/api/appointments`);
    console.log(`5) http://localhost:${PORT}/api/payments/simple`);
    console.log(`6) http://localhost:${PORT}/api/payments`);
    console.log(`7) http://localhost:${PORT}/api/roles/simple`);
    console.log(`8) http://localhost:${PORT}/api/roles`);
    console.log(`9) http://localhost:${PORT}/api/services/simple`);
    console.log(`10) http://localhost:${PORT}/api/services`);
    console.log(`11) http://localhost:${PORT}/api/users/simple`);
    console.log(`12) http://localhost:${PORT}/api/users`);
});