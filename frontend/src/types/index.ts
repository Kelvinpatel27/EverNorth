export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'patient' | 'ems';
  hospitalId?: string;
  emsUnit?: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  beds: {
    general: { total: number; available: number };
    icu: { total: number; available: number };
    specialty: { total: number; available: number };
    er: { total: number; available: number };
  };
  facilities: string[];
  waitTime: number; // in minutes
  status: 'available' | 'full' | 'limited';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  read: boolean;
}