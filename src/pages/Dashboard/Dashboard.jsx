import React from 'react';
import {
    Users,
    Activity,
    BedDouble,
    AlertTriangle,
    TrendingUp,
    Clock
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend
} from 'recharts';
import './Dashboard.css';

const patientFlowData = [
    { time: '00:00', admitted: 12, discharged: 5, emergency: 8 },
    { time: '04:00', admitted: 8, discharged: 2, emergency: 15 },
    { time: '08:00', admitted: 45, discharged: 20, emergency: 12 },
    { time: '12:00', admitted: 65, discharged: 40, emergency: 25 },
    { time: '16:00', admitted: 50, discharged: 55, emergency: 30 },
    { time: '20:00', admitted: 30, discharged: 25, emergency: 18 },
];

const departmentData = [
    { name: 'Emergency', occupancy: 95, capacity: 100 },
    { name: 'ICU', occupancy: 42, capacity: 50 },
    { name: 'Cardiology', occupancy: 28, capacity: 40 },
    { name: 'Neurology', occupancy: 15, capacity: 30 },
    { name: 'Pediatrics', occupancy: 35, capacity: 60 },
];

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
                <h1 className="page-title" style={{ marginBottom: 0 }}>Hospital Overview</h1>
                <div className="time-badge">
                    <Clock size={16} />
                    <span>Live Update: {new Date().toLocaleTimeString()}</span>
                </div>
            </div>

            {/* Top Stats Row */}
            <div className="grid-cols-4 stats-grid">
                <div className="card stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'var(--info)', color: 'white' }}>
                        <Users size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Patients</span>
                        <span className="stat-value">1,284</span>
                        <span className="stat-trend success"><TrendingUp size={14} /> +4.5%</span>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'var(--warning)', color: 'white' }}>
                        <BedDouble size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Bed Occupancy</span>
                        <span className="stat-value">82%</span>
                        <span className="stat-trend warning">Near Capacity</span>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
                        <AlertTriangle size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Critical Alerts</span>
                        <span className="stat-value text-danger">12</span>
                        <span className="stat-trend danger">Requires Attention</span>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'var(--success)', color: 'white' }}>
                        <Activity size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Available Staff</span>
                        <span className="stat-value">342</span>
                        <span className="stat-trend">On Duty</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-charts grid-cols-2">
                {/* Patient Flow Area Chart */}
                <div className="card chart-card">
                    <h3 className="chart-title">Patient Flow (24h)</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={patientFlowData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAdmitted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorEmergency" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--danger)" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="var(--danger)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="admitted" stroke="var(--primary)" fillOpacity={1} fill="url(#colorAdmitted)" />
                                <Area type="monotone" dataKey="emergency" stroke="var(--danger)" fillOpacity={1} fill="url(#colorEmergency)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Department Occupancy Bar Chart */}
                <div className="card chart-card">
                    <h3 className="chart-title">Department Occupancy</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={departmentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} layout="vertical">
                                <XAxis type="number" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} width={100} />
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-color)" />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                                />
                                <Legend />
                                <Bar dataKey="occupancy" name="Occupied Beds" stackId="a" fill="var(--secondary)" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="capacity" name="Available Beds" stackId="a" fill="var(--border-color)" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
