import React, { useState, useEffect } from 'react';
import {
    Building2,
    Bed,
    Settings,
    AlertCircle
} from 'lucide-react';
import { API_BASE_URL } from '../../config';
import './Facility.css';

const Facility = () => {
    const [departments, setDepartments] = useState([]);
    const [activeDept, setActiveDept] = useState(null);
    const [bedData, setBedData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch departments on load
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/departments`)
            .then(res => res.json())
            .then(data => {
                setDepartments(data);
                if (data.length > 0) {
                    setActiveDept(data[2] || data[0]); // Default to Ward A if exists
                }
                setLoading(false);
            })
            .catch(err => console.error('Error fetching departments:', err));
    }, []);

    // Fetch beds when active department changes
    useEffect(() => {
        if (!activeDept) return;

        fetch(`${API_BASE_URL}/api/beds?dept=${activeDept.id}`)
            .then(res => res.json())
            .then(data => setBedData(data))
            .catch(err => console.error('Error fetching beds:', err));
    }, [activeDept]);

    return (
        <div className="facility-container">
            <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
                <h1 className="page-title" style={{ marginBottom: 0 }}>Department & Facility Management</h1>
                <button className="btn btn-secondary">
                    <Settings size={18} /> Manage Assets
                </button>
            </div>

            <div className="grid-cols-4" style={{ marginBottom: '24px' }}>
                {departments.map((dept) => {
                    const occupancyRate = (dept.full / dept.total) * 100;
                    return (
                        <div
                            key={dept.id}
                            className={`card dept-card ${activeDept?.id === dept.id ? 'active' : ''}`}
                            onClick={() => setActiveDept(dept)}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2 font-medium">
                                    <Building2 size={18} className="text-secondary" />
                                    {dept.name}
                                </div>
                                {dept.status === 'critical' && <AlertCircle size={18} className="text-danger" />}
                            </div>

                            <div className="dept-stats mt-4">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-2xl font-bold">{dept.full}<span className="text-sm text-secondary font-normal"> / {dept.total}</span></span>
                                    <span className="text-sm font-medium">{Math.round(occupancyRate)}%</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div
                                        className={`progress-bar-fill ${dept.status === 'critical' ? 'bg-danger' : dept.status === 'warning' ? 'bg-warning' : 'bg-primary'}`}
                                        style={{ width: `${occupancyRate}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="card h-full">
                {activeDept ? (
                    <>
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <div>
                                <h3>{activeDept.name} - Bed Layout</h3>
                                <p className="text-sm text-secondary mt-1">Real-time status of all beds in this unit</p>
                            </div>
                            <div className="flex gap-4 text-sm font-medium">
                                <span className="flex items-center gap-1"><div className="status-dot occupied"></div> Occupied</span>
                                <span className="flex items-center gap-1"><div className="status-dot available"></div> Available</span>
                                <span className="flex items-center gap-1"><div className="status-dot cleaning"></div> Cleaning</span>
                                <span className="flex items-center gap-1"><div className="status-dot maintenance"></div> Maint.</span>
                            </div>
                        </div>

                        <div className="bed-grid">
                            {bedData.map((bed) => (
                                <div key={bed.id} className={`bed-card ${bed.status.toLowerCase()}`}>
                                    <div className="bed-header flex justify-between items-center">
                                        <span className="bed-id font-bold">{bed.id}</span>
                                        <Bed size={16} />
                                    </div>
                                    <div className="bed-body mt-2">
                                        {bed.status === 'Occupied' ? (
                                            <>
                                                <div className="patient-name text-sm font-medium truncate">{bed.patient}</div>
                                                <div className="text-xs text-secondary mt-1">In: {bed.time}</div>
                                            </>
                                        ) : (
                                            <div className="empty-state text-sm font-medium text-secondary">{bed.status}</div>
                                        )}
                                    </div>
                                    <div className="bed-footer flex justify-between items-center mt-3 pt-2 border-t border-dashed">
                                        <span className="text-xs text-secondary">{bed.type}</span>
                                        <span className="link-btn" style={{ fontSize: '0.75rem' }}>Details</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center h-48 text-secondary">
                        {loading ? 'Loading departments...' : 'No departments available'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Facility;
