import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, Lock, User, AlertCircle } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Slight delay for effect
        setTimeout(async () => {
            const result = await login(username, password);
            setIsLoading(false);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error);
            }
        }, 600);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo-img-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <img src="/logo.png" alt="MediTrack Pro Logo" style={{ height: '64px', width: 'auto' }} />
                    </div>
                </div>

                {error && (
                    <div className="login-error">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <div className="input-icon">
                            <User size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <div className="input-icon">
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>


            </div>
        </div>
    );
};

export default Login;
