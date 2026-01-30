import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Bed, 
  Settings, 
  Bell, 
  Search, 
  MapPin, 
  Route,
  Users,
  Building
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const getNavItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
          { path: '/admin/beds', icon: Bed, label: 'Bed Management' },
          // { path: '/admin/facilities', icon: Building, label: 'Facilities' },
          // { path: '/admin/notifications', icon: Bell, label: 'Notifications' },
          // { path: '/admin/settings', icon: Settings, label: 'Settings' }
        ];
      case 'patient':
        return [
          { path: '/patient', icon: LayoutDashboard, label: 'Dashboard' },
          { path: '/patient/search', icon: Search, label: 'Find Hospitals' },
          { path: '/patient/navigation', icon: MapPin, label: 'Navigation' }
        ];
      case 'ems':
        return [
          { path: '/ems', icon: LayoutDashboard, label: 'Dashboard' },
          // { path: '/ems/map', icon: MapPin, label: 'Hospital Map' },
          // { path: '/ems/routes', icon: Route, label: 'Route Planning' },
          // { path: '/ems/notifications', icon: Bell, label: 'Notifications' }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="bg-gray-50 border-r border-gray-200 w-64 min-h-screen">
      <nav className="mt-8">
        <div className="px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Navigation
          </h3>
        </div>
        <div className="mt-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;