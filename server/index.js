const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const PORT = 5001;

app.use(cors());
app.use(express.json());

// --- SOCKET.IO ---
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Simulate random critical alerts every 45 seconds for demo purposes
    const alertInterval = setInterval(() => {
        const alerts = [
            { type: 'emergency', message: 'Incoming Code Blue - ETA 5 mins' },
            { type: 'warning', message: 'ICU Bed Capacity at 95%' },
            { type: 'info', message: 'Dr. Smith has started rounds in Ward A' }
        ];
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        socket.emit('hospital_alert', randomAlert);
    }, 45000);

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        clearInterval(alertInterval);
    });
});

// --- AUTH API ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // NOTE: This uses plaintext passwords for demo simulation. Real apps should use bcrypt/hashing.
    db.get("SELECT id, username, name, role FROM users WHERE username = ? AND password = ?", [username, password], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        // Simulate a successful login with a mock token
        res.json({
            message: 'Login successful',
            token: `mock-jwt-token-${user.id}`,
            user: user
        });
    });
});

// --- PATIENTS API ---
app.get('/api/patients', (req, res) => {
    db.all("SELECT * FROM patients", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/patients', (req, res) => {
    const { id, name, age, gender, status, location, admissionTime, reason, bloodType, allergies, weight } = req.body;
    const sql = `INSERT INTO patients (id, name, age, gender, status, location, admissionTime, reason, bloodType, allergies, weight) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [id, name, age, gender, status, location, admissionTime, reason, bloodType, allergies, weight], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: id || this.lastID, message: 'Patient added successfully' });
    });
});

// --- GATE ENTRIES API ---
app.get('/api/gate-entries', (req, res) => {
    db.all("SELECT * FROM gate_entries", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- DEPARTMENTS API ---
app.get('/api/departments', (req, res) => {
    db.all("SELECT * FROM departments", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- BEDS API ---
app.get('/api/beds', (req, res) => {
    const { dept } = req.query;
    let sql = "SELECT * FROM beds";
    let params = [];

    if (dept) {
        sql += " WHERE department_id = ?";
        params.push(dept);
    }

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- START SERVER ---
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
