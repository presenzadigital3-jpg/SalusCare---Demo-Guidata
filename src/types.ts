export type AppointmentStatus =
  | 'Confermato'
  | 'In attesa di conferma'
  | 'A rischio'
  | 'Liberato'
  | 'Candidate search'
  | 'Offerto'
  | 'Accettato'
  | 'Completato'
  | 'Bloccato dal device gate';

export type ClinicalPriority = 'Alta' | 'Media' | 'Bassa';

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  insuranceAuthorized: boolean;
  preferredLocation: string;
  daysInWaitingList: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  specialty: string;
  examType: string;
  date: string;
  time: string;
  location: string;
  room: string;
  deviceId: string;
  physician: string;
  status: AppointmentStatus;
  priority: ClinicalPriority;
  preparationRequired: string;
  cancelReason?: string;
  hoursNotice?: number;
  proxyValue: number; // in Euro
  selectedCandidateId?: string;
  biomedicalCheckRequired?: boolean;
  biomedicalCheckCompleted?: boolean;
  deviceGateStatus?: 'ALLOW' | 'ALLOW WITH CONDITIONS' | 'HOLD';
  overrideReason?: string;
  totalRecoveryMinutes?: number;
}

export interface Candidate {
  id: string;
  name: string;
  patientId: string;
  priority: ClinicalPriority;
  daysInWaitingList: number;
  preferredLocation: string;
  availability: string;
  insuranceAuthorized: boolean;
  compatibilityScore: number;
  reasonCodes: string[];
  constraints?: string[];
  contactChannel: string;
}

export interface Device {
  id: string;
  type: 'RM' | 'TAC' | 'ECO' | 'RX' | 'MAMMO';
  name: string;
  location: string;
  status: 'ONLINE' | 'MAINTENANCE' | 'ALERT' | 'OFFLINE';
  uptime: number; // percentage
  patchCompliance: boolean;
  firmware: string;
  scheduledMaintenance: string;
  recentAnomalies: string[];
  connectionsFailed: number;
  cyberEventsCount: number;
  availabilityDecision: 'ALLOW' | 'ALLOW WITH CONDITIONS' | 'HOLD';
}

export interface CyberEvent {
  id: string;
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  deviceId?: string;
  status: 'OPEN' | 'RESOLVED';
  resolvedAt?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  event: string;
  sourceSystem: string;
  operator: string;
  patientId: string;
  appointmentId: string;
  episodeId: string;
  ruleApplied: string;
  decision: string;
  override?: string;
  outcome?: string;
}

export interface Complaint {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  category: string;
  text: string;
  status: 'OPEN' | 'RESOLVED';
}

export interface OperationalAlert {
  id: string;
  type: 'SLOT_RISK' | 'DEVICE_ANOMALY' | 'COMPLAINT' | 'CYBER';
  message: string;
  timestamp: string;
  severity: 'HIGH' | 'CRITICAL' | 'MEDIUM' | 'LOW';
  resolved: boolean;
}

export interface DemoState {
  currentStep: number;
  view: 'patient' | 'operations';
  activePatientId: string; // 'PAT-1042' (Giulia Bianchi) or 'PAT-2011' (Matteo Rossini)
  activeSlotId: string; // Giulia's original slot
}
