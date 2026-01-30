import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Bell, User, Activity } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    console.log(user)
    switch (user?.role) {
      case 'admin': return '/admin';
      case 'patient': return '/patient';
      case 'ems': return '/ems';
      default: return '/';
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={user ? getDashboardPath() : '/'} className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">HealthDash</span>
          </Link>

          {/* User Actions */}
            {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">Notifications</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">{user.name}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
                  {user.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          )
            :(<div className="flex items-center justify-center space-x-4">
              {/* <Link
                to="/login/admin"
                className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Admin Login
              </Link> */}
              <Link
              to="/patient"
              className="px-4 py-2 text-black rounded-lg hover:bg-gray-50 transition-colors"
              >
                Search
              </Link>
              <Link
                to="/login/patient"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                 Login
              </Link>
              {/* <Link
                to="/login/ems"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                EMS Login
              </Link> */}
            </div>)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;