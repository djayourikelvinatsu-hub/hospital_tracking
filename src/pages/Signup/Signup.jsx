import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, User, Lock, AlertCircle } from 'lucide-react';
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Slight delay for effect
        setTimeout(async () => {
            const result = await signup(name, username, password, 'doctor');
            setIsLoading(false);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error);
            }
        }, 600);
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <div className="signup-logo-img-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <img src="/logo.png" alt="MediTrack Pro Logo" style={{ height: '64px', width: 'auto' }} />
                    </div>
                    <h2>Doctor Registration</h2>
                    <p className="text-secondary">Create your MediTrack Pro account</p>
                </div>

                {error && (
                    <div className="signup-error">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="input-group">
                        <div className="input-icon">
                            <UserPlus size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Full Name (e.g., Dr. Jane Doe)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <div className="input-icon">
                            <User size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Choose Username"
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
                            placeholder="Create Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary signup-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="login-prompt">
                    <p className="text-sm text-secondary text-center mt-6">
                        Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign In here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
