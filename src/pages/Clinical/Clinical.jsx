import React, { useState } from 'react';
import {
    FileSignature,
    FlaskConical,
    Pill,
    Syringe,
    ClipboardList,
    ChevronRight,
    CheckCircle2,
    AlertCircle,
    Activity
} from 'lucide-react';
import './Clinical.css';

const patients = [
    { id: 'PT-1042', name: 'Eleanor Vance', age: 45, reason: 'Chest Pain' },
    { id: 'PT-1043', name: 'Marcus Johnson', age: 62, reason: 'Post-op Review' },
    { id: 'PT-1044', name: 'Sarah Connor', age: 29, reason: 'Laceration' },
];

const labResults = [
    { test: 'Complete Blood Count', date: 'Today, 09:30 AM', status: 'Completed', result: 'Normal' },
    { test: 'Troponin Levels', date: 'Today, 09:35 AM', status: 'Completed', result: 'Elevated' },
    { test: 'Lipid Panel', date: 'Today, 09:40 AM', status: 'Pending', result: '-' },
];

const prescriptions = [
    { drug: 'Aspirin', dosage: '81mg', frequency: 'Once daily', duration: '30 days', status: 'Active' },
    { drug: 'Atorvastatin', dosage: '40mg', frequency: 'Once daily (evening)', duration: '90 days', status: 'Active' },
];

const Clinical = () => {
    const [activeTab, setActiveTab] = useState('Consultation');

    return (
        <div className="clinical-container">
            <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
                <h1 className="page-title" style={{ marginBottom: 0 }}>Clinical Tracking</h1>
                <div className="flex gap-2">
                    <button className="btn btn-secondary">
                        <ClipboardList size={18} /> View OR Schedule
                    </button>
                    <button className="btn btn-primary">
                        + New Assessment
                    </button>
                </div>
            </div>

            <div className="clinical-layout">
                <div className="card patient-queue">
                    <div className="queue-header">
                        <h3>My Patients Queue</h3>
                    </div>
                    <div className="queue-list">
                        {patients.map((p, idx) => (
                            <div key={idx} className={`queue-item ${idx === 0 ? 'active' : ''}`}>
                                <div className="flex justify-between items-center w-full">
                                    <div>
                                        <h4 className="font-medium text-primary-color">{p.name}</h4>
                                        <p className="text-xs text-secondary">{p.id} • {p.age}y</p>
                                        <p className="text-sm mt-1"><strong>Reason:</strong> {p.reason}</p>
                                    </div>
                                    <ChevronRight size={20} className="text-secondary" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="clinical-workspace">
                    <div className="workspace-header card" style={{ padding: '16px 24px', marginBottom: '24px' }}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="avatar">E</div>
                                <div>
                                    <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Eleanor Vance <span className="text-secondary font-normal" style={{ fontSize: '1rem' }}> (PT-1042)</span></h2>
                                    <div className="flex gap-4 text-sm font-medium">
                                        <span className="text-danger flex items-center gap-1"><AlertCircle size={14} /> Critical</span>
                                        <span className="text-secondary flex items-center gap-1"><Activity size={14} /> HR: 95 bpm</span>
                                        <span className="text-secondary flex items-center gap-1"><Syringe size={14} /> BP: 145/90</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card h-full flex-col p-0">
                        <div className="tabs" style={{ padding: '0 24px', borderBottom: '1px solid var(--border-color)' }}>
                            <button className={`tab ${activeTab === 'Consultation' ? 'active' : ''}`} onClick={() => setActiveTab('Consultation')}><FileSignature size={16} className="inline mr-1" /> Consultation Notes</button>
                            <button className={`tab ${activeTab === 'Labs' ? 'active' : ''}`} onClick={() => setActiveTab('Labs')}><FlaskConical size={16} className="inline mr-1" /> Lab & Tests</button>
                            <button className={`tab ${activeTab === 'Prescriptions' ? 'active' : ''}`} onClick={() => setActiveTab('Prescriptions')}><Pill size={16} className="inline mr-1" /> Prescriptions</button>
                        </div>

                        <div className="workspace-content p-6 flex-1 overflow-y-auto">
                            {activeTab === 'Consultation' && (
                                <div className="notes-section">
                                    <div className="alert-box warning mb-4">
                                        <strong>Chief Complaint:</strong> Patient arrived with acute chest pain, radiating to left arm. Shortness of breath.
                                    </div>
                                    <textarea
                                        className="clinical-textarea"
                                        placeholder="Enter examination notes here..."
                                        rows={8}
                                        defaultValue="Patient appears anxious and diaphoretic. Heart sounds normal, no murmurs. Lungs clear to auscultation bilaterally. 
                    
Plan: STAT ECG, Trop levels, Lipid panel. Start Aspirin 81mg. Adm to ER bed 4 for observation."
                                    ></textarea>
                                    <div className="flex justify-end mt-4">
                                        <button className="btn btn-primary">Save Notes</button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Labs' && (
                                <div className="labs-section">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3>Recent Lab Results</h3>
                                        <button className="link-btn font-medium">+ Order New Test</button>
                                    </div>
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Test Name</th>
                                                <th>Ordered/Resulted</th>
                                                <th>Status</th>
                                                <th>Result</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {labResults.map((lab, i) => (
                                                <tr key={i}>
                                                    <td className="font-medium">{lab.test}</td>
                                                    <td className="text-secondary">{lab.date}</td>
                                                    <td>
                                                        <span className={`badge ${lab.status === 'Completed' ? 'success' : 'warning'}`}>
                                                            {lab.status}
                                                        </span>
                                                    </td>
                                                    <td className={lab.result === 'Elevated' ? 'text-danger font-bold' : ''}>
                                                        {lab.result}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === 'Prescriptions' && (
                                <div className="rx-section">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3>Active Prescriptions</h3>
                                        <button className="link-btn font-medium">+ New E-Prescription</button>
                                    </div>
                                    <div className="grid-cols-2">
                                        {prescriptions.map((rx, i) => (
                                            <div key={i} className="rx-card border rounded p-4 flex justify-between items-start" style={{ borderColor: 'var(--border-color)' }}>
                                                <div>
                                                    <h4 className="font-bold flex items-center gap-2 mb-1">
                                                        <Pill size={16} className="text-primary" /> {rx.drug}
                                                    </h4>
                                                    <div className="text-sm font-medium mb-1">{rx.dosage} • {rx.frequency}</div>
                                                    <div className="text-xs text-secondary">Duration: {rx.duration}</div>
                                                </div>
                                                <span className="badge success flex items-center gap-1"><CheckCircle2 size={12} /> {rx.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clinical;
