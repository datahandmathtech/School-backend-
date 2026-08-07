import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';

// New Modules
import Dashboard from './pages/Dashboard';
import Drivers from './pages/Drivers';
import Vehicles from './pages/Vehicles';
import VehiclesLife from './pages/VehiclesLife';
import DriverDashboard from './pages/DriverDashboard';
import Inventory from './pages/Inventory';
import LiveFeed from './pages/LiveFeed';
import LogBook from './pages/LogBook';
import StockReport from './pages/StockReport';
import Staff from './pages/Staff';
import StaffPortal from './pages/StaffPortal';
import Admins from './pages/Admins';

const ProtectedRoute = ({ children }) => {
  const userStr = sessionStorage.getItem('user');
  if (!userStr) {
    return <Navigate to="/login" replace />;
  }
  let user = null;
  try {
    user = JSON.parse(userStr);
  } catch (e) {
    // If parsing fails, treat as not logged in
  }

  if (!user) {
    sessionStorage.removeItem('user'); // cleanup invalid data
    return <Navigate to="/login" replace />;
  }
  
  // Basic RBAC
  const path = window.location.pathname;
  if (user.role === 'driver' && path !== '/driver-dashboard') {
      return <Navigate to="/driver-dashboard" replace />;
  }
  if (user.role === 'staff' && path !== '/staff-portal') {
      return <Navigate to="/staff-portal" replace />;
  }
  if ((user.role === 'admin' || user.role === 'executive') && (path === '/driver-dashboard' || path === '/staff-portal')) {
      return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Driver Route (No Sidebar) */}
          <Route path="/driver-dashboard" element={<ProtectedRoute><DriverDashboard /></ProtectedRoute>} />

          {/* Staff Route (No Sidebar, just the portal) */}
          <Route path="/staff-portal" element={<ProtectedRoute><StaffPortal /></ProtectedRoute>} />

          {/* Main App Routes with Layout */}
          <Route path="/live-feed" element={<ProtectedRoute><Layout><LiveFeed /></Layout></ProtectedRoute>} />
          <Route path="/logbook" element={<ProtectedRoute><Layout><LogBook /></Layout></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/drivers" element={<ProtectedRoute><Layout><Drivers /></Layout></ProtectedRoute>} />
          <Route path="/vehicles" element={<ProtectedRoute><Layout><Vehicles /></Layout></ProtectedRoute>} />
          <Route path="/vehicles-life" element={<ProtectedRoute><Layout><VehiclesLife /></Layout></ProtectedRoute>} />
          <Route path="/stock-report/:id" element={<ProtectedRoute><Layout><StockReport /></Layout></ProtectedRoute>} />
          <Route path="/staff" element={<ProtectedRoute><Layout><Staff /></Layout></ProtectedRoute>} />
          <Route path="/admins" element={<ProtectedRoute><Layout><Admins /></Layout></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
