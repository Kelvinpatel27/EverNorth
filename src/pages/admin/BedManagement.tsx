import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Bed, Edit, Save, X } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const BedManagement: React.FC = () => {
  const { hospitals, updateBedAvailability } = useHospital();
  const [editingBed, setEditingBed] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: number }>({});
  
  // Assuming admin manages first hospital for demo
  const hospital = hospitals[0];

  const handleEdit = (bedType: string, currentAvailable: number) => {
    setEditingBed(bedType);
    setEditValues({ [bedType]: currentAvailable });
  };

  const handleSave = (bedType: string) => {
    const newValue = editValues[bedType];
    updateBedAvailability(hospital.id, bedType, newValue);
    setEditingBed(null);
    setEditValues({});
  };

  const handleCancel = () => {
    setEditingBed(null);
    setEditValues({});
  };

  const handleInputChange = (bedType: string, value: number) => {
    setEditValues({ ...editValues, [bedType]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Bed Management</h1>
        <div className="text-sm text-gray-600">
          Managing: <span className="font-semibold">{hospital.name}</span>
        </div>
      </div>

      <Card>
        <div className="space-y-6">
          {Object.entries(hospital.beds).map(([type, beds]) => (
            <div key={type} className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Bed className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {type} Beds
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  {editingBed === type ? (
                    <div className="flex items-center space-x-2">
                      <Button size="sm" onClick={() => handleSave(type)}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(type, beds.available)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm font-medium text-gray-700">Total Beds</p>
                  <p className="text-2xl font-bold text-gray-900">{beds.total}</p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm font-medium text-gray-700">Available Beds</p>
                  {editingBed === type ? (
                    <input
                      type="number"
                      min="0"
                      max={beds.total}
                      value={editValues[type] || 0}
                      onChange={(e) => handleInputChange(type, parseInt(e.target.value) || 0)}
                      className="w-full text-2xl font-bold text-green-600 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-green-600">{beds.available}</p>
                  )}
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm font-medium text-gray-700">Occupied Beds</p>
                  <p className="text-2xl font-bold text-red-600">{beds.total - beds.available}</p>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Occupancy Rate</span>
                  <span>{Math.round(((beds.total - beds.available) / beds.total) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      beds.available / beds.total > 0.5
                        ? 'bg-green-600'
                        : beds.available / beds.total > 0.2
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                    }`}
                    style={{ width: `${((beds.total - beds.available) / beds.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-3 flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    beds.available > beds.total * 0.3
                      ? 'bg-green-500'
                      : beds.available > 0
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {beds.available > beds.total * 0.3
                    ? 'Available'
                    : beds.available > 0
                    ? 'Limited Availability'
                    : 'Full Capacity'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="w-full">
            Emergency Mode
          </Button>
          <Button variant="warning" className="w-full">
            Maintenance Mode
          </Button>
          <Button variant="success" className="w-full">
            Discharge Ready
          </Button>
          <Button variant="secondary" className="w-full">
            Generate Report
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BedManagement;