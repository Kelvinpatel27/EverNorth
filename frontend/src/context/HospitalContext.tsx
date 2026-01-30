import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hospital, Notification } from '../types';

interface HospitalContextType {
  hospitals: Hospital[];
  notifications: Notification[];
  emergencyAlerts: Notification[];
  updateBedAvailability: (hospitalId: string, bedType: string, available: number) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  addEmergencyAlert: (alert: Omit<Notification, 'id' | 'timestamp'>) => void;
  getHospitalStats: () => any;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);





const calculateHospitalStatus = (beds: Hospital['beds']) => {
  const totalBeds = Object.values(beds).reduce((sum, bed) => sum + bed.total, 0);
  const availableBeds = Object.values(beds).reduce((sum, bed) => sum + bed.available, 0);
  const occupancyRate = (totalBeds - availableBeds) / totalBeds;

  if (occupancyRate >= 0.95) return 'full';
  if (occupancyRate >= 0.8) return 'limited';
  return 'available';
};
// const mockHospitals: Hospital[] = [
//   {
//     id: 'h1',
//     name: 'City General Hospital',
//     address: '123 Main St, City Center',
//     phone: '+1 (555) 123-4567',
//     coordinates: { lat: 40.7128, lng: -74.0060 },
//     beds: {
//       general: { total: 150, available: 45 },
//       icu: { total: 30, available: 8 },
//       specialty: { total: 25, available: 12 },
//       er: { total: 20, available: 5 }
//     },
//     facilities: ['MRI', 'CT Scan', 'X-Ray', 'Laboratory', 'Pharmacy', 'Surgery'],
//     waitTime: 25,
//     status: 'available'
//   },
//   {
//     id: 'h2',
//     name: 'St. Mary Medical Center',
//     address: '456 Oak Ave, Downtown',
//     phone: '+1 (555) 987-6543',
//     coordinates: { lat: 40.7589, lng: -73.9851 },
//     beds: {
//       general: { total: 200, available: 18 },
//       icu: { total: 40, available: 2 },
//       specialty: { total: 35, available: 0 },
//       er: { total: 25, available: 3 }
//     },
//     facilities: ['MRI', 'CT Scan', 'X-Ray', 'Laboratory', 'Pharmacy', 'Surgery', 'Cardiac Care'],
//     waitTime: 45,
//     status: 'limited'
//   },
//   {
//     id: 'h3',
//     name: 'Regional Medical Complex',
//     address: '789 Health Blvd, Medical District',
//     phone: '+1 (555) 456-7890',
//     coordinates: { lat: 40.7831, lng: -73.9712 },
//     beds: {
//       general: { total: 300, available: 200 },
//       icu: { total: 50, available: 40 },
//       specialty: { total: 45, available: 35 },
//       er: { total: 30, available: 25 }
//     },
//     facilities: ['MRI', 'CT Scan', 'X-Ray', 'Laboratory', 'Pharmacy', 'Surgery', 'Trauma Center', 'Burn Unit'],
//     waitTime: 90,
//     status: 'available'
//   },
//   {
//     id: 'h4',
//     name: 'Metropolitan General Hospital',
//     address: '321 Medical Plaza, Uptown',
//     phone: '+1 (555) 234-5678',
//     coordinates: { lat: 40.7505, lng: -73.9934 },
//     beds: {
//       general: { total: 180, available: 65 },
//       icu: { total: 35, available: 12 },
//       specialty: { total: 28, available: 8 },
//       er: { total: 22, available: 7 }
//     },
//     facilities: ['MRI', 'CT Scan', 'X-Ray', 'Laboratory', 'Pharmacy', 'Surgery', 'Maternity Ward', 'Pediatrics'],
//     waitTime: 30,
//     status: 'available'
//   },
//   {
//     id: 'h5',
//     name: 'Riverside Emergency Center',
//     address: '567 River Road, Riverside',
//     phone: '+1 (555) 345-6789',
//     coordinates: { lat: 40.7282, lng: -74.0776 },
//     beds: {
//       general: { total: 120, available: 25 },
//       icu: { total: 20, available: 5 },
//       specialty: { total: 15, available: 3 },
//       er: { total: 35, available: 12 }
//     },
//     facilities: ['CT Scan', 'X-Ray', 'Laboratory', 'Pharmacy', 'Emergency Surgery', 'Trauma Center'],
//     waitTime: 20,
//     status: 'available'
//   }
// ];

const mockHospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'Apollo Hospitals Jubilee Hills',
    address: 'Apollo Hospitals, Rd No 72, Film Nagar, Jubilee Hills, Hyderabad, Telangana 500033, India',
    phone: '+91 40 2360 7777',
    coordinates: { lat: 17.4156, lng: 78.4090 },
    beds: {
      general: { total: 300, available: 120 },
      icu: { total: 80, available: 18 },
      specialty: { total: 60, available: 22 },
      er: { total: 40, available: 10 }
    },
    facilities: ['Emergency', 'ICU'],
    waitTime: 35,
    status: calculateHospitalStatus({
      general: { total: 300, available: 120 },
      icu: { total: 80, available: 18 },
      specialty: { total: 60, available: 22 },
      er: { total: 40, available: 10 }
    })
  },
  {
    id: 'h2',
    name: 'Yashoda Hospitals Somajiguda',
    address: 'Yashoda Hospitals, Raj Bhavan Rd, Somajiguda, Hyderabad, Telangana 500082, India',
    phone: '+91 40 4567 4567',
    coordinates: { lat: 17.4258, lng: 78.4596 },
    beds: {
      general: { total: 250, available: 40 },
      icu: { total: 70, available: 5 },
      specialty: { total: 50, available: 3 },
      er: { total: 30, available: 4 }
    },
    facilities: ['Trauma'],
    waitTime: 55,
    status: calculateHospitalStatus({
      general: { total: 250, available: 40 },
      icu: { total: 70, available: 5 },
      specialty: { total: 50, available: 3 },
      er: { total: 30, available: 4 }
    })
  },
  {
    id: 'h3',
    name: 'CARE Hospitals Banjara Hills',
    address: 'CARE Hospitals, Rd No 1, Banjara Hills, Hyderabad, Telangana 500034, India',
    phone: '+91 40 6720 1234',
    coordinates: { lat: 17.4126, lng: 78.4482 },
    beds: {
      general: { total: 220, available: 160 },
      icu: { total: 60, available: 45 },
      specialty: { total: 55, available: 40 },
      er: { total: 35, available: 25 }
    },
    facilities: ['Emergency'],
    waitTime: 25,
    status: calculateHospitalStatus({
      general: { total: 220, available: 160 },
      icu: { total: 60, available: 45 },
      specialty: { total: 55, available: 40 },
      er: { total: 35, available: 25 }
    })
  },
  {
    id: 'h4',
    name: 'Osmania General Hospital',
    address: 'Osmania General Hospital, Afzal Gunj, Hyderabad, Telangana 500012, India',
    phone: '+91 40 2460 0121',
    coordinates: { lat: 17.3713, lng: 78.4804 },
    beds: {
      general: { total: 500, available: 20 },
      icu: { total: 100, available: 2 },
      specialty: { total: 80, available: 1 },
      er: { total: 60, available: 5 }
    },
    facilities: ['Government'],
    waitTime: 90,
    status: calculateHospitalStatus({
      general: { total: 500, available: 20 },
      icu: { total: 100, available: 2 },
      specialty: { total: 80, available: 1 },
      er: { total: 60, available: 5 }
    })
  },
  {
    id: 'h5',
    name: 'Gandhi Hospital',
    address: 'Gandhi Hospital, Musheerabad, Secunderabad, Hyderabad, Telangana 500003, India',
    phone: '+91 40 2750 5555',
    coordinates: { lat: 17.4253, lng: 78.5036 },
    beds: {
      general: { total: 450, available: 50 },
      icu: { total: 90, available: 10 },
      specialty: { total: 70, available: 8 },
      er: { total: 55, available: 12 }
    },
    facilities: ['Government'],
    waitTime: 80,
    status: calculateHospitalStatus({
      general: { total: 450, available: 50 },
      icu: { total: 90, available: 10 },
      specialty: { total: 70, available: 8 },
      er: { total: 55, available: 12 }
    })
  },
  {
    id: 'h6',
    name: 'AIG Hospitals',
    address: 'Asian Institute of Gastroenterology, Mindspace Rd, Gachibowli, Hyderabad, Telangana 500032, India',
    phone: '+91 40 4244 4222',
    coordinates: { lat: 17.4401, lng: 78.3489 },
    beds: {
      general: { total: 200, available: 90 },
      icu: { total: 50, available: 12 },
      specialty: { total: 70, available: 20 },
      er: { total: 30, available: 8 }
    },
    facilities: ['Gastro'],
    waitTime: 30,
    status: calculateHospitalStatus({
      general: { total: 200, available: 90 },
      icu: { total: 50, available: 12 },
      specialty: { total: 70, available: 20 },
      er: { total: 30, available: 8 }
    })
  },
  {
    id: 'h7',
    name: 'Continental Hospitals',
    address: 'Continental Hospitals, Nanakramguda Rd, Gachibowli, Hyderabad, Telangana 500032, India',
    phone: '+91 40 6700 0000',
    coordinates: { lat: 17.4435, lng: 78.3473 },
    beds: {
      general: { total: 300, available: 110 },
      icu: { total: 75, available: 15 },
      specialty: { total: 80, available: 25 },
      er: { total: 40, available: 12 }
    },
    facilities: ['Multi-Specialty'],
    waitTime: 40,
    status: calculateHospitalStatus({
      general: { total: 300, available: 110 },
      icu: { total: 75, available: 15 },
      specialty: { total: 80, available: 25 },
      er: { total: 40, available: 12 }
    })
  },
  {
    id: 'h8',
    name: 'Rainbow Children’s Hospital Banjara Hills',
    address: 'Rainbow Children’s Hospital, Rd No 10, Banjara Hills, Hyderabad, Telangana 500034, India',
    phone: '+91 40 2339 1919',
    coordinates: { lat: 17.4173, lng: 78.4428 },
    beds: {
      general: { total: 150, available: 60 },
      icu: { total: 30, available: 8 },
      specialty: { total: 40, available: 15 },
      er: { total: 20, available: 5 }
    },
    facilities: ['Pediatrics'],
    waitTime: 30,
    status: calculateHospitalStatus({
      general: { total: 150, available: 60 },
      icu: { total: 30, available: 8 },
      specialty: { total: 40, available: 15 },
      er: { total: 20, available: 5 }
    })
  },
  {
    id: 'h9',
    name: 'Sunshine Hospitals Secunderabad',
    address: 'Sunshine Hospitals, Minister Rd, Secunderabad, Telangana 500003, India',
    phone: '+91 40 4455 4455',
    coordinates: { lat: 17.4382, lng: 78.4976 },
    beds: {
      general: { total: 200, available: 75 },
      icu: { total: 45, available: 9 },
      specialty: { total: 50, available: 14 },
      er: { total: 30, available: 7 }
    },
    facilities: ['Orthopedics'],
    waitTime: 35,
    status: calculateHospitalStatus({
      general: { total: 200, available: 75 },
      icu: { total: 45, available: 9 },
      specialty: { total: 50, available: 14 },
      er: { total: 30, available: 7 }
    })
  },
  {
    id: 'h10',
    name: 'KIMS-Ushalakshmi Centre',
    address: 'KIMS-Ushalakshmi Centre, Minister Rd, Begumpet, Hyderabad, Telangana 500016, India',
    phone: '+91 40 4488 5000',
    coordinates: { lat: 17.4445, lng: 78.4620 },
    beds: {
      general: { total: 180, available: 70 },
      icu: { total: 40, available: 10 },
      specialty: { total: 60, available: 15 },
      er: { total: 25, available: 6 }
    },
    facilities: ['Oncology'],
    waitTime: 45,
    status: calculateHospitalStatus({
      general: { total: 180, available: 70 },
      icu: { total: 40, available: 10 },
      specialty: { total: 60, available: 15 },
      er: { total: 25, available: 6 }
    })

  },
    {
    id: 'h11',
    name: 'Yashoda Hospitals Secunderabad',
    address: 'Yashoda Hospitals, Alexander Rd, Secunderabad, Telangana 500003, India',
    phone: '+91 40 4567 4567',
    coordinates: { lat: 17.4399, lng: 78.4983 },
    beds: {
      general: { total: 280, available: 60 },
      icu: { total: 70, available: 8 },
      specialty: { total: 65, available: 10 },
      er: { total: 35, available: 7 }
    },
    facilities: ['Emergency', 'Cardiac'],
    waitTime: 60,
    status: calculateHospitalStatus({
      general: { total: 280, available: 60 },
      icu: { total: 70, available: 8 },
      specialty: { total: 65, available: 10 },
      er: { total: 35, available: 7 }
    })
  },
  {
    id: 'h12',
    name: 'Medicover Hospitals Hitech City',
    address: 'Medicover Hospitals, Madhapur Rd, Hitech City, Hyderabad, Telangana 500081, India',
    phone: '+91 40 6833 4444',
    coordinates: { lat: 17.4483, lng: 78.3915 },
    beds: {
      general: { total: 200, available: 85 },
      icu: { total: 45, available: 11 },
      specialty: { total: 55, available: 20 },
      er: { total: 30, available: 9 }
    },
    facilities: ['Multi-Specialty'],
    waitTime: 35,
    status: calculateHospitalStatus({
      general: { total: 200, available: 85 },
      icu: { total: 45, available: 11 },
      specialty: { total: 55, available: 20 },
      er: { total: 30, available: 9 }
    })
  },
  {
    id: 'h13',
    name: 'Citizens Hospital',
    address: 'Citizens Hospital, Nallagandla, Serilingampalle, Hyderabad, Telangana 500019, India',
    phone: '+91 40 6719 1919',
    coordinates: { lat: 17.4681, lng: 78.3085 },
    beds: {
      general: { total: 180, available: 65 },
      icu: { total: 40, available: 9 },
      specialty: { total: 50, available: 14 },
      er: { total: 25, available: 6 }
    },
    facilities: ['Emergency'],
    waitTime: 40,
    status: calculateHospitalStatus({
      general: { total: 180, available: 65 },
      icu: { total: 40, available: 9 },
      specialty: { total: 50, available: 14 },
      er: { total: 25, available: 6 }
    })
  },
  {
    id: 'h14',
    name: 'KIMS Hospitals Kondapur',
    address: 'KIMS Hospitals, Kondapur Main Rd, Kondapur, Hyderabad, Telangana 500084, India',
    phone: '+91 40 6750 5000',
    coordinates: { lat: 17.4604, lng: 78.3570 },
    beds: {
      general: { total: 220, available: 70 },
      icu: { total: 55, available: 12 },
      specialty: { total: 60, available: 18 },
      er: { total: 30, available: 8 }
    },
    facilities: ['ICU', 'Emergency'],
    waitTime: 45,
    status: calculateHospitalStatus({
      general: { total: 220, available: 70 },
      icu: { total: 55, available: 12 },
      specialty: { total: 60, available: 18 },
      er: { total: 30, available: 8 }
    })
  },
  {
    id: 'h15',
    name: 'Omega Hospitals Banjara Hills',
    address: 'Omega Hospitals, Rd No 12, Banjara Hills, Hyderabad, Telangana 500034, India',
    phone: '+91 40 2355 1000',
    coordinates: { lat: 17.4188, lng: 78.4396 },
    beds: {
      general: { total: 160, available: 55 },
      icu: { total: 35, available: 8 },
      specialty: { total: 45, available: 12 },
      er: { total: 20, available: 5 }
    },
    facilities: ['Oncology'],
    waitTime: 40,
    status: calculateHospitalStatus({
      general: { total: 160, available: 55 },
      icu: { total: 35, available: 8 },
      specialty: { total: 45, available: 12 },
      er: { total: 20, available: 5 }
    })
  },
  {
    id: 'h16',
    name: 'Star Hospitals Banjara Hills',
    address: 'Star Hospitals, Rd No 10, Banjara Hills, Hyderabad, Telangana 500034, India',
    phone: '+91 40 4477 7777',
    coordinates: { lat: 17.4179, lng: 78.4441 },
    beds: {
      general: { total: 210, available: 80 },
      icu: { total: 50, available: 14 },
      specialty: { total: 55, available: 16 },
      er: { total: 30, available: 9 }
    },
    facilities: ['Multi-Specialty'],
    waitTime: 38,
    status: calculateHospitalStatus({
      general: { total: 210, available: 80 },
      icu: { total: 50, available: 14 },
      specialty: { total: 55, available: 16 },
      er: { total: 30, available: 9 }
    })
  },
  {
    id: 'h17',
    name: 'Global Hospitals Lakdi-ka-pul',
    address: 'Gleneagles Global Hospitals, Lakdi Ka Pul, Hyderabad, Telangana 500004, India',
    phone: '+91 40 6767 0101',
    coordinates: { lat: 17.4025, lng: 78.4606 },
    beds: {
      general: { total: 300, available: 95 },
      icu: { total: 75, available: 16 },
      specialty: { total: 85, available: 22 },
      er: { total: 40, available: 11 }
    },
    facilities: ['Transplant', 'Emergency'],
    waitTime: 50,
    status: calculateHospitalStatus({
      general: { total: 300, available: 95 },
      icu: { total: 75, available: 16 },
      specialty: { total: 85, available: 22 },
      er: { total: 40, available: 11 }
    })
  },
  {
    id: 'h18',
    name: 'Fernandez Hospital Hyderguda',
    address: 'Fernandez Hospital, Hyderguda, Basheerbagh, Hyderabad, Telangana 500029, India',
    phone: '+91 40 4022 2333',
    coordinates: { lat: 17.4047, lng: 78.4754 },
    beds: {
      general: { total: 140, available: 50 },
      icu: { total: 30, available: 7 },
      specialty: { total: 40, available: 14 },
      er: { total: 20, available: 5 }
    },
    facilities: ['Maternity'],
    waitTime: 30,
    status: calculateHospitalStatus({
      general: { total: 140, available: 50 },
      icu: { total: 30, available: 7 },
      specialty: { total: 40, available: 14 },
      er: { total: 20, available: 5 }
    })
  },
  {
    id: 'h19',
    name: 'LV Prasad Eye Institute',
    address: 'L V Prasad Eye Institute, Rd No 2, Banjara Hills, Hyderabad, Telangana 500034, India',
    phone: '+91 40 3061 2345',
    coordinates: { lat: 17.4150, lng: 78.4367 },
    beds: {
      general: { total: 120, available: 55 },
      icu: { total: 20, available: 6 },
      specialty: { total: 50, available: 22 },
      er: { total: 15, available: 4 }
    },
    facilities: ['Ophthalmology'],
    waitTime: 25,
    status: calculateHospitalStatus({
      general: { total: 120, available: 55 },
      icu: { total: 20, available: 6 },
      specialty: { total: 50, available: 22 },
      er: { total: 15, available: 4 }
    })
  },
  {
    id: 'h20',
    name: 'Basavatarakam Indo American Cancer Hospital',
    address: 'Basavatarakam Indo American Cancer Hospital, Rd No 10, Banjara Hills, Hyderabad, Telangana 500034, India',
    phone: '+91 40 2355 1212',
    coordinates: { lat: 17.4162, lng: 78.4420 },
    beds: {
      general: { total: 250, available: 85 },
      icu: { total: 60, available: 14 },
      specialty: { total: 70, available: 20 },
      er: { total: 30, available: 8 }
    },
    facilities: ['Cancer Care'],
    waitTime: 45,
    status: calculateHospitalStatus({
      general: { total: 250, available: 85 },
      icu: { total: 60, available: 14 },
      specialty: { total: 70, available: 20 },
      er: { total: 30, available: 8 }
    })
  },
  {
    id: 'h21',
    name: 'Mythri Hospital Mehdipatnam',
    address: 'Mythri Hospital, Mehdipatnam, Hyderabad, Telangana 500028, India',
    phone: '+91 40 2355 6789',
    coordinates: { lat: 17.3948, lng: 78.4426 },
    beds: {
      general: { total: 160, available: 60 },
      icu: { total: 35, available: 9 },
      specialty: { total: 45, available: 14 },
      er: { total: 20, available: 5 }
    },
    facilities: ['Emergency'],
    waitTime: 35,
    status: calculateHospitalStatus({
      general: { total: 160, available: 60 },
      icu: { total: 35, available: 9 },
      specialty: { total: 45, available: 14 },
      er: { total: 20, available: 5 }
    })
  },
  {
    id: 'h22',
    name: 'Princess Esra Hospital',
    address: 'Princess Esra Hospital, Shah Ali Banda Rd, Hyderabad, Telangana 500065, India',
    phone: '+91 40 2452 3500',
    coordinates: { lat: 17.3456, lng: 78.4746 },
    beds: {
      general: { total: 200, available: 55 },
      icu: { total: 40, available: 8 },
      specialty: { total: 50, available: 10 },
      er: { total: 25, available: 6 }
    },
    facilities: ['Teaching Hospital'],
    waitTime: 60,
    status: calculateHospitalStatus({
      general: { total: 200, available: 55 },
      icu: { total: 40, available: 8 },
      specialty: { total: 50, available: 10 },
      er: { total: 25, available: 6 }
    })
  },
  {
    id: 'h23',
    name: 'Olive Hospitals Mehdipatnam',
    address: 'Olive Hospitals, Mehdipatnam, Hyderabad, Telangana 500028, India',
    phone: '+91 40 3041 2222',
    coordinates: { lat: 17.3925, lng: 78.4413 },
    beds: {
      general: { total: 180, available: 65 },
      icu: { total: 45, available: 11 },
      specialty: { total: 55, available: 16 },
      er: { total: 25, available: 7 }
    },
    facilities: ['Multi-Specialty'],
    waitTime: 42,
    status: calculateHospitalStatus({
      general: { total: 180, available: 65 },
      icu: { total: 45, available: 11 },
      specialty: { total: 55, available: 16 },
      er: { total: 25, available: 7 }
    })
  },
  {
    id: 'h24',
    name: 'Image Hospitals Madhapur',
    address: 'Image Hospitals, Vittal Rao Nagar, Madhapur, Hyderabad, Telangana 500081, India',
    phone: '+91 40 2315 5555',
    coordinates: { lat: 17.4488, lng: 78.3910 },
    beds: {
      general: { total: 170, available: 60 },
      icu: { total: 40, available: 10 },
      specialty: { total: 45, available: 14 },
      er: { total: 25, available: 6 }
    },
    facilities: ['Diagnostics'],
    waitTime: 38,
    status: calculateHospitalStatus({
      general: { total: 170, available: 60 },
      icu: { total: 40, available: 10 },
      specialty: { total: 45, available: 14 },
      er: { total: 25, available: 6 }
    })
  },
  {
    id: 'h25',
    name: 'OMNI Hospitals Kukatpally',
    address: 'OMNI Hospitals, KPHB Colony, Kukatpally, Hyderabad, Telangana 500072, India',
    phone: '+91 40 6750 9999',
    coordinates: { lat: 17.4946, lng: 78.3995 },
    beds: {
      general: { total: 190, available: 70 },
      icu: { total: 45, available: 12 },
      specialty: { total: 55, available: 18 },
      er: { total: 30, available: 9 }
    },
    facilities: ['Emergency'],
    waitTime: 40,
    status: calculateHospitalStatus({
      general: { total: 190, available: 70 },
      icu: { total: 45, available: 12 },
      specialty: { total: 55, available: 18 },
      er: { total: 30, available: 9 }
    })
  }
];





const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Bed Availability Update',
    message: 'ICU beds are running low at City General Hospital',
    type: 'warning',
    timestamp: new Date(),
    read: false
  },
  {
    id: '2',
    title: 'New Equipment Added',
    message: 'MRI machine is now operational in Wing C',
    type: 'success',
    timestamp: new Date(Date.now() - 3600000),
    read: false
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'Scheduled maintenance completed successfully',
    type: 'info',
    timestamp: new Date(Date.now() - 7200000),
    read: true
  },
  {
    id: '4',
    title: 'Emergency Alert',
    message: 'Mass casualty incident - all available beds needed',
    type: 'error',
    timestamp: new Date(Date.now() - 1800000),
    read: false
  }
];

const mockEmergencyAlerts: Notification[] = [
  {
    id: 'e1',
    title: 'Code Red Alert',
    message: 'Multiple ambulances en route to City General Hospital',
    type: 'error',
    timestamp: new Date(),
    read: false
  },
  {
    id: 'e2',
    title: 'Capacity Warning',
    message: 'St. Mary Medical Center approaching full capacity',
    type: 'warning',
    timestamp: new Date(Date.now() - 900000),
    read: false
  }
];

export function HospitalProvider({ children }: { children: React.ReactNode }) {
  const [hospitals, setHospitals] = useState<Hospital[]>(() => {
  const stored = localStorage.getItem('hospitals');
  return stored ? JSON.parse(stored) : mockHospitals;
});

  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [emergencyAlerts, setEmergencyAlerts] = useState<Notification[]>(mockEmergencyAlerts);
  useEffect(() => {
  localStorage.setItem('hospitals', JSON.stringify(hospitals));
}, [hospitals]);


  const updateBedAvailability = (hospitalId: string, bedType: string, available: number) => {
    setHospitals(prev => prev.map(hospital => {
      if (hospital.id === hospitalId) {
        const updatedHospital = {
          ...hospital,
          beds: {
            ...hospital.beds,
            [bedType]: {
              ...hospital.beds[bedType as keyof typeof hospital.beds],
              available
            }
          }
        };
        
        // Update hospital status based on total availability
        const totalBeds = Object.values(updatedHospital.beds).reduce((sum, bed) => sum + bed.total, 0);
        const availableBeds = Object.values(updatedHospital.beds).reduce((sum, bed) => sum + bed.available, 0);
        const occupancyRate = (totalBeds - availableBeds) / totalBeds;
        
        updatedHospital.status = occupancyRate >= 0.95 ? 'full' : occupancyRate >= 0.8 ? 'limited' : 'available';
        
        return {
          ...updatedHospital
        };
      }
      return hospital;
    }));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const addEmergencyAlert = (alert: Omit<Notification, 'id' | 'timestamp'>) => {
    const newAlert: Notification = {
      ...alert,
      id: `e${Date.now()}`,
      timestamp: new Date()
    };
    setEmergencyAlerts(prev => [newAlert, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
    setEmergencyAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const getHospitalStats = () => {
    const totalHospitals = hospitals.length;
    const totalBeds = hospitals.reduce((sum, h) => sum + Object.values(h.beds).reduce((bedSum, bed) => bedSum + bed.total, 0), 0);
    const availableBeds = hospitals.reduce((sum, h) => sum + Object.values(h.beds).reduce((bedSum, bed) => bedSum + bed.available, 0), 0);
    const averageWaitTime = hospitals.reduce((sum, h) => sum + h.waitTime, 0) / totalHospitals;
    const availableHospitals = hospitals.filter(h => h.status === 'available').length;
    
    return {
      totalHospitals,
      totalBeds,
      availableBeds,
      occupancyRate: Math.round(((totalBeds - availableBeds) / totalBeds) * 100),
      averageWaitTime: Math.round(averageWaitTime),
      availableHospitals
    };
  };

  return (
    <HospitalContext.Provider value={{
      hospitals,
      notifications,
      emergencyAlerts,
      updateBedAvailability,
      addNotification,
      addEmergencyAlert,
      markNotificationRead,
      getHospitalStats
    }}>
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospital() {
  const context = useContext(HospitalContext);
  if (context === undefined) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
}