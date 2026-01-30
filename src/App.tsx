import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HospitalProvider } from './context/HospitalContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import BedManagement from './pages/admin/BedManagement';
import PatientDashboard from './pages/patient/PatientDashboard';
import EMSDashboard from './pages/ems/EMSDashboard';
import Chatbot from './components/chatbot';
import { useAuth } from './context/AuthContext';
import 'leaflet/dist/leaflet.css';
import './utils/fixLeafletIcon';



const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        {/* {user && <Sidebar />} */}
        <main className={`flex-1 ${user ? '' : ''}`}>
          {children}
        </main>
        <div>
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HospitalProvider>
        <Router>
          <AppLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login/:role" element={<Login />} />
              <Route path="/signup/:role" element={<Signup />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/beds"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <BedManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/facilities"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-gray-900">Facility Management</h2>
                      <p className="text-gray-600 mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/notifications"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                      <p className="text-gray-600 mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                      <p className="text-gray-600 mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                }
              />

              {/* Protected Patient Routes */}
              <Route
                path="/patient"
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/search"
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/navigation"
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-gray-900">Navigation</h2>
                      <p className="text-gray-600 mt-2">Google Maps integration coming soon...</p>
                    </div>
                  </ProtectedRoute>
                }
              />

              {/* Protected EMS Routes */}
              <Route
                path="/ems"
                element={
                  <ProtectedRoute allowedRoles={['ems']}>
                    <EMSDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ems/map"
                element={
                  <ProtectedRoute allowedRoles={['ems']}>
                    <EMSDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ems/routes"
                element={
                  <ProtectedRoute allowedRoles={['ems']}>
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-gray-900">Route Planning</h2>
                      <p className="text-gray-600 mt-2">Advanced route optimization coming soon...</p>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ems/notifications"
                element={
                  <ProtectedRoute allowedRoles={['ems']}>
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-gray-900">EMS Notifications</h2>
                      <p className="text-gray-600 mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AppLayout>
        </Router>
      </HospitalProvider>
    </AuthProvider> 
  );
};

export default App;