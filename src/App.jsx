import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
// Placeholder imports for pages
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import GateEntry from './pages/GateEntry/GateEntry';
import PatientRecords from './pages/PatientRecords/PatientRecords';
import Facility from './pages/Facility/Facility';
import Staff from './pages/Staff/Staff';
import Clinical from './pages/Clinical/Clinical';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/gate-entry" element={<ProtectedRoute><GateEntry /></ProtectedRoute>} />
          <Route path="/patient-records" element={<ProtectedRoute><PatientRecords /></ProtectedRoute>} />
          <Route path="/facility" element={<ProtectedRoute><Facility /></ProtectedRoute>} />
          <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
          <Route path="/clinical" element={<ProtectedRoute><Clinical /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
