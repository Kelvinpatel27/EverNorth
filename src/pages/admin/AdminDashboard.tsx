import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { 
  Bed, 
  Building, 
  Bell, 
  TrendingUp, 
  Users, 
  AlertCircle, 
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  BarChart3,
  PieChart,
  Stethoscope
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const AdminDashboard: React.FC = () => {
  const { hospitals, notifications, emergencyAlerts, getHospitalStats } = useHospital();
  
  // Assuming admin manages first hospital for demo
  const hospital = hospitals[0];
  const unreadNotifications = notifications.filter(n => !n.read);
  const unreadAlerts = emergencyAlerts.filter(a => !a.read);
  const stats = getHospitalStats();

  const totalBeds = hospital.beds.general.total + hospital.beds.icu.total + 
                   hospital.beds.specialty.total + hospital.beds.er.total;
  const availableBeds = hospital.beds.general.available + hospital.beds.icu.available + 
                       hospital.beds.specialty.available + hospital.beds.er.available;
  const occupancyRate = Math.round(((totalBeds - availableBeds) / totalBeds) * 100);

  const recentActivities = [
    { time: '2 min ago', action: 'Bed updated in ICU Ward', type: 'update' },
    { time: '5 min ago', action: 'New patient admitted to ER', type: 'admission' },
    { time: '12 min ago', action: 'Equipment maintenance completed', type: 'maintenance' },
    { time: '18 min ago', action: 'Staff shift change logged', type: 'staff' },
    { time: '25 min ago', action: 'Discharge processed for Room 204', type: 'discharge' }
  ];

  const departmentPerformance = [
    { name: 'Emergency Room', efficiency: 92, patients: 45, avgTime: '15 min' },
    { name: 'ICU', efficiency: 88, patients: 28, avgTime: '8 min' },
    { name: 'General Ward', efficiency: 95, patients: 120, avgTime: '22 min' },
    { name: 'Surgery', efficiency: 90, patients: 12, avgTime: '45 min' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="secondary">
            <Calendar className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <span className="text-sm text-gray-600">Managing:</span>
          <span className="font-semibold text-blue-600">{hospital.name}</span>
        </div>
      </div>

      {/* Emergency Alerts */}
      {unreadAlerts.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <h3 className="text-lg font-medium text-red-800">Emergency Alerts</h3>
          </div>
          <div className="mt-2 space-y-1">
            {unreadAlerts.slice(0, 2).map(alert => (
              <p key={alert.id} className="text-red-700">{alert.message}</p>
            ))}
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Beds</p>
              <p className="text-3xl font-bold">{totalBeds}</p>
              <p className="text-blue-200 text-sm">Across all departments</p>
            </div>
            <Bed className="h-12 w-12 text-blue-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Available Beds</p>
              <p className="text-3xl font-bold">{availableBeds}</p>
              <p className="text-green-200 text-sm">Ready for patients</p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Occupancy Rate</p>
              <p className="text-3xl font-bold">{occupancyRate}%</p>
              <p className="text-yellow-200 text-sm">Current capacity</p>
            </div>
            <Users className="h-12 w-12 text-yellow-200" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Wait Time</p>
              <p className="text-3xl font-bold">{hospital.waitTime}m</p>
              <p className="text-red-200 text-sm">Average wait</p>
            </div>
            <Clock className="h-12 w-12 text-red-200" />
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bed Status Overview */}
        <Card title="Bed Status by Department">
          <div className="space-y-4">
            {Object.entries(hospital.beds).map(([type, beds]) => (
              <div key={type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bed className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{type}</p>
                    <p className="text-sm text-gray-600">{beds.available} / {beds.total} available</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        beds.available / beds.total > 0.5
                          ? 'bg-green-600'
                          : beds.available / beds.total > 0.2
                          ? 'bg-yellow-600'
                          : 'bg-red-600'
                      }`}
                      style={{ width: `${(beds.available / beds.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {Math.round((beds.available / beds.total) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activity">
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.type === 'update' ? 'bg-blue-100' :
                  activity.type === 'admission' ? 'bg-green-100' :
                  activity.type === 'maintenance' ? 'bg-yellow-100' :
                  activity.type === 'staff' ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <Activity className={`h-4 w-4 ${
                    activity.type === 'update' ? 'text-blue-600' :
                    activity.type === 'admission' ? 'text-green-600' :
                    activity.type === 'maintenance' ? 'text-yellow-600' :
                    activity.type === 'staff' ? 'text-purple-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Notifications">
          <div className="space-y-3">
            {notifications.slice(0, 5).map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border-l-4 ${
                  notification.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-400'
                    : notification.type === 'success'
                    ? 'bg-green-50 border-green-400'
                    : notification.type === 'error'
                    ? 'bg-red-50 border-red-400'
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <AlertCircle className={`h-5 w-5 mt-0.5 ${
                    notification.type === 'warning'
                      ? 'text-yellow-600'
                      : notification.type === 'success'
                      ? 'text-green-600'
                      : notification.type === 'error'
                      ? 'text-red-600'
                      : 'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Department Performance */}
      <Card title="Department Performance">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departmentPerformance.map((dept, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                <Stethoscope className="h-5 w-5 text-gray-600" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Efficiency</span>
                    <span className="font-medium">{dept.efficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${dept.efficiency}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Patients</span>
                  <span className="font-medium">{dept.patients}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg Time</span>
                  <span className="font-medium">{dept.avgTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Hospital Status */}
      <Card title="Hospital Status">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              hospital.status === 'available'
                ? 'bg-green-100 text-green-800'
                : hospital.status === 'limited'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {hospital.status === 'available' ? (
                <CheckCircle className="h-4 w-4 mr-1" />
              ) : hospital.status === 'limited' ? (
                <AlertCircle className="h-4 w-4 mr-1" />
              ) : (
                <XCircle className="h-4 w-4 mr-1" />
              )}
              {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
            </div>
            <p className="text-sm text-gray-600 mt-2">Current Status</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{hospital.waitTime} min</p>
            <p className="text-sm text-gray-600">Average Wait Time</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{hospital.facilities.length}</p>
            <p className="text-sm text-gray-600">Available Facilities</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;