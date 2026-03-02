import React, { useState } from 'react';
import {
    Calendar as CalendarIcon,
    Clock,
    UserCircle,
    Stethoscope,
    BriefcaseMedical,
    Phone,
    MoreVertical
} from 'lucide-react';
import './Staff.css';

const onDutyStaff = [
    { id: 'Dr. Sarah Jenkins', role: 'Head of ER', type: 'Doctor', shift: '08:00 - 16:00', dept: 'Emergency', status: 'Active' },
    { id: 'Dr. Michael Chen', role: 'Surgeon', type: 'Doctor', shift: '08:00 - 18:00', dept: 'Surgery', status: 'In OR' },
    { id: 'Nurse Emily Davis', role: 'Charge Nurse', type: 'Nurse', shift: '06:00 - 14:00', dept: 'ICU', status: 'Active' },
    { id: 'Nurse Robert Fox', role: 'Triage Nurse', type: 'Nurse', shift: '08:00 - 16:00', dept: 'Emergency', status: 'Break' },
    { id: 'Dr. John Smith', role: 'Cardiologist', type: 'Doctor', shift: '09:00 - 17:00', dept: 'Cardiology', status: 'Consulting' },
];

const Staff = () => {
    const [activeView, setActiveView] = useState('Today');

    return (
        <div className="staff-container">
            <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
                <h1 className="page-title" style={{ marginBottom: 0 }}>Staff & Scheduling</h1>
                <div className="flex gap-2">
                    <button className="btn btn-secondary">
                        <CalendarIcon size={18} /> View Roster
                    </button>
                    <button className="btn btn-primary">
                        + Assign Shift
                    </button>
                </div>
            </div>

            <div className="grid-cols-3" style={{ marginBottom: '24px' }}>
                <div className="card stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                        <Stethoscope size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Doctors on Duty</span>
                        <span className="stat-value">42</span>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'var(--secondary)', color: 'white' }}>
                        <BriefcaseMedical size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Nurses on Duty</span>
                        <span className="stat-value">118</span>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'var(--warning)', color: 'white' }}>
                        <Clock size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Next Shift Change</span>
                        <span className="stat-value">14:00</span>
                    </div>
                </div>
            </div>

            <div className="card h-full flex-col">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <div className="tabs">
                        <button className={`tab ${activeView === 'Today' ? 'active' : ''}`} onClick={() => setActiveView('Today')}>Active Shift (Today)</button>
                        <button className={`tab ${activeView === 'Upcoming' ? 'active' : ''}`} onClick={() => setActiveView('Upcoming')}>Upcoming (Tomorrow)</button>
                        <button className={`tab ${activeView === 'All' ? 'active' : ''}`} onClick={() => setActiveView('All')}>All Staff</button>
                    </div>
                </div>

                <div className="staff-list">
                    {onDutyStaff.map((staff, idx) => (
                        <div key={idx} className="staff-card">
                            <div className="flex items-start gap-4">
                                <div className={`avatar-large ${staff.type === 'Doctor' ? 'bg-primary' : 'bg-secondary'}`}>
                                    {staff.type === 'Doctor' ? <Stethoscope size={30} color="white" /> : <UserCircle size={30} color="white" />}
                                </div>
                                <div className="staff-details">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="staff-name">{staff.id}</h3>
                                            <p className="staff-role">{staff.role} • {staff.dept}</p>
                                        </div>
                                        <span className={`badge ${staff.status === 'Active' ? 'success' :
                                                staff.status === 'In OR' ? 'danger' :
                                                    staff.status === 'Break' ? 'warning' : 'info'
                                            }`}>
                                            {staff.status}
                                        </span>
                                    </div>

                                    <div className="staff-meta flex gap-4 mt-3">
                                        <span className="meta-item text-secondary font-medium">
                                            <Clock size={16} /> {staff.shift}
                                        </span>
                                        <span className="meta-item link-btn">
                                            <Phone size={16} /> Contact
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className="icon-btn-border ml-auto" style={{ border: 'none' }}>
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    ))}
                    {onDutyStaff.map((staff, idx) => (
                        <div key={`${idx}-clone`} className="staff-card">
                            <div className="flex items-start gap-4">
                                <div className={`avatar-large ${staff.type === 'Doctor' ? 'bg-primary' : 'bg-secondary'}`}>
                                    {staff.type === 'Doctor' ? <Stethoscope size={30} color="white" /> : <UserCircle size={30} color="white" />}
                                </div>
                                <div className="staff-details">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="staff-name">{staff.id.replace('Dr', 'Dr (Res)')}</h3>
                                            <p className="staff-role">{staff.role} Review • {staff.dept}</p>
                                        </div>
                                        <span className={`badge info`}>
                                            Rounding
                                        </span>
                                    </div>

                                    <div className="staff-meta flex gap-4 mt-3">
                                        <span className="meta-item text-secondary font-medium">
                                            <Clock size={16} /> {staff.shift}
                                        </span>
                                        <span className="meta-item link-btn">
                                            <Phone size={16} /> Contact
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className="icon-btn-border ml-auto" style={{ border: 'none' }}>
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Staff;
