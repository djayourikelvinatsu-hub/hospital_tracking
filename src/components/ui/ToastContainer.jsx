import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import './ToastContainer.css';

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        // Connect to the Socket.IO server utilizing the config API base URL
        const socket = io(API_BASE_URL);

        socket.on('connect', () => {
            console.log('Connected to real-time alerts server');
        });

        socket.on('hospital_alert', (alert) => {
            const newToast = {
                id: Date.now(),
                type: alert.type, // 'emergency', 'warning', 'info'
                message: alert.message,
            };

            setToasts((prev) => [...prev, newToast]);

            // Auto-remove after 8 seconds 
            setTimeout(() => {
                removeToast(newToast.id);
            }, 8000);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'emergency': return <AlertCircle size={20} />;
            case 'warning': return <AlertTriangle size={20} />;
            default: return <Info size={20} />;
        }
    };

    return (
        <div className="toast-wrapper">
            {toasts.map((toast) => (
                <div key={toast.id} className={`toast-card toast-${toast.type} animate-slide-in`}>
                    <div className="toast-icon">
                        {getIcon(toast.type)}
                    </div>
                    <div className="toast-content">
                        <h4>{toast.type === 'emergency' ? 'CRITICAL ALERT' : toast.type === 'warning' ? 'Warning' : 'Information'}</h4>
                        <p>{toast.message}</p>
                    </div>
                    <button className="toast-close" onClick={() => removeToast(toast.id)}>
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
