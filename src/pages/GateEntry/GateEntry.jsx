import React, { useState, useEffect } from 'react';
import {
    Users,
    Car,
    Ambulance,
    Plus,
    Search,
    Filter,
    CheckCircle2
} from 'lucide-react';
import './GateEntry.css';

const GateEntry = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [recentEntries, setRecentEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5001/api/gate-entries')
            .then(res => res.json())
            .then(data => {
                setRecentEntries(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching gate entries:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="gate-container">
            <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
                <h1 className="page-title" style={{ marginBottom: 0 }}>Gate & Entry Management</h1>
                <div className="flex gap-2">
                    <button className="btn btn-secondary">
                        <Car size={18} /> Register Vehicle
                    </button>
                    <button className="btn btn-primary">
                        <Plus size={18} /> New Entry
                    </button>
                </div>
            </div>

            <div className="grid-cols-3" style={{ marginBottom: '24px' }}>
                <div className="card summary-card">
                    <div className="icon-wrapper bg-blue-subtle text-blue">
                        <Users size={24} />
                    </div>
                    <div className="summary-info">
                        <span className="label">Total Entries Today</span>
                        <span className="value">428</span>
                    </div>
                </div>
                <div className="card summary-card">
                    <div className="icon-wrapper bg-red-subtle text-red">
                        <Ambulance size={24} />
                    </div>
                    <div className="summary-info">
                        <span className="label">Ambulance Arrivals</span>
                        <span className="value">24</span>
                    </div>
                </div>
                <div className="card summary-card">
                    <div className="icon-wrapper bg-green-subtle text-green">
                        <CheckCircle2 size={24} />
                    </div>
                    <div className="summary-info">
                        <span className="label">Active Visitors</span>
                        <span className="value">156</span>
                    </div>
                </div>
            </div>

            <div className="card table-card">
                <div className="table-header flex justify-between items-center">
                    <div className="tabs">
                        <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Entries</button>
                        <button className={`tab ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => setActiveTab('patients')}>Patients</button>
                        <button className={`tab ${activeTab === 'visitors' ? 'active' : ''}`} onClick={() => setActiveTab('visitors')}>Visitors</button>
                        <button className={`tab ${activeTab === 'ambulances' ? 'active' : ''}`} onClick={() => setActiveTab('ambulances')}>Ambulances</button>
                    </div>
                    <div className="table-actions flex gap-2 items-center">
                        <div className="search-box">
                            <Search size={16} />
                            <input type="text" placeholder="Search entries..." />
                        </div>
                        <button className="icon-btn-border"><Filter size={18} /></button>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Entry ID</th>
                                <th>Type</th>
                                <th>Name / Details</th>
                                <th>Time</th>
                                <th>Gate</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center p-4">Loading entries from database...</td>
                                </tr>
                            ) : recentEntries.map((entry) => (
                                <tr key={entry.id}>
                                    <td className="font-medium">{entry.id}</td>
                                    <td>
                                        <span className={`type-badge ${entry.type.toLowerCase()}`}>
                                            {entry.type}
                                        </span>
                                    </td>
                                    <td>{entry.name}</td>
                                    <td>{entry.time}</td>
                                    <td className="text-secondary">{entry.gate}</td>
                                    <td>
                                        <span className={`badge ${entry.status === 'Emergency' ? 'danger'
                                            : entry.status === 'Checked In' ? 'success'
                                                : 'info'
                                            }`}>
                                            {entry.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="link-btn">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GateEntry;
