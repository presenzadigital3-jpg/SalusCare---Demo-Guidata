import { Appointment, Device, CyberEvent, AuditEvent, Complaint, OperationalAlert, Candidate } from './types';

export const PATIENTS = [
  { id: 'PAT-1042', name: 'Giulia Bianchi', email: 'giulia.bianchi@email.it', phone: '+39 345 678 9012', insuranceAuthorized: true, preferredLocation: 'Milano Centro', daysInWaitingList: 12 },
  { id: 'PAT-2011', name: 'Matteo Rossini', email: 'matteo.rossini@email.it', phone: '+39 333 456 7890', insuranceAuthorized: true, preferredLocation: 'Milano Centro', daysInWaitingList: 45 },
  { id: 'PAT-3012', name: 'Stefano Moretti', email: 'stefano.moretti@email.it', phone: '+39 347 123 4567', insuranceAuthorized: true, preferredLocation: 'Milano Centro', daysInWaitingList: 34 },
  { id: 'PAT-4013', name: 'Sofia Colombo', email: 'sofia.colombo@email.it', phone: '+39 328 987 6543', insuranceAuthorized: false, preferredLocation: 'Milano Nord', daysInWaitingList: 8 },
  { id: 'PAT-5014', name: 'Alessandro Verde', email: 'alessandro.verde@email.it', phone: '+39 335 111 2222', insuranceAuthorized: true, preferredLocation: 'Monza', daysInWaitingList: 22 },
  { id: 'PAT-6015', name: 'Francesca Ferrari', email: 'francesca.ferrari@email.it', phone: '+39 340 222 3333', insuranceAuthorized: true, preferredLocation: 'Milano Centro', daysInWaitingList: 19 },
  { id: 'PAT-7016', name: 'Roberto Gatti', email: 'roberto.gatti@email.it', phone: '+39 339 444 5555', insuranceAuthorized: true, preferredLocation: 'Milano Nord', daysInWaitingList: 27 },
  { id: 'PAT-8017', name: 'Elena Russo', email: 'elena.russo@email.it', phone: '+39 348 555 6666', insuranceAuthorized: true, preferredLocation: 'Monza', daysInWaitingList: 5 },
  { id: 'PAT-9018', name: 'Lorenzo Villa', email: 'lorenzo.villa@email.it', phone: '+39 331 666 7777', insuranceAuthorized: true, preferredLocation: 'Milano Centro', daysInWaitingList: 41 },
  { id: 'PAT-0019', name: 'Chiara Mancini', email: 'chiara.mancini@email.it', phone: '+39 320 777 8888', insuranceAuthorized: true, preferredLocation: 'Milano Nord', daysInWaitingList: 14 },
  { id: 'PAT-1120', name: 'Giovanni Gallo', email: 'giovanni.gallo@email.it', phone: '+39 342 888 9999', insuranceAuthorized: false, preferredLocation: 'Milano Centro', daysInWaitingList: 30 },
  { id: 'PAT-2221', name: 'Beatrice Serra', email: 'beatrice.serra@email.it', phone: '+39 338 999 0000', insuranceAuthorized: true, preferredLocation: 'Monza', daysInWaitingList: 16 }
];

export function getInitialAppointments(): Appointment[] {
  return [
    {
      id: 'APT-1042',
      patientId: 'PAT-1042',
      patientName: 'Giulia Bianchi',
      specialty: 'Radiologia',
      examType: 'Risonanza Magnetica Encefalo',
      date: '2026-07-21', // 7 days from current mock date
      time: '10:30',
      location: 'Milano Centro',
      room: 'Sala RM 1',
      deviceId: 'RM-001',
      physician: 'Dr.ssa Elena Riva',
      status: 'In attesa di conferma', // Initial status before cancel
      priority: 'Media',
      preparationRequired: 'Digiuno da 6 ore. Portare precedenti esami radiologici e creatinina ematica recente.',
      proxyValue: 380
    },
    {
      id: 'APT-1001',
      patientId: 'PAT-3012',
      patientName: 'Stefano Moretti',
      specialty: 'Radiologia',
      examType: 'Risonanza Magnetica Spalla DX',
      date: '2026-07-14',
      time: '08:30',
      location: 'Milano Centro',
      room: 'Sala RM 1',
      deviceId: 'RM-001',
      physician: 'Dr.ssa Elena Riva',
      status: 'Completato',
      priority: 'Media',
      preparationRequired: 'Nessuna preparazione specifica.',
      proxyValue: 310
    },
    {
      id: 'APT-1002',
      patientId: 'PAT-4013',
      patientName: 'Sofia Colombo',
      specialty: 'Radiologia',
      examType: 'TAC Addome Completo',
      date: '2026-07-14',
      time: '09:15',
      location: 'Milano Nord',
      room: 'Sala TAC 1',
      deviceId: 'TAC-001',
      physician: 'Dr. Marco Valli',
      status: 'Confermato',
      priority: 'Bassa',
      preparationRequired: 'Digiuno da 6 ore. Assumere mezzo di contrasto orale secondo istruzioni.',
      proxyValue: 290
    },
    {
      id: 'APT-1003',
      patientId: 'PAT-5014',
      patientName: 'Alessandro Verde',
      specialty: 'Cardiologia',
      examType: 'Ecocardiogramma Color Doppler',
      date: '2026-07-14',
      time: '11:00',
      location: 'Monza',
      room: 'Amb. Cardiologia 2',
      deviceId: 'ECO-001',
      physician: 'Dr. Roberto Lanza',
      status: 'In attesa di conferma',
      priority: 'Media',
      preparationRequired: 'Nessuna preparazione specifica.',
      proxyValue: 150
    },
    {
      id: 'APT-1004',
      patientId: 'PAT-6015',
      patientName: 'Francesca Ferrari',
      specialty: 'Ortopedia',
      examType: 'Visita Specialistica Ortopedica',
      date: '2026-07-14',
      time: '12:00',
      location: 'Milano Centro',
      room: 'Amb. Ortopedia 1',
      deviceId: 'RX-001', // uses RX room for check
      physician: 'Dr. Fabrizio Galli',
      status: 'Confermato',
      priority: 'Alta',
      preparationRequired: 'Portare documentazione radiografica precedente.',
      proxyValue: 120
    },
    {
      id: 'APT-1005',
      patientId: 'PAT-7016',
      patientName: 'Roberto Gatti',
      specialty: 'Fisioterapia',
      examType: 'Seduta di Tecarterapia Spalla',
      date: '2026-07-15',
      time: '14:30',
      location: 'Milano Nord',
      room: 'Box Fisioterapia 3',
      deviceId: 'ECO-001', // placeholder device
      physician: 'Dr.ssa Laura Bianchi',
      status: 'Confermato',
      priority: 'Media',
      preparationRequired: 'Abbigliamento comodo.',
      proxyValue: 90
    },
    {
      id: 'APT-1006',
      patientId: 'PAT-8017',
      patientName: 'Elena Russo',
      specialty: 'Radiologia',
      examType: 'Mammografia Bilaterale',
      date: '2026-07-15',
      time: '10:00',
      location: 'Monza',
      room: 'Sala Senologia',
      deviceId: 'MAMMO-001',
      physician: 'Dr.ssa Anna Neri',
      status: 'Confermato',
      priority: 'Bassa',
      preparationRequired: 'Non applicare deodoranti o talco sulla cute della regione ascellare e mammaria.',
      proxyValue: 180
    },
    {
      id: 'APT-1007',
      patientId: 'PAT-9018',
      patientName: 'Lorenzo Villa',
      specialty: 'Laboratorio',
      examType: 'Prelievo Ematichio Profilo Completo',
      date: '2026-07-15',
      time: '07:30',
      location: 'Milano Centro',
      room: 'Punto Prelievi Box 1',
      deviceId: 'RX-001', // placeholder
      physician: 'Dr.ssa Silvia Ferri',
      status: 'In attesa di conferma',
      priority: 'Bassa',
      preparationRequired: 'Rimanere a digiuno dalla sera precedente.',
      proxyValue: 60
    },
    {
      id: 'APT-1008',
      patientId: 'PAT-0019',
      patientName: 'Chiara Mancini',
      specialty: 'Radiologia',
      examType: 'Risonanza Magnetica Ginocchio SX',
      date: '2026-07-15',
      time: '15:30',
      location: 'Milano Nord',
      room: 'Sala RM 2',
      deviceId: 'RM-002',
      physician: 'Dr. Paolo Castelli',
      status: 'A rischio',
      priority: 'Media',
      preparationRequired: 'Nessuna preparazione specifica.',
      proxyValue: 320
    },
    {
      id: 'APT-1009',
      patientId: 'PAT-1120',
      patientName: 'Giovanni Gallo',
      specialty: 'Radiologia',
      examType: 'Radiografia Torace standard',
      date: '2026-07-16',
      time: '11:15',
      location: 'Milano Centro',
      room: 'Sala RX 1',
      deviceId: 'RX-001',
      physician: 'Dr. Stefano Costa',
      status: 'In attesa di conferma',
      priority: 'Bassa',
      preparationRequired: 'Nessuna preparazione specifica.',
      proxyValue: 80
    },
    {
      id: 'APT-1010',
      patientId: 'PAT-2221',
      patientName: 'Beatrice Serra',
      specialty: 'Cardiologia',
      examType: 'Test Cardiologico da Sforzo',
      date: '2026-07-16',
      time: '16:00',
      location: 'Monza',
      room: 'Amb. Cardiologia 1',
      deviceId: 'ECO-001',
      physician: 'Dr. Roberto Lanza',
      status: 'Confermato',
      priority: 'Media',
      preparationRequired: 'Abbigliamento sportivo. Digiuno da 3 ore.',
      proxyValue: 220
    },
    {
      id: 'APT-1011',
      patientId: 'PAT-2011',
      patientName: 'Matteo Rossini',
      specialty: 'Radiologia',
      examType: 'Risonanza Magnetica Encefalo',
      date: '2026-08-18', // Future appointment far in waiting pool
      time: '12:00',
      location: 'Milano Centro',
      room: 'Sala RM 1',
      deviceId: 'RM-001',
      physician: 'Dr.ssa Elena Riva',
      status: 'In attesa di conferma',
      priority: 'Alta',
      preparationRequired: 'Digiuno da 6 ore.',
      proxyValue: 380
    },
    // Remaining appointments to complete the count of 20
    { id: 'APT-1012', patientId: 'PAT-3012', patientName: 'Stefano Moretti', specialty: 'Fisioterapia', examType: 'Seduta di Fisioterapia Posturale', date: '2026-07-16', time: '14:00', location: 'Milano Centro', room: 'Box Fisioterapia 1', deviceId: 'ECO-001', physician: 'Dr.ssa Laura Bianchi', status: 'Confermato', priority: 'Media', preparationRequired: 'Abbigliamento comodo.', proxyValue: 80 },
    { id: 'APT-1013', patientId: 'PAT-4013', patientName: 'Sofia Colombo', specialty: 'Laboratorio', examType: 'Esami del Sangue Profilo Tiroideo', date: '2026-07-17', time: '08:00', location: 'Milano Nord', room: 'Punto Prelievi Box 2', deviceId: 'RX-001', physician: 'Dr.ssa Silvia Ferri', status: 'Confermato', priority: 'Bassa', preparationRequired: 'Digiuno da 12 ore.', proxyValue: 50 },
    { id: 'APT-1014', patientId: 'PAT-5014', patientName: 'Alessandro Verde', specialty: 'Ortopedia', examType: 'Infiltrazione Ginocchio acido ialuronico', date: '2026-07-17', time: '10:30', location: 'Monza', room: 'Amb. Ortopedia 1', deviceId: 'RX-001', physician: 'Dr. Fabrizio Galli', status: 'In attesa di conferma', priority: 'Alta', preparationRequired: 'Portare farmaco acquistato in farmacia.', proxyValue: 140 },
    { id: 'APT-1015', patientId: 'PAT-6015', patientName: 'Francesca Ferrari', specialty: 'Radiologia', examType: 'Ecografia Addome Superiore', date: '2026-07-17', time: '15:00', location: 'Milano Centro', room: 'Sala Eco 1', deviceId: 'ECO-001', physician: 'Dr. Paolo Castelli', status: 'Confermato', priority: 'Media', preparationRequired: 'Digiuno da 6 ore. Dieta priva di scorie nei 3 giorni precedenti.', proxyValue: 110 },
    { id: 'APT-1016', patientId: 'PAT-7016', patientName: 'Roberto Gatti', specialty: 'Radiologia', examType: 'Risonanza Magnetica Lombosacrale', date: '2026-07-18', time: '09:00', location: 'Milano Nord', room: 'Sala RM 2', deviceId: 'RM-002', physician: 'Dr. Stefano Costa', status: 'A rischio', priority: 'Media', preparationRequired: 'Nessuna preparazione.', proxyValue: 310 },
    { id: 'APT-1017', patientId: 'PAT-8017', patientName: 'Elena Russo', specialty: 'Cardiologia', examType: 'Elettrocardiogramma basale', date: '2026-07-18', time: '11:30', location: 'Monza', room: 'Amb. Cardiologia 1', deviceId: 'ECO-001', physician: 'Dr. Roberto Lanza', status: 'Confermato', priority: 'Bassa', preparationRequired: 'Nessuna preparazione.', proxyValue: 70 },
    { id: 'APT-1018', patientId: 'PAT-9018', patientName: 'Lorenzo Villa', specialty: 'Radiologia', examType: 'Radiografia Ginocchio Bilaterale sotto carico', date: '2026-07-18', time: '14:00', location: 'Milano Centro', room: 'Sala RX 1', deviceId: 'RX-001', physician: 'Dr. Stefano Costa', status: 'Confermato', priority: 'Bassa', preparationRequired: 'Portare esami precedenti.', proxyValue: 90 },
    { id: 'APT-1019', patientId: 'PAT-0019', patientName: 'Chiara Mancini', specialty: 'Radiologia', examType: 'Mammografia Monolaterale', date: '2026-07-19', time: '09:30', location: 'Milano Nord', room: 'Sala Senologia', deviceId: 'MAMMO-001', physician: 'Dr.ssa Anna Neri', status: 'Confermato', priority: 'Media', preparationRequired: 'Nessuna preparazione specifica.', proxyValue: 130 }
  ];
}

export function getInitialDevices(): Device[] {
  return [
    {
      id: 'RM-001',
      type: 'RM',
      name: 'Risonanza Magnetica 3 Tesla',
      location: 'Milano Centro',
      status: 'ALERT', // Starts with alert because of firmware/cyber events or pending biomedical verify
      uptime: 97.2,
      patchCompliance: false,
      firmware: 'v5.8.4-build19',
      scheduledMaintenance: '2026-08-02',
      recentAnomalies: [
        'Lieve incremento del tempo di ricostruzione immagine (3.2s vs 2.1s)',
        'Anomalia di sincronizzazione ntp rilevata dall\'IDS locale'
      ],
      connectionsFailed: 14,
      cyberEventsCount: 3,
      availabilityDecision: 'ALLOW WITH CONDITIONS'
    },
    {
      id: 'RM-002',
      type: 'RM',
      name: 'Risonanza Magnetica 1.5 Tesla',
      location: 'Milano Nord',
      status: 'ONLINE',
      uptime: 98.9,
      patchCompliance: true,
      firmware: 'v4.1.2-build08',
      scheduledMaintenance: '2026-07-28',
      recentAnomalies: [],
      connectionsFailed: 2,
      cyberEventsCount: 0,
      availabilityDecision: 'ALLOW'
    },
    {
      id: 'TAC-001',
      type: 'TAC',
      name: 'Tomografia Computerizzata 128 Strati',
      location: 'Milano Nord',
      status: 'ONLINE',
      uptime: 99.1,
      patchCompliance: true,
      firmware: 'v3.5.2-build12',
      scheduledMaintenance: '2026-07-24',
      recentAnomalies: [],
      connectionsFailed: 0,
      cyberEventsCount: 0,
      availabilityDecision: 'ALLOW'
    },
    {
      id: 'ECO-001',
      type: 'ECO',
      name: 'Ecolaser HD Doppler Premium',
      location: 'Monza',
      status: 'ONLINE',
      uptime: 99.8,
      patchCompliance: true,
      firmware: 'v9.0.1-build31',
      scheduledMaintenance: '2026-08-15',
      recentAnomalies: [],
      connectionsFailed: 1,
      cyberEventsCount: 0,
      availabilityDecision: 'ALLOW'
    },
    {
      id: 'RX-001',
      type: 'RX',
      name: 'Ortoclinostato Digitale RX-90',
      location: 'Milano Centro',
      status: 'ONLINE',
      uptime: 98.5,
      patchCompliance: true,
      firmware: 'v2.1.0-build04',
      scheduledMaintenance: '2026-07-31',
      recentAnomalies: [],
      connectionsFailed: 3,
      cyberEventsCount: 1,
      availabilityDecision: 'ALLOW'
    },
    {
      id: 'MAMMO-001',
      type: 'MAMMO',
      name: 'Mammografo con Tomosintesi Hologic',
      location: 'Monza',
      status: 'ONLINE',
      uptime: 97.8,
      patchCompliance: true,
      firmware: 'v6.2.2-build10',
      scheduledMaintenance: '2026-08-10',
      recentAnomalies: [],
      connectionsFailed: 4,
      cyberEventsCount: 0,
      availabilityDecision: 'ALLOW'
    }
  ];
}

export function getInitialCyberEvents(): CyberEvent[] {
  return [
    { id: 'CYB-001', timestamp: '2026-07-14T02:14:00Z', severity: 'HIGH', description: 'Scansione porte IP non autorizzata rilevata dall\'IDS del segmento VLAN Radiologia verso RM-001.', deviceId: 'RM-001', status: 'OPEN' },
    { id: 'CYB-002', timestamp: '2026-07-13T18:45:00Z', severity: 'HIGH', description: 'Tentativo di autenticazione SSH fallito ripetuto con credenziali di default (admin/admin) su RM-001.', deviceId: 'RM-001', status: 'OPEN' },
    { id: 'CYB-003', timestamp: '2026-07-13T12:30:00Z', severity: 'MEDIUM', description: 'Discrepanza di configurazione firmware rilevata durante il controllo di integrità settimanale di RM-001.', deviceId: 'RM-001', status: 'OPEN' },
    { id: 'CYB-004', timestamp: '2026-07-11T09:12:00Z', severity: 'LOW', description: 'Certificato SSL in scadenza su gateway DICOM secondario di Milano Centro.', status: 'RESOLVED', resolvedAt: '2026-07-12T10:00:00Z' },
    { id: 'CYB-005', timestamp: '2026-07-10T14:22:00Z', severity: 'CRITICAL', description: 'Traffico di rete anomalo (exfiltration signature) rilevato dal server PACS principale.', status: 'RESOLVED', resolvedAt: '2026-07-10T17:45:00Z' },
    { id: 'CYB-006', timestamp: '2026-07-09T08:00:00Z', severity: 'LOW', description: 'Scansione automatica settimanale vulnerabilità non ha evidenziato criticita su TAC-001.', deviceId: 'TAC-001', status: 'RESOLVED', resolvedAt: '2026-07-09T08:30:00Z' },
    { id: 'CYB-007', timestamp: '2026-07-08T11:40:00Z', severity: 'MEDIUM', description: 'Anomalia di autenticazione utente per operatore clinico su console RX-001.', deviceId: 'RX-001', status: 'RESOLVED', resolvedAt: '2026-07-08T12:05:00Z' },
    { id: 'CYB-008', timestamp: '2026-07-07T16:30:00Z', severity: 'LOW', description: 'Aggiornamento antivirus non riuscito su server di backup locale Milano Centro.', status: 'RESOLVED', resolvedAt: '2026-07-08T09:00:00Z' },
    { id: 'CYB-009', timestamp: '2026-07-06T10:15:00Z', severity: 'MEDIUM', description: 'Rilevato pacchetto di rete non standard malformato indirizzato a RM-001.', deviceId: 'RM-001', status: 'RESOLVED', resolvedAt: '2026-07-06T11:00:00Z' },
    { id: 'CYB-010', timestamp: '2026-07-05T13:00:00Z', severity: 'CRITICAL', description: 'Ransomware alert (falso positivo) generato su endpoint di refertazione in Ortopedia Milano Centro.', status: 'RESOLVED', resolvedAt: '2026-07-05T13:45:00Z' }
  ];
}

export function getInitialAuditTrail(): AuditEvent[] {
  return [
    { id: 'AUD-301', timestamp: '2026-07-14T07:22:15Z', event: 'appointment_created', sourceSystem: 'CUP_SALUSCARE', operator: 'SISTEMA_CUP', patientId: 'PAT-1042', appointmentId: 'APT-1042', episodeId: 'EPI-9042', ruleApplied: 'REG_SLOT_CREATION', decision: 'SUCCESS' },
    { id: 'AUD-302', timestamp: '2026-07-14T07:23:00Z', event: 'confirmation_requested', sourceSystem: 'SMART_ACCESS', operator: 'SISTEMA_ACCESS', patientId: 'PAT-1042', appointmentId: 'APT-1042', episodeId: 'EPI-9042', ruleApplied: 'REG_CONFIRM_TRIG', decision: 'OFFER_SENT' },
    { id: 'AUD-303', timestamp: '2026-07-13T17:30:00Z', event: 'confirmation_received', sourceSystem: 'PORTALE_PAZIENTE', operator: 'Giulia Bianchi', patientId: 'PAT-1042', appointmentId: 'APT-1001', episodeId: 'EPI-9001', ruleApplied: 'REG_CONFIRM_ACK', decision: 'CONFIRMED' },
    { id: 'AUD-304', timestamp: '2026-07-13T14:20:00Z', event: 'slot_reassigned', sourceSystem: 'SMART_ACCESS', operator: 'Marco Rinaldi', patientId: 'PAT-3012', appointmentId: 'APT-1001', episodeId: 'EPI-9001', ruleApplied: 'REG_SLOT_ALLOC', decision: 'REASSIGNED' },
    { id: 'AUD-305', timestamp: '2026-07-13T11:15:00Z', event: 'operator_decision', sourceSystem: 'COCKPIT_OPS', operator: 'Marco Rinaldi', patientId: 'PAT-3012', appointmentId: 'APT-1001', episodeId: 'EPI-9001', ruleApplied: 'REG_OPERATOR_APPROVAL', decision: 'APPROVED' },
    { id: 'AUD-306', timestamp: '2026-07-13T11:02:00Z', event: 'device_gate_evaluated', sourceSystem: 'DEVICE_GATE', operator: 'SISTEMA_GATE', patientId: 'PAT-3012', appointmentId: 'APT-1001', episodeId: 'EPI-9001', ruleApplied: 'REG_CYBER_HEALTH', decision: 'ALLOW' },
    { id: 'AUD-307', timestamp: '2026-07-13T10:45:00Z', event: 'candidate_ranked', sourceSystem: 'RANKING_ENGINE', operator: 'SISTEMA_RANK', patientId: 'PAT-3012', appointmentId: 'APT-1001', episodeId: 'EPI-9001', ruleApplied: 'REG_CLINICAL_RANK', decision: 'RANKED' },
    { id: 'AUD-308', timestamp: '2026-07-13T10:40:00Z', event: 'candidate_search_started', sourceSystem: 'SMART_ACCESS', operator: 'Marco Rinaldi', patientId: 'PAT-3012', appointmentId: 'APT-1001', episodeId: 'EPI-9001', ruleApplied: 'REG_MATCH_INIT', decision: 'STARTED' },
    { id: 'AUD-309', timestamp: '2026-07-13T10:30:15Z', event: 'slot_released', sourceSystem: 'PORTALE_PAZIENTE', operator: 'Roberto Gatti', patientId: 'PAT-7016', appointmentId: 'APT-1001', episodeId: 'EPI-9001', ruleApplied: 'REG_CANCELLATION_RECON', decision: 'RELEASED' },
    { id: 'AUD-310', timestamp: '2026-07-12T16:00:00Z', event: 'value_measured', sourceSystem: 'COCKPIT_OPS', operator: 'SISTEMA_KPI', patientId: 'PAT-5014', appointmentId: 'APT-1014', episodeId: 'EPI-9014', ruleApplied: 'REG_KPI_MEASURE', decision: 'COMPLETED_VALUED' },
    // Fill up to 30 items for realism
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `AUD-${311 + i}`,
      timestamp: new Date(Date.now() - (i + 1) * 3600000 * 2.5).toISOString(),
      event: i % 4 === 0 ? 'appointment_completed' : i % 4 === 1 ? 'patient_checked_in' : i % 4 === 2 ? 'offer_accepted' : 'offer_sent',
      sourceSystem: i % 2 === 0 ? 'COCKPIT_OPS' : 'PORTALE_PAZIENTE',
      operator: i % 2 === 0 ? 'Marco Rinaldi' : 'SISTEMA_ACCESS',
      patientId: `PAT-${1000 + (i * 7) % 1200}`,
      appointmentId: `APT-${1000 + i}`,
      episodeId: `EPI-${9000 + i}`,
      ruleApplied: 'REG_FLOW_AUDIT',
      decision: 'SUCCESS'
    }))
  ];
}

export function getInitialComplaints(): Complaint[] {
  return [
    { id: 'REC-001', patientId: 'PAT-4013', patientName: 'Sofia Colombo', date: '2026-07-12', category: 'Attesa', text: 'Tempo di attesa in sala d\'aspetto di oltre 50 minuti per la risonanza magnetica presso la sede di Milano Nord.', status: 'OPEN' },
    { id: 'REC-002', patientId: 'PAT-1120', patientName: 'Giovanni Gallo', date: '2026-07-11', category: 'Comunicazione', text: 'Nessuna notifica ricevuta via SMS o App per l\'avvenuta variazione oraria del prelievo.', status: 'OPEN' },
    { id: 'REC-003', patientId: 'PAT-6015', patientName: 'Francesca Ferrari', date: '2026-07-10', category: 'Infrastruttura', text: 'Parcheggio disabili occupato da mezzi di servizio non identificati a Milano Centro.', status: 'RESOLVED' },
    { id: 'REC-004', patientId: 'PAT-8017', patientName: 'Elena Russo', date: '2026-07-09', category: 'Amministrativo', text: 'Difficoltà ad applicare la convenzione assicurativa diretta per esami di diagnostica.', status: 'RESOLVED' }
  ];
}

export function getInitialOperationalAlerts(): OperationalAlert[] {
  return [
    { id: 'ALT-001', type: 'SLOT_RISK', message: 'Slot del 15/07 su RM-002 a rischio: Paziente Chiara Mancini (PAT-0019) non ha risposto ai 2 reminder di conferma.', timestamp: '2026-07-14T06:45:00Z', severity: 'HIGH', resolved: false },
    { id: 'ALT-002', type: 'CYBER', message: 'Anomalia IDS su RM-001: 3 cyber eventi aperti non risolti di gravità Media/Alta nell\'ultimo cluster temporale.', timestamp: '2026-07-14T05:12:00Z', severity: 'CRITICAL', resolved: false },
    { id: 'ALT-003', type: 'DEVICE_ANOMALY', message: 'Uptime RM-001 sceso al 97.2% dovuto a ripetute disconnessioni di rete localizzate.', timestamp: '2026-07-14T04:30:00Z', severity: 'MEDIUM', resolved: false },
    { id: 'ALT-004', type: 'COMPLAINT', message: 'Nuovo reclamo urgente (REC-001) inserito da Sofia Colombo per tempo di attesa critico a Milano Nord.', timestamp: '2026-07-13T19:00:00Z', severity: 'MEDIUM', resolved: false },
    { id: 'ALT-005', type: 'SLOT_RISK', message: 'Preavviso utile ristretto (meno di 4 ore) per slot RM a Monza a causa di cancellazione tardiva.', timestamp: '2026-07-13T15:20:00Z', severity: 'HIGH', resolved: true },
    { id: 'ALT-006', type: 'DEVICE_ANOMALY', message: 'TAC-001: Aggiornamento firmware completato correttamente, riavvio diagnostico superato.', timestamp: '2026-07-12T22:00:00Z', severity: 'LOW', resolved: true },
    { id: 'ALT-007', type: 'CYBER', message: 'Tentativo di scansione ip bloccato dal firewall perimetrale Monza.', timestamp: '2026-07-11T13:40:00Z', severity: 'LOW', resolved: true },
    { id: 'ALT-008', type: 'COMPLAINT', message: 'Reclamo REC-003 risolto con rimozione mezzi e scuse formali inviate al paziente.', timestamp: '2026-07-10T18:00:00Z', severity: 'LOW', resolved: true }
  ];
}

export function getCandidatesForSlot(): Candidate[] {
  return [
    {
      id: 'CAN-001',
      name: 'Matteo Rossini',
      patientId: 'PAT-2011',
      priority: 'Alta',
      daysInWaitingList: 45,
      preferredLocation: 'Milano Centro',
      availability: 'Fascia Mattutina (08:00 - 13:00)',
      insuranceAuthorized: true,
      compatibilityScore: 96,
      reasonCodes: [
        'Priorità clinica rispettata (Alta)',
        '45 giorni in lista d\'attesa (superiore a P90)',
        'Sede Milano Centro preferita e compatibile',
        'Autorizzazione assicurativa valida e verificata',
        'Disponibilità lunedì-venerdì mattina confermata',
        'Nessun conflitto di agenda nell\'episodio clinico'
      ],
      contactChannel: 'Notifica App Push + SMS'
    },
    {
      id: 'CAN-002',
      name: 'Stefano Moretti',
      patientId: 'PAT-3012',
      priority: 'Media',
      daysInWaitingList: 34,
      preferredLocation: 'Milano Centro',
      availability: 'Flessibile (Qualsiasi fascia)',
      insuranceAuthorized: true,
      compatibilityScore: 89,
      reasonCodes: [
        'Priorità clinica rispettata (Media)',
        '34 giorni in lista d\'attesa',
        'Sede Milano Centro preferita',
        'Autorizzazione assicurativa valida',
        'Disponibilità totale confermata'
      ],
      contactChannel: 'Notifica App Push'
    },
    {
      id: 'CAN-003',
      name: 'Francesca Ferrari',
      patientId: 'PAT-6015',
      priority: 'Media',
      daysInWaitingList: 19,
      preferredLocation: 'Milano Centro',
      availability: 'Fascia Pomeridiana (14:00 - 19:00)',
      insuranceAuthorized: true,
      compatibilityScore: 78,
      reasonCodes: [
        'Priorità clinica rispettata (Media)',
        '19 giorni in lista d\'attesa',
        'Sede Milano Centro preferita',
        'Autorizzazione assicurativa valida',
        'Nota: Orario dello slot (10:30) fuori dalla preferenza dichiarata'
      ],
      constraints: ['Preferenza orario pomeridiano'],
      contactChannel: 'Notifica App Push'
    },
    {
      id: 'CAN-004',
      name: 'Lorenzo Villa',
      patientId: 'PAT-9018',
      priority: 'Bassa',
      daysInWaitingList: 41,
      preferredLocation: 'Milano Centro',
      availability: 'Fascia Mattutina (08:00 - 13:00)',
      insuranceAuthorized: true,
      compatibilityScore: 75,
      reasonCodes: [
        'Priorità clinica Bassa (punteggio ponderato)',
        '41 giorni in lista d\'attesa',
        'Sede Milano Centro preferita',
        'Autorizzazione assicurativa valida'
      ],
      contactChannel: 'SMS'
    },
    {
      id: 'CAN-005',
      name: 'Sofia Colombo',
      patientId: 'PAT-4013',
      priority: 'Bassa',
      daysInWaitingList: 8,
      preferredLocation: 'Milano Nord',
      availability: 'Flessibile',
      insuranceAuthorized: false,
      compatibilityScore: 42,
      reasonCodes: [
        'Priorità clinica Bassa',
        'Sede preferita Milano Nord (Milano Centro è alternativa accettabile)',
        'Nota: Autorizzazione assicurativa in attesa di emissione (-30pt)',
        'Solo 8 giorni in lista d\'attesa'
      ],
      constraints: ['Mancanza autorizzazione assicurativa diretta', 'Preferenza Milano Nord'],
      contactChannel: 'Chiamata telefonica operatore'
    }
  ];
}
