import React, { useState, useEffect } from 'react';
import {
    UserPlus,
    Search,
    Filter,
    MapPin,
    Clock,
    Activity,
    FileText,
    ChevronDown
} from 'lucide-react';
import './PatientRecords.css';

const patientJourney = [
    { time: '08:30 AM', event: 'Admission via Main Gate', details: 'Walk-in patient, complained of chest pain.', status: 'completed' },
    { time: '08:45 AM', event: 'Triage Assessment', details: 'Vitals taken. Priority Level: High.', status: 'completed' },
    { time: '09:10 AM', event: 'Doctor Consultation', details: 'Dr. Smith evaluated patient. Ordered ECG and Blood tests.', status: 'completed' },
    { time: '09:30 AM', event: 'Laboratory Tests', details: 'Blood drawn, sent to lab.', status: 'completed' },
    { time: '10:15 AM', event: 'Treatment Room Placement', details: 'Moved to ER Bed 4 for observation pending results.', status: 'active' },
    { time: 'Pending', event: 'Final Diagnosis & Action', details: 'Awaiting lab results to determine admission or discharge.', status: 'pending' },
];

const PatientRecords = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [deptFilter, setDeptFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5001/api/patients')
            .then(res => res.json())
            .then(data => {
                setPatients(data);
                if (data.length > 0) {
                    setSelectedPatient(data[0]);
                }
                setLoading(false);
            })
            .catch(err => console.error("Error fetching patients:", err));
    }, []);

    // Derived state for filtering
    const filteredPatients = patients.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
        // Basic mapping for demo since DB just stores string location right now
        const matchesDept = deptFilter === 'All' || p.location.includes(deptFilter);

        return matchesSearch && matchesStatus && matchesDept;
    });

    return (
        <div className="patients-container">
            <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
                <h1 className="page-title" style={{ marginBottom: 0 }}>Patient Records & Flow</h1>
                <button className="btn btn-primary">
                    <UserPlus size={18} /> Register Patient
                </button>
            </div>

            <div className="patients-layout">
                {/* Left Column: Patient List */}
                <div className="card patient-list-card">
                    <div className="list-header">
                        <div className="flex justify-between items-center mb-3">
                            <h3 style={{ margin: 0 }}>Active Patients</h3>
                            <span className="badge info">{filteredPatients.length} Total</span>
                        </div>

                        <div className="search-box w-full mb-3">
                            <Search size={16} />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                className="w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 filters-row">
                            <select
                                className="filter-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Statuses</option>
                                <option value="In Treatment">In Treatment</option>
                                <option value="Admitted">Admitted</option>
                                <option value="Triage">Triage</option>
                                <option value="Discharged">Discharged</option>
                            </select>

                            <select
                                className="filter-select"
                                value={deptFilter}
                                onChange={(e) => setDeptFilter(e.target.value)}
                            >
                                <option value="All">All Departments</option>
                                <option value="ER">Emergency (ER)</option>
                                <option value="Ward">Wards</option>
                                <option value="ICU">ICU</option>
                            </select>
                        </div>
                    </div>

                    <div className="patient-list">
                        {loading ? (
                            <div className="p-8 text-center text-secondary">Loading patients...</div>
                        ) : filteredPatients.length === 0 ? (
                            <div className="p-8 text-center text-secondary">No patients found.</div>
                        ) : (
                            filteredPatients.map((patient) => (
                                <div
                                    key={patient.id}
                                    className={`patient-list-item ${selectedPatient?.id === patient.id ? 'active' : ''}`}
                                    onClick={() => setSelectedPatient(patient)}
                                >
                                    <div className="item-main">
                                        <span className="patient-name">{patient.name}</span>
                                        <span className="patient-id">{patient.id}</span>
                                    </div>
                                    <div className="item-details">
                                        <div className="flex items-center gap-1 text-secondary" style={{ fontSize: '0.75rem' }}>
                                            <MapPin size={12} /> {patient.location}
                                        </div>
                                        <span className={`badge ${patient.status === 'Triage' ? 'warning' : patient.status === 'In Treatment' ? 'info' : 'success'}`}>
                                            {patient.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column: Patient Details & Journey */}
                <div className="patient-details-wrapper">
                    {selectedPatient ? (
                        <>
                            <div className="card profile-card">
                                <div className="profile-header flex justify-between items-start">
                                    <div className="profile-info flex gap-4 items-center">
                                        <div className="profile-avatar">
                                            {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h2>{selectedPatient.name}</h2>
                                            <div className="flex gap-3 text-secondary text-sm mt-1">
                                                <span>{selectedPatient.id}</span>
                                                <span>•</span>
                                                <span>{selectedPatient.age} yrs, {selectedPatient.gender}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1"><MapPin size={14} /> {selectedPatient.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="icon-btn-border"><FileText size={18} /></button>
                                        <button className="icon-btn-border"><Activity size={18} /></button>
                                    </div>
                                </div>

                                <div className="profile-stats grid-cols-4 mt-6">
                                    <div className="p-stat">
                                        <span className="p-label">Blood Type</span>
                                        <span className="p-value">O+</span>
                                    </div>
                                    <div className="p-stat">
                                        <span className="p-label">Allergies</span>
                                        <span className="p-value text-danger">Penicillin</span>
                                    </div>
                                    <div className="p-stat">
                                        <span className="p-label">Weight</span>
                                        <span className="p-value">68 kg</span>
                                    </div>
                                    <div className="p-stat">
                                        <span className="p-label">Admitted</span>
                                        <span className="p-value"><Clock size={14} className="inline mr-1" /> {selectedPatient.admissionTime}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card journey-card mt-4">
                                <div className="flex justify-between items-center mb-6">
                                    <h3>Patient Journey Tracker</h3>
                                    <span className="text-sm text-secondary">Started {selectedPatient.admissionTime}</span>
                                </div>

                                <div className="timeline">
                                    {patientJourney.map((step, index) => (
                                        <div key={index} className={`timeline-step ${step.status}`}>
                                            <div className="timeline-marker"></div>
                                            <div className="timeline-content">
                                                <div className="timeline-time">{step.time}</div>
                                                <div className="timeline-event">
                                                    <h4>{step.event}</h4>
                                                    <p>{step.details}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="card h-full flex items-center justify-center text-secondary">
                            {loading ? 'Loading patient details...' : 'Select a patient to view details'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientRecords;
