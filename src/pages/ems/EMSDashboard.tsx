import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { MapPin, Route, Clock, Bed, Truck, AlertCircle, Navigation } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const EMSDashboard: React.FC = () => {
  // const { hospitals } = useHospital();
  const { hospitals, addNotification, addEmergencyAlert } = useHospital();

  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [filterCriteria, setFilterCriteria] = useState<string>('nearest');
  const [requiredFacility, setRequiredFacility] = useState<string>('all');

  const getDistanceToHospital = (hospitalId: string) => {
    // Mock distance calculation
    const distances: { [key: string]: number } = {
      'h1': 2.3,
      'h2': 4.7,
      'h3': 1.8
    };
    return distances[hospitalId] || 5.0;
  };

  const filteredHospitals = hospitals.filter(hospital => {
    if (requiredFacility !== 'all' && !hospital.facilities.includes(requiredFacility)) {
      return false;
    }
    return true;
  });

  const sortedHospitals = [...filteredHospitals].sort((a, b) => {
    switch (filterCriteria) {
      case 'nearest':
        return getDistanceToHospital(a.id) - getDistanceToHospital(b.id);
      case 'availability':
        const aTotal = Object.values(a.beds).reduce((sum, bed) => sum + bed.available, 0);
        const bTotal = Object.values(b.beds).reduce((sum, bed) => sum + bed.available, 0);
        return bTotal - aTotal;
      case 'waitTime':
        return a.waitTime - b.waitTime;
      default:
        return 0;
    }
  });

  // const handleRouteOptimization = (hospitalId: string) => {
  //   setSelectedHospital(hospitalId);
  //   // Mock route optimization - would integrate with Google Maps API
  //   alert(`Route optimization activated for ${hospitals.find(h => h.id === hospitalId)?.name}`);
  // };

  const handleRouteOptimization = (hospitalId: string) => {
  setSelectedHospital(hospitalId);

  const hospital = hospitals.find(h => h.id === hospitalId);
  if (!hospital) return;

  addNotification({
    title: 'Route Optimization',
    message: `Optimized route generated for ${hospital.name}`,
    type: 'info',
    read: false
  });

  alert(`Route optimization activated for ${hospital.name}`);
};


  // const handleEmergencyDispatch = () => {
  //   alert('Emergency dispatch notification sent to selected hospital');
  // };

  const handleEmergencyDispatch = () => {
  if (!selectedHospital) {
    alert('Please select a hospital first');
    return;
  }

  const hospital = hospitals.find(h => h.id === selectedHospital);
  if (!hospital) return;

  addEmergencyAlert({
    title: 'EMS Emergency Dispatch',
    message: `Emergency ambulance dispatched to ${hospital.name}`,
    type: 'error',
    read: false
  });

  addNotification({
    title: 'EMS Dispatch',
    message: `EMS unit en route to ${hospital.name}`,
    type: 'warning',
    read: false
  });

  alert(`Emergency dispatch sent to ${hospital.name}`);
};


  const getTotalAvailableBeds = (hospital: any) => {
    return Object.values(hospital.beds).reduce((sum: number, bed: any) => sum + bed.available, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">EMS Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Truck className="h-5 w-5 text-red-600" />
          <span className="font-semibold text-red-600">Unit Active</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-200" />
            <p className="text-2xl font-bold">{hospitals.length}</p>
            <p className="text-blue-100">Hospitals in Area</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="text-center">
            <Bed className="h-8 w-8 mx-auto mb-2 text-green-200" />
            <p className="text-2xl font-bold">
              {hospitals.reduce((sum, h) => sum + getTotalAvailableBeds(h), 0)}
            </p>
            <p className="text-green-100">Available Beds</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-200" />
            <p className="text-2xl font-bold">
              {Math.min(...hospitals.map(h => h.waitTime))} min
            </p>
            <p className="text-yellow-100">Shortest Wait</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="text-center">
            <Route className="h-8 w-8 mx-auto mb-2 text-red-200" />
            <p className="text-2xl font-bold">
              {Math.min(...hospitals.map(h => getDistanceToHospital(h.id)))} km
            </p>
            <p className="text-red-100">Nearest Hospital</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="nearest">Nearest Distance</option>
              <option value="availability">Bed Availability</option>
              <option value="waitTime">Shortest Wait Time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Facility
            </label>
            <select
              value={requiredFacility}
              onChange={(e) => setRequiredFacility(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Facilities</option>
              <option value="Trauma Center">Trauma Center</option>
              <option value="Cardiac Care">Cardiac Care</option>
              <option value="Surgery">Surgery</option>
              <option value="MRI">MRI</option>
              <option value="CT Scan">CT Scan</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button onClick={handleEmergencyDispatch} variant="danger" className="w-full">
              <AlertCircle className="h-4 w-4 mr-2" />
              Emergency Dispatch
            </Button>
          </div>
        </div>
      </Card>

      {/* Hospital Map/List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mock Map View */}
        <Card title="Hospital Locations">
          <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">Interactive Map View</p>
              <p className="text-gray-500">Google Maps integration would display here</p>
              <div className="mt-4 space-y-2">
                {/* {hospitals.map((hospital) => (
                  <div key={hospital.id} className="flex items-center justify-between bg-white p-2 rounded">
                    <span className="text-sm">{hospital.name}</span>
                    <span className="text-xs text-gray-500">{getDistanceToHospital(hospital.id)} km</span>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </Card>

        {/* Hospital List */}
        <Card title="Hospital Status">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {sortedHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                  selectedHospital === hospital.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedHospital(hospital.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{getDistanceToHospital(hospital.id)} km</span>
                    <div className={`w-3 h-3 rounded-full ${
                      hospital.status === 'available' ? 'bg-green-500' :
                      hospital.status === 'limited' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-600">Available Beds:</span>
                    <span className="font-semibold ml-1">{getTotalAvailableBeds(hospital)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Wait Time:</span>
                    <span className="font-semibold ml-1">{hospital.waitTime} min</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRouteOptimization(hospital.id);
                    }}
                    className="flex-1"
                  >
                    <Navigation className="h-3 w-3 mr-1" />
                    Route
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Contacting ${hospital.name}`);
                    }}
                    className="flex-1"
                  >
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EMSDashboard;