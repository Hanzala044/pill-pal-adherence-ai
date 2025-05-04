
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: string;
  image: string;
  instructions: string;
  lastTaken?: string;
  nextDose: string;
  is_active: boolean;
  color: string;
}

export interface AdherenceRecord {
  id: string;
  medicationId: string;
  medicationName: string;
  timestamp: string;
  status: 'taken' | 'missed' | 'skipped';
  pillVerified: boolean;
  userVerified: boolean;
}

// Using an array that can be modified at runtime instead of a const
export const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    schedule: 'Once daily',
    image: '/placeholder.svg',
    instructions: 'Take with food in the morning',
    lastTaken: '2025-04-24T08:30:00',
    nextDose: '2025-04-25T08:00:00',
    is_active: true,
    color: 'purple'
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    schedule: 'Twice daily',
    image: '/placeholder.svg',
    instructions: 'Take with morning and evening meals',
    lastTaken: '2025-04-24T18:15:00',
    nextDose: '2025-04-25T08:00:00',
    is_active: true,
    color: 'blue'
  },
  {
    id: '3',
    name: 'Atorvastatin',
    dosage: '20mg',
    schedule: 'Once daily',
    image: '/placeholder.svg',
    instructions: 'Take in the evening',
    nextDose: '2025-04-24T20:00:00',
    is_active: true,
    color: 'green'
  },
  {
    id: '4',
    name: 'Aspirin',
    dosage: '81mg',
    schedule: 'Once daily',
    image: '/placeholder.svg',
    instructions: 'Take with food',
    lastTaken: '2025-04-24T08:30:00',
    nextDose: '2025-04-25T08:00:00',
    is_active: true,
    color: 'orange'
  }
];

export const mockAdherenceHistory: AdherenceRecord[] = [
  {
    id: '101',
    medicationId: '1',
    medicationName: 'Lisinopril 10mg',
    timestamp: '2025-04-24T08:30:00',
    status: 'taken',
    pillVerified: true,
    userVerified: true
  },
  {
    id: '102',
    medicationId: '2',
    medicationName: 'Metformin 500mg',
    timestamp: '2025-04-24T08:15:00',
    status: 'taken',
    pillVerified: true,
    userVerified: true
  },
  {
    id: '103',
    medicationId: '2',
    medicationName: 'Metformin 500mg',
    timestamp: '2025-04-24T18:15:00',
    status: 'taken',
    pillVerified: true,
    userVerified: true
  },
  {
    id: '104',
    medicationId: '4',
    medicationName: 'Aspirin 81mg',
    timestamp: '2025-04-24T08:30:00',
    status: 'taken',
    pillVerified: true,
    userVerified: true
  },
  {
    id: '105',
    medicationId: '3',
    medicationName: 'Atorvastatin 20mg',
    timestamp: '2025-04-23T20:00:00',
    status: 'missed',
    pillVerified: false,
    userVerified: false
  },
  {
    id: '106',
    medicationId: '1',
    medicationName: 'Lisinopril 10mg',
    timestamp: '2025-04-23T08:30:00',
    status: 'taken',
    pillVerified: true,
    userVerified: true
  },
  {
    id: '107',
    medicationId: '2',
    medicationName: 'Metformin 500mg',
    timestamp: '2025-04-23T08:15:00',
    status: 'taken',
    pillVerified: true,
    userVerified: true
  },
  {
    id: '108',
    medicationId: '2',
    medicationName: 'Metformin 500mg',
    timestamp: '2025-04-23T18:15:00',
    status: 'skipped',
    pillVerified: false,
    userVerified: true
  }
];
