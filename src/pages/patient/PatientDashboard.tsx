import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { 
  Search, 
  MapPin, 
  Clock, 
  Bed, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Phone,
  Star,
  Navigation,
  Filter,
  Heart,
  Shield,
  Stethoscope,
  Activity
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import HospitalMap from '../../components/map/HospitalMap';
import { getAvailabilityInfo } from '../../utils/availability';

const PatientDashboard: React.FC = () => {
  const { hospitals, getHospitalStats } = useHospital();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBedType, setSelectedBedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'waitTime' | 'availability'>('distance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState<number>(50);
  
  const stats = getHospitalStats();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  React.useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    position => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    () => {
      // fallback (Hyderabad center)
      setUserLocation({ lat: 17.385, lng: 78.4867 });
    }
  );
}, []);
const getDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// const closestHospitals = React.useMemo(() => {
//   if (!userLocation) return [];

//   return [...hospitals]
//     .map(h => ({
//       ...h,
//       distance: getDistanceKm(
//         userLocation.lat,
//         userLocation.lng,
//         h.coordinates.lat,
//         h.coordinates.lng
//       ),
//     }))
//     .sort((a, b) => a.distance - b.distance)
//     .slice(0, 10);
// }, [hospitals, userLocation]);


  // Mock distance calculation
  const getDistance = (hospitalId: string) => {
    const distances: { [key: string]: number } = {
      'h1': 2.3, 'h2': 4.7, 'h3': 1.8, 'h4': 3.2, 'h5': 5.1
    };
    return distances[hospitalId] || Math.random() * 10;
  };

  // Mock ratings
  const getRating = (hospitalId: string) => {
    const ratings: { [key: string]: number } = {
      'h1': 4.5, 'h2': 4.2, 'h3': 4.8, 'h4': 4.3, 'h5': 4.6
    };
    return ratings[hospitalId] || 4.0;
  };

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBedType = selectedBedType === 'all' || 
      (hospital.beds[selectedBedType as keyof typeof hospital.beds]?.available > 0);
    
    const matchesFacilities = selectedFacilities.length === 0 || 
      selectedFacilities.every(facility => hospital.facilities.includes(facility));
    
    const matchesDistance = getDistance(hospital.id) <= maxDistance;
    
    return matchesSearch && matchesBedType && matchesFacilities && matchesDistance;
  });

  const sortedHospitals = React.useMemo(() => {
  if (!userLocation) return [];

  // 1️⃣ Add distance
  const hospitalsWithDistance = filteredHospitals.map(h => ({
    ...h,
    distance: getDistanceKm(
      userLocation.lat,
      userLocation.lng,
      h.coordinates.lat,
      h.coordinates.lng
    ),
  }));

  // 2️⃣ Sort based on selected criteria
  switch (sortBy) {
    case 'waitTime':
      hospitalsWithDistance.sort((a, b) => a.waitTime - b.waitTime);
      break;

    case 'availability':
      hospitalsWithDistance.sort((a, b) => {
        const aInfo = getAvailabilityInfo(a);
        const bInfo = getAvailabilityInfo(b);
        return bInfo.available - aInfo.available;
      });
      break;

    default: // nearest
      hospitalsWithDistance.sort((a, b) => a.distance - b.distance);
      break;
  }

  // 3️⃣ Return only closest 10
  return hospitalsWithDistance.slice(0, 10);
}, [filteredHospitals, sortBy, userLocation]);


  const allFacilities = [...new Set(hospitals.flatMap(h => h.facilities))];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'limited':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'full':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-600 bg-green-100';
      case 'limited':
        return 'text-yellow-600 bg-yellow-100';
      case 'full':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleNavigation = (hospital: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.address)}`;
    window.open(url, '_blank');
  };

  const handleFacilityToggle = (facility: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facility) 
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Find Hospitals</h1>
        <div className="text-sm text-gray-600">
          {filteredHospitals.length} hospitals found
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-blue-200" />
            <p className="text-2xl font-bold">{stats.totalHospitals}</p>
            <p className="text-blue-100">Total Hospitals</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="text-center">
            <Bed className="h-8 w-8 mx-auto mb-2 text-green-200" />
            <p className="text-2xl font-bold">{stats.availableBeds}</p>
            <p className="text-green-100">Available Beds</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-200" />
            <p className="text-2xl font-bold">{stats.averageWaitTime}m</p>
            <p className="text-yellow-100">Avg Wait Time</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="text-center">
            <Heart className="h-8 w-8 mx-auto mb-2 text-purple-200" />
            <p className="text-2xl font-bold">{stats.availableHospitals}</p>
            <p className="text-purple-100">Available Now</p>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Hospitals
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or location..."
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bed Type
            </label>
            <select
              value={selectedBedType}
              onChange={(e) => setSelectedBedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="general">General</option>
              <option value="icu">ICU</option>
              <option value="specialty">Specialty</option>
              <option value="er">Emergency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="distance">Distance</option>
                <option value="waitTime">Wait Time</option>
                <option value="availability">Availability</option>
              </select>
              <Button
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
                className="px-3"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Distance: {maxDistance} km
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Facilities
                  </label>
                  <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                    {allFacilities.slice(0, 8).map(facility => (
                      <button
                        key={facility}
                        onClick={() => handleFacilityToggle(facility)}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                          selectedFacilities.includes(facility)
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {facility}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      <Card title="Nearby Hospitals">
      <div className="h-[500px] w-3/4 ml-auto mr-auto">
        {userLocation ? (
          <HospitalMap
            hospitals={sortedHospitals}
            userLocation={userLocation}
          />
        ) : (
          <p className="text-center text-gray-500">Fetching location…</p>
        )}
      </div>
    </Card>


      {/* Hospital List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedHospitals.map((hospital) => (
          <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Hospital Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{hospital.name}</h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hospital.address}
                  </p>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(getRating(hospital.id))
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">
                        {getRating(hospital.id)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {getDistance(hospital.id).toFixed(1)} km away
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(hospital.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hospital.status)}`}>
                    {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Wait Time */}
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  Estimated wait time: <span className="font-semibold">{hospital.waitTime} minutes</span>
                </span>
              </div>

              {/* Bed Availability */}
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(hospital.beds).map(([type, beds]) => (
                  <div key={type} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bed className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
                    </div>
                    <p className="text-lg font-bold text-green-600 mt-1">
                      {beds.available} <span className="text-sm text-gray-600">/ {beds.total}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Facilities */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Available Facilities:</p>
                <div className="flex flex-wrap gap-2">
                  {hospital.facilities.slice(0, 4).map((facility) => (
                    <span key={facility} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {facility}
                    </span>
                  ))}
                  {hospital.facilities.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{hospital.facilities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button
                  onClick={() => handleNavigation(hospital)}
                  className="flex-1"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => alert(`Calling ${hospital.phone}`)}
                  className="flex-1"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Hospital
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hospitals found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedBedType('all');
                setSelectedFacilities([]);
                setMaxDistance(50);
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PatientDashboard;