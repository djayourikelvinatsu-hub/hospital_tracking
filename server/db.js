const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'hospital.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create Tables
        db.serialize(() => {
            // Patients Table
            db.run(`CREATE TABLE IF NOT EXISTS patients (
        id TEXT PRIMARY KEY,
        name TEXT,
        age INTEGER,
        gender TEXT,
        status TEXT,
        location TEXT,
        admissionTime TEXT,
        reason TEXT,
        bloodType TEXT,
        allergies TEXT,
        weight TEXT
      )`);

            // Gate Entries Table
            db.run(`CREATE TABLE IF NOT EXISTS gate_entries (
        id TEXT PRIMARY KEY,
        type TEXT,
        name TEXT,
        time TEXT,
        status TEXT,
        gate TEXT
      )`);

            // Departments Table
            db.run(`CREATE TABLE IF NOT EXISTS departments (
        id TEXT PRIMARY KEY,
        name TEXT,
        full INTEGER,
        total INTEGER,
        status TEXT
      )`);

            // Beds Table
            db.run(`CREATE TABLE IF NOT EXISTS beds (
        id TEXT PRIMARY KEY,
        type TEXT,
        status TEXT,
        patient TEXT,
        time TEXT,
        department_id TEXT
      )`);

            // Users Table
            db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        name TEXT,
        role TEXT
      )`);

            console.log('Database tables created or verified.');

            // Initialize with mock data if tables are empty
            db.get("SELECT COUNT(*) AS count FROM patients", (err, row) => {
                if (row && row.count === 0) {
                    seedDatabase();
                }
            });

            // Initialize admin user if users table is empty
            db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
                if (row && row.count === 0) {
                    const stmtUsers = db.prepare("INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)");
                    // Note: In a real app, passwords MUST be hashed (e.g., using bcrypt). Using plaintext here for demo purposes.
                    stmtUsers.run('admin', 'admin123', 'System Administrator', 'admin');
                    stmtUsers.run('doctor', 'doc123', 'Dr. Smith', 'doctor');
                    stmtUsers.run('nurse', 'nurse123', 'Nurse Jackie', 'nurse');
                    stmtUsers.finalize();
                    console.log('Seeded initial users.');
                }
            });
        });
    }
});

function seedDatabase() {
    console.log('Seeding initial data...');

    // Seed Patients
    const stmtPatients = db.prepare("INSERT INTO patients VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    stmtPatients.run('PT-1042', 'Eleanor Vance', 45, 'Female', 'In Treatment', 'ER Bed 4', '08:30 AM', 'Chest Pain', 'O+', 'Penicillin', '68 kg');
    stmtPatients.run('PT-1043', 'Marcus Johnson', 62, 'Male', 'Admitted', 'Ward B, Room 204', '09:15 AM', 'Post-op Review', 'A-', 'None', '82 kg');
    stmtPatients.run('PT-1044', 'Sarah Connor', 29, 'Female', 'Triage', 'Waiting Area 1', '10:05 AM', 'Laceration', 'B+', 'Peanuts', '55 kg');
    stmtPatients.finalize();

    // Seed Gate Entries
    const stmtGate = db.prepare("INSERT INTO gate_entries VALUES (?, ?, ?, ?, ?, ?)");
    stmtGate.run('ENT-892', 'Patient', 'John Doe', '10:42 AM', 'Checked In', 'Main Gate');
    stmtGate.run('ENT-893', 'Ambulance', 'Unit A-04', '10:45 AM', 'Emergency', 'ER Bay 1');
    stmtGate.run('ENT-894', 'Visitor', 'Sarah Connor', '10:50 AM', 'Checked In', 'Main Gate');
    stmtGate.finalize();

    // Seed Departments
    const stmtDept = db.prepare("INSERT INTO departments VALUES (?, ?, ?, ?, ?)");
    stmtDept.run('ER', 'Emergency Room', 42, 45, 'critical');
    stmtDept.run('ICU', 'Intensive Care Unit', 18, 20, 'warning');
    stmtDept.run('WA', 'Ward A (General)', 45, 60, 'normal');
    stmtDept.finalize();

    // Seed Beds
    const stmtBeds = db.prepare("INSERT INTO beds VALUES (?, ?, ?, ?, ?, ?)");
    stmtBeds.run('B-101', 'Standard', 'Occupied', 'Sarah Jennings', '2 Days', 'WA');
    stmtBeds.run('B-102', 'Standard', 'Available', '-', '-', 'WA');
    stmtBeds.run('B-103', 'Standard', 'Cleaning', '-', '-', 'WA');
    stmtBeds.run('B-104', 'Isolation', 'Occupied', 'Michael Chang', '5 Hrs', 'WA');
    stmtBeds.finalize();

    console.log('Seeding complete.');
}

module.exports = db;
