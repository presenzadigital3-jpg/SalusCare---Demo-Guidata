import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, Calendar, ShieldCheck, Activity, Users, AlertTriangle, Cpu, 
  Search, Filter, Eye, ArrowRight, ShieldAlert, CheckCircle2, ChevronRight, 
  Lock, RefreshCw, Send, DollarSign, FileText, Check, X, Shield, RefreshCcw
} from 'lucide-react';
import { 
  Appointment, Device, CyberEvent, AuditEvent, Complaint, OperationalAlert, Candidate 
} from '../types';
import { getCandidatesForSlot } from '../data';

interface OperationsCockpitProps {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  cyberEvents: CyberEvent[];
  auditTrail: AuditEvent[];
  setAuditTrail: React.Dispatch<React.SetStateAction<AuditEvent[]>>;
  complaints: Complaint[];
  alerts: OperationalAlert[];
  demoStep: number;
  onManualStepAdvance: () => void;
  selectedCandidateId: string | null;
  setSelectedCandidateId: (id: string | null) => void;
  overrideReason: string;
  setOverrideReason: (reason: string) => void;
  biomedicalCheckRequested: boolean;
  setBiomedicalCheckRequested: (requested: boolean) => void;
  biomedicalCheckCompleted: boolean;
  setBiomedicalCheckCompleted: (completed: boolean) => void;
  currentOfferState: 'idle' | 'sent' | 'accepted' | 'completed';
  setCurrentOfferState: (state: 'idle' | 'sent' | 'accepted' | 'completed') => void;
}

export const OperationsCockpit: React.FC<OperationsCockpitProps> = ({
  appointments,
  setAppointments,
  devices,
  setDevices,
  cyberEvents,
  auditTrail,
  setAuditTrail,
  complaints,
  alerts,
  demoStep,
  onManualStepAdvance,
  selectedCandidateId,
  setSelectedCandidateId,
  overrideReason,
  setOverrideReason,
  biomedicalCheckRequested,
  setBiomedicalCheckRequested,
  biomedicalCheckCompleted,
  setBiomedicalCheckCompleted,
  currentOfferState,
  setCurrentOfferState
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'slots' | 'devices' | 'audit'>('dashboard');
  const [slotSearchTerm, setSlotSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Tutte');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Tutte');
  const [selectedStatus, setSelectedStatus] = useState('Tutte');
  
  // Workflow active slot drilldown (starts with Giulia's slot APT-1042)
  const [drilldownSlotId, setDrilldownSlotId] = useState<string | null>(null);
  const [showExplanationModal, setShowExplanationModal] = useState<string | null>(null);
  const [isVerifyingBio, setIsVerifyingBio] = useState(false);

  // Dynamic calculations based on current state of appointments
  const recoveredCompletedCount = useMemo(() => {
    // Count of appointments that are Completato AND were successfully recovered (i.e. we tracked Matteo Rossini's recovery or general completed ones)
    // Initially 24. If Matteo's slot (APT-1042 now Matteo) becomes "Completato", it will count as 25!
    const isCompletedMatteo = appointments.some(a => a.id === 'APT-1042' && a.status === 'Completato');
    return isCompletedMatteo ? 25 : 24;
  }, [appointments]);

  const totalReleasedCount = useMemo(() => {
    // Total slot liberati: baseline 46. If Giulia's slot is liberated (status Liberato/Offerto/Accettato/Completato), it means it's tracked.
    return 46;
  }, []);

  const totalOfferedCount = useMemo(() => {
    const isOfferedOrMore = appointments.some(a => a.id === 'APT-1042' && ['Offerto', 'Accettato', 'Completato'].includes(a.status));
    return isOfferedOrMore ? 40 : 39;
  }, [appointments]);

  const totalAcceptedCount = useMemo(() => {
    const isAcceptedOrMore = appointments.some(a => a.id === 'APT-1042' && ['Accettato', 'Completato'].includes(a.status));
    return isAcceptedOrMore ? 32 : 31;
  }, [appointments]);

  const recoveryCompletionRate = useMemo(() => {
    return ((recoveredCompletedCount / totalReleasedCount) * 100).toFixed(1);
  }, [recoveredCompletedCount, totalReleasedCount]);

  const netProxyFinancialValue = useMemo(() => {
    // Baseline economic benefit: 24 completed * e.g. 250 avg = 6000
    // If we complete Matteo's recovery (which has proxyValue 380), it increases by 380
    const hasCompleted = appointments.some(a => a.id === 'APT-1042' && a.status === 'Completato');
    return 6420 + (hasCompleted ? 380 : 0);
  }, [appointments]);

  const activeAlertsCount = useMemo(() => {
    return alerts.filter(a => !a.resolved).length;
  }, [alerts]);

  // Candidates list
  const candidates = useMemo(() => getCandidatesForSlot(), []);
  const selectedCandidate = useMemo(() => {
    return candidates.find(c => c.id === selectedCandidateId) || null;
  }, [selectedCandidateId, candidates]);

  // Filtered slots for table
  const filteredAppointments = useMemo(() => {
    return appointments.filter(appt => {
      const matchesSearch = appt.patientName.toLowerCase().includes(slotSearchTerm.toLowerCase()) || 
                            appt.id.toLowerCase().includes(slotSearchTerm.toLowerCase()) ||
                            appt.examType.toLowerCase().includes(slotSearchTerm.toLowerCase());
      const matchesLoc = selectedLocation === 'Tutte' || appt.location === selectedLocation;
      const matchesSpec = selectedSpecialty === 'Tutte' || appt.specialty === selectedSpecialty;
      const matchesStatus = selectedStatus === 'Tutte' || appt.status === selectedStatus;
      return matchesSearch && matchesLoc && matchesSpec && matchesStatus;
    });
  }, [appointments, slotSearchTerm, selectedLocation, selectedSpecialty, selectedStatus]);

  // Handle slot row click to open workflow detail
  const handleSlotRowClick = (slotId: string) => {
    const slot = appointments.find(a => a.id === slotId);
    if (slot && (slot.status === 'Liberato' || slot.status === 'Offerto' || slot.status === 'Accettato' || slot.status === 'Completato' || slot.id === 'APT-1042')) {
      setDrilldownSlotId(slotId);
      // Auto-advance if demo matches step 4
      if (demoStep === 4 && slotId === 'APT-1042') {
        onManualStepAdvance();
      }
    }
  };

  // Run Candidates Search
  const handleRunCandidateSearch = () => {
    // Transition status of appointment to Candidate Search
    setAppointments(prev => prev.map(a => a.id === 'APT-1042' ? { ...prev.find(x => x.id === 'APT-1042')!, status: 'Candidate search' } : a));
    if (demoStep === 5) {
      onManualStepAdvance();
    }
  };

  // Select Candidate Matteo Rossini
  const handleSelectCandidateMatteo = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
    if (demoStep === 6 && candidateId === 'CAN-001') {
      onManualStepAdvance();
    }
  };

  // Request Biomedical Verification
  const handleRequestBiomedicalVerify = () => {
    setIsVerifyingBio(true);
    setBiomedicalCheckRequested(true);
    setTimeout(() => {
      setIsVerifyingBio(false);
      setBiomedicalCheckCompleted(true);
      // Update device RM-001 status to ONLINE and gate availability to ALLOW
      setDevices(prev => prev.map(d => d.id === 'RM-001' ? {
        ...d,
        status: 'ONLINE',
        availabilityDecision: 'ALLOW',
        recentAnomalies: ['Verifica biomedicale superata (14/07/2026 - OK)']
      } : d));
      // Auto-advance if in step 7
      if (demoStep === 7) {
        onManualStepAdvance();
      }
    }, 1500);
  };

  // Approve proposal and send slot offer to Matteo Rossini
  const handleApproveAndSendOffer = () => {
    setAppointments(prev => prev.map(a => {
      if (a.id === 'APT-1042') {
        return {
          ...a,
          status: 'Offerto',
          patientId: 'PAT-2011', // Reassigned to Matteo Rossini
          patientName: 'Matteo Rossini',
          selectedCandidateId: 'CAN-001',
          overrideReason: overrideReason || undefined,
          hoursNotice: 168,
          totalRecoveryMinutes: 240
        };
      }
      return a;
    }));
    setCurrentOfferState('sent');

    // Add audit logs
    const newAuditEvent: AuditEvent = {
      id: `AUD-NEW-${Date.now()}`,
      timestamp: new Date().toISOString(),
      event: 'offer_sent',
      sourceSystem: 'SMART_ACCESS',
      operator: 'Marco Rinaldi',
      patientId: 'PAT-2011',
      appointmentId: 'APT-1042',
      episodeId: 'EPI-9011',
      ruleApplied: 'REG_CLINICAL_RANK',
      decision: 'OFFER_SENT',
      override: overrideReason || undefined
    };
    
    // Add slot_reassigned and biomedical check to audit
    const checkEvent: AuditEvent = {
      id: `AUD-NEW-CHECK-${Date.now()}`,
      timestamp: new Date(Date.now() - 1000).toISOString(),
      event: 'biomedical_check_completed',
      sourceSystem: 'BIOMEDICAL_GATE',
      operator: 'Tecnico Biomedico',
      patientId: 'PAT-2011',
      appointmentId: 'APT-1042',
      episodeId: 'EPI-9011',
      ruleApplied: 'REG_CYBER_HEALTH',
      decision: 'ALLOW'
    };

    setAuditTrail(prev => [newAuditEvent, checkEvent, ...prev]);

    if (demoStep === 8) {
      onManualStepAdvance();
    }
  };

  // Register completion of slot
  const handleRegisterCompletion = () => {
    setAppointments(prev => prev.map(a => a.id === 'APT-1042' ? { ...a, status: 'Completato' } : a));
    setCurrentOfferState('completed');

    // Audit logs
    const checkinEvent: AuditEvent = {
      id: `AUD-NEW-CI-${Date.now()}`,
      timestamp: new Date().toISOString(),
      event: 'patient_checked_in',
      sourceSystem: 'PORTALE_PAZIENTE',
      operator: 'Accettazione Desk',
      patientId: 'PAT-2011',
      appointmentId: 'APT-1042',
      episodeId: 'EPI-9011',
      ruleApplied: 'REG_RECON_FLOW',
      decision: 'SUCCESS'
    };
    
    const completionEvent: AuditEvent = {
      id: `AUD-NEW-COMP-${Date.now() + 100}`,
      timestamp: new Date(Date.now() + 500).toISOString(),
      event: 'appointment_completed',
      sourceSystem: 'COCKPIT_OPS',
      operator: 'Marco Rinaldi',
      patientId: 'PAT-2011',
      appointmentId: 'APT-1042',
      episodeId: 'EPI-9011',
      ruleApplied: 'REG_KPI_MEASURE',
      decision: 'SUCCESS',
      outcome: 'COMPLETED_VALUED'
    };

    setAuditTrail(prev => [completionEvent, checkinEvent, ...prev]);

    if (demoStep === 10) {
      onManualStepAdvance();
    }
  };

  const handleCloseWorkflow = () => {
    setDrilldownSlotId(null);
  };

  return (
    <div className="flex-1 bg-[#F8F9FA] flex overflow-hidden">
      
      {/* COCKPIT SIDE NAVIGATION */}
      <aside className="w-56 bg-[#2E2E38] text-zinc-300 border-r border-[#E5E7EB]/10 flex flex-col shrink-0 select-none">
        <div className="p-4 bg-[#26262F] border-b border-[#E5E7EB]/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFE600]" />
            <span className="font-extrabold text-[11px] uppercase tracking-wider text-white">Operations Menu</span>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          <button
            onClick={() => { setActiveTab('dashboard'); handleCloseWorkflow(); }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'dashboard' && !drilldownSlotId
                ? 'bg-[#FFE600] text-[#2E2E38] shadow-sm'
                : 'hover:text-white hover:bg-white/10'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>📊 Dashboard Direzionale</span>
          </button>

          <button
            onClick={() => { setActiveTab('slots'); }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'slots' || drilldownSlotId
                ? 'bg-[#FFE600] text-[#2E2E38] shadow-sm'
                : 'hover:text-white hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4" />
              <span>📅 Ottimizzazione Slot</span>
            </div>
            {appointments.filter(a => a.status === 'Liberato').length > 0 && (
              <span className={`px-1.5 py-0.5 text-[9px] rounded-full font-black ${
                activeTab === 'slots' ? 'bg-[#2E2E38] text-yellow-400' : 'bg-red-500 text-white'
              }`}>
                {appointments.filter(a => a.status === 'Liberato').length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('devices'); handleCloseWorkflow(); }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'devices' && !drilldownSlotId
                ? 'bg-[#FFE600] text-[#2E2E38] shadow-sm'
                : 'hover:text-white hover:bg-white/10'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>🛡️ Parco Device & Cyber</span>
          </button>

          <button
            onClick={() => { setActiveTab('audit'); handleCloseWorkflow(); }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'audit' && !drilldownSlotId
                ? 'bg-[#FFE600] text-[#2E2E38] shadow-sm'
                : 'hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>📜 Registro Audit Log</span>
          </button>
        </nav>

        {/* Operator Badge Footer */}
        <div className="p-3 bg-[#26262F] border-t border-[#E5E7EB]/10 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-yellow-400 text-zinc-900 flex items-center justify-center text-xs font-black">
            MR
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black text-white truncate">Marco Rinaldi</p>
            <p className="text-[9px] text-zinc-400 truncate font-medium">Operations Director</p>
          </div>
        </div>
      </aside>

      {/* COCKPIT MAIN CONTENT SECTION */}
      <main className="flex-1 overflow-y-auto flex flex-col min-w-0">
        
        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {activeTab === 'dashboard' && !drilldownSlotId && (
          <div className="p-6 space-y-6 animate-fadeIn">
            
            {/* Header Title Banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
              <div>
                <h1 className="text-xl font-extrabold text-[#2E2E38] tracking-tight">
                  SalusCare Group S.p.A.
                </h1>
                <p className="text-xs text-zinc-500 mt-1">
                  Resilience Cockpit • Monitoraggio capacità, priorità cliniche e conformità di rete.
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 bg-zinc-100 px-3.5 py-1.5 rounded-xl border border-zinc-200">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span>Aggiornato in Tempo Reale (UTC+2)</span>
              </div>
            </div>

            {/* KEY METRICS GRID (KPIs) */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* NORTH STAR METRIC CARD */}
              <div className="bg-white text-[#2E2E38] p-5 rounded-xl border border-[#E5E7EB] border-l-8 border-[#FFE600] flex flex-col justify-between h-[135px] relative overflow-hidden">
                <div className="absolute right-4 top-4 text-[#FFE600] opacity-30">
                  <Activity className="w-16 h-16" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-widest block leading-none">
                    North Star Metric ⭐
                  </span>
                  <h4 className="text-[11px] font-bold text-zinc-500 leading-tight">
                    Recovered Completed Appointments
                  </h4>
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-3xl font-black text-[#2E2E38] leading-none">
                    {recoveredCompletedCount}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-extrabold bg-[#DCFCE7] border border-[#BBF7D0] px-1.5 py-0.5 rounded leading-none">
                    +{(recoveredCompletedCount - 24) > 0 ? (recoveredCompletedCount - 24) : '0'} prestazione
                  </span>
                </div>
              </div>

              {/* KPI 2: Recovery Completion Rate */}
              <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] flex flex-col justify-between h-[135px]">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider block leading-none">
                    KPI di Performance
                  </span>
                  <h4 className="text-[11px] font-bold text-zinc-500 leading-tight">
                    Recovery Completion Rate (%)
                  </h4>
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-3xl font-black text-[#2E2E38] leading-none">
                    {recoveryCompletionRate}%
                  </span>
                  <span className="text-[9px] text-zinc-500 font-medium">
                    {recoveredCompletedCount}/{totalReleasedCount} slot
                  </span>
                </div>
                <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${recoveryCompletionRate}%` }} 
                  />
                </div>
              </div>

              {/* KPI 3: Net Proxy Economic Benefit */}
              <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] flex flex-col justify-between h-[135px]">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider block leading-none">
                    Proxy Di Valore
                  </span>
                  <h4 className="text-[11px] font-bold text-zinc-500 leading-tight">
                    Valore Economico Recuperato (€)
                  </h4>
                </div>
                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="text-3xl font-black text-emerald-600 leading-none">
                    {netProxyFinancialValue.toLocaleString()} €
                  </span>
                  <span className="text-[9px] text-zinc-400 block font-semibold">Netto completati</span>
                </div>
                <p className="text-[9px] text-zinc-400 leading-relaxed italic">
                  *Valore misurato solo su prestazioni effettivamente completate.
                </p>
              </div>

              {/* KPI 4: Cyber Risk Alerts */}
              <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] flex flex-col justify-between h-[135px]">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-red-500 tracking-wider block leading-none">
                    Security & Health
                  </span>
                  <h4 className="text-[11px] font-bold text-zinc-500 leading-tight">
                    Eventi Cyber / Anomalie Aperte
                  </h4>
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className={`text-3xl font-black leading-none ${activeAlertsCount > 0 ? 'text-amber-500' : 'text-zinc-500'}`}>
                    {activeAlertsCount}
                  </span>
                  {activeAlertsCount > 0 && (
                    <span className="text-[9px] text-amber-600 font-extrabold bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded leading-none">
                      Richiede verifica
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-zinc-500">
                  <ShieldAlert className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Nessun attacco critico in corso</span>
                </div>
              </div>
            </section>

            {/* SECONDARY KPIs BAR */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-[#E5E7EB] text-center space-y-1">
                <p className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider">No-Show Rate</p>
                <p className="text-sm font-black text-[#2E2E38]">7.3%</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E5E7EB] text-center space-y-1">
                <p className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider">Attesa Media P90</p>
                <p className="text-sm font-black text-[#2E2E38]">38 giorni</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E5E7EB] text-center space-y-1">
                <p className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider">Ritardo Medio P90</p>
                <p className="text-sm font-black text-[#2E2E38]">51 min</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E5E7EB] text-center space-y-1">
                <p className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider">Disponibilità Device</p>
                <p className="text-sm font-black text-[#2E2E38]">96.4%</p>
              </div>
            </section>

            {/* MAIN CHART AND CONVERSION FUNNEL SECTION */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Funnel Conversione Slot */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
                <div className="border-b border-zinc-100 pb-2">
                  <h3 className="font-extrabold text-[#2E2E38] text-xs uppercase tracking-wider flex items-center gap-1.5">
                    Funnel Ottimizzazione Slot
                  </h3>
                  <p className="text-[10px] text-zinc-400">Tracciamento della North Star Metric end-to-end</p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Step 1: Liberati */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-600">1. Slot Liberati (Cancellazioni)</span>
                      <span className="font-black text-[#2E2E38]">{totalReleasedCount}</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-6 rounded flex overflow-hidden">
                      <div className="bg-zinc-400 h-full flex items-center px-2 text-[10px] font-black text-white" style={{ width: '100%' }}>
                        100%
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Offerti */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-600">2. Proposte Inviate (Paziente idoneo)</span>
                      <span className="font-black text-[#2E2E38]">{totalOfferedCount}</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-6 rounded flex overflow-hidden">
                      <div className="bg-amber-500 h-full flex items-center px-2 text-[10px] font-black text-white transition-all duration-500" style={{ width: `${(totalOfferedCount / totalReleasedCount) * 100}%` }}>
                        {((totalOfferedCount / totalReleasedCount) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Accettati */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-600">3. Proposte Accettate</span>
                      <span className="font-black text-[#2E2E38]">{totalAcceptedCount}</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-6 rounded flex overflow-hidden">
                      <div className="bg-blue-500 h-full flex items-center px-2 text-[10px] font-black text-white transition-all duration-500" style={{ width: `${(totalAcceptedCount / totalReleasedCount) * 100}%` }}>
                        {((totalAcceptedCount / totalReleasedCount) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Completati */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#2E2E38] flex items-center gap-1">4. Prestazioni Completate ⭐</span>
                      <span className="font-black text-emerald-600">{recoveredCompletedCount}</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-6 rounded flex overflow-hidden">
                      <div className="bg-emerald-600 h-full flex items-center px-2 text-[10px] font-black text-white transition-all duration-500" style={{ width: `${(recoveredCompletedCount / totalReleasedCount) * 100}%` }}>
                        {recoveryCompletionRate}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grafico Trend Settimanale (SVG) */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-4 lg:col-span-2">
                <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                  <div>
                    <h3 className="font-extrabold text-[#2E2E38] text-xs uppercase tracking-wider">
                      Trend Settimanale di Recupero Slot
                    </h3>
                    <p className="text-[10px] text-zinc-400">Prestazioni salvate vs slot persi</p>
                  </div>
                  <div className="flex gap-4 text-[10px] font-bold">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> Recuperati
                    </span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <span className="w-2.5 h-2.5 bg-zinc-300 rounded-full" /> Inutilizzati
                    </span>
                  </div>
                </div>

                {/* Beautiful Custom SVG Chart */}
                <div className="h-56 w-full flex items-end justify-between gap-2 pt-4 relative">
                  {/* Grid Lines */}
                  <div className="absolute inset-x-0 bottom-0 border-b border-zinc-200 h-0" />
                  <div className="absolute inset-x-0 bottom-12 border-b border-zinc-100 h-0" />
                  <div className="absolute inset-x-0 bottom-24 border-b border-zinc-100 h-0" />
                  <div className="absolute inset-x-0 bottom-36 border-b border-zinc-100 h-0" />
                  <div className="absolute inset-x-0 bottom-48 border-b border-zinc-100 h-0" />

                  {/* Day Columns */}
                  {[
                    { label: 'Lun', rec: 4, wasted: 2 },
                    { label: 'Mar', rec: 5, wasted: 1 },
                    { label: 'Mer', rec: 3, wasted: 3 },
                    { label: 'Gio', rec: 6, wasted: 1 },
                    { label: 'Ven', rec: 4, wasted: 2 },
                    { label: 'Sab', rec: 2, wasted: 0 },
                    { label: 'Dom (Oggi)', rec: recoveredCompletedCount - 24, wasted: 0 } // Live update
                  ].map((day, idx) => {
                    const total = day.rec + day.wasted;
                    const recHeight = (day.rec / 8) * 100; // max scale 8
                    const wastedHeight = (day.wasted / 8) * 100;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end z-10">
                        {/* Bars stack */}
                        <div className="w-full max-w-[28px] flex flex-col justify-end h-[160px] gap-0.5 rounded-t overflow-hidden">
                          {/* Wasted */}
                          {day.wasted > 0 && (
                            <div 
                              className="bg-zinc-300 w-full hover:opacity-90 transition-all rounded-t-sm" 
                              style={{ height: `${wastedHeight}%` }}
                              title={`Slot persi: ${day.wasted}`}
                            />
                          )}
                          {/* Recovered */}
                          {day.rec > 0 && (
                            <div 
                              className="bg-emerald-500 w-full hover:opacity-90 transition-all rounded-t-sm" 
                              style={{ height: `${recHeight}%` }}
                              title={`Slot recuperati completati: ${day.rec}`}
                            />
                          )}
                        </div>
                        {/* Day label */}
                        <span className="text-[10px] font-bold text-zinc-500">{day.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* RECENT ALERTS AND OPERATIONAL ISSUES */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Active Operational Alerts */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
                <div className="border-b border-zinc-100 pb-2 flex justify-between items-center">
                  <h3 className="font-extrabold text-[#2E2E38] text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Anomalie & Avvisi Operativi
                  </h3>
                  <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2.5 py-0.5 rounded-full font-bold">
                    {alerts.filter(a => !a.resolved).length} attivi
                  </span>
                </div>

                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                  {alerts.map(alert => (
                    <div 
                      key={alert.id}
                      className={`p-3 rounded-xl border flex items-start gap-3 transition ${
                        alert.resolved 
                          ? 'bg-zinc-50/50 border-zinc-100 opacity-60' 
                          : alert.severity === 'CRITICAL' 
                          ? 'bg-red-500/5 border-red-500/15 text-red-900' 
                          : 'bg-amber-500/5 border-amber-500/15 text-amber-900'
                      }`}
                    >
                      <div className={`p-1 rounded-lg mt-0.5 shrink-0 ${
                        alert.resolved ? 'bg-zinc-100' : alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black tracking-wider uppercase">
                            {alert.type} • {alert.severity}
                          </span>
                          <span className="text-[9px] text-zinc-400">
                            {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-zinc-700 leading-snug">{alert.message}</p>
                        {alert.resolved && (
                          <span className="inline-block text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            Risolto
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Complaints Reclami */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
                <div className="border-b border-zinc-100 pb-2">
                  <h3 className="font-extrabold text-[#2E2E38] text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#2E2E38]" /> Reclami Paziente Attivi (CUP Integration)
                  </h3>
                  <p className="text-[10px] text-zinc-400">Segnalazioni di disservizio per controllo operativo</p>
                </div>

                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                  {complaints.map(comp => (
                    <div key={comp.id} className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-[#2E2E38]">{comp.patientName} ({comp.patientId})</p>
                          <p className="text-[9px] text-zinc-400">Categoria: {comp.category} • {comp.date}</p>
                        </div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          comp.status === 'OPEN' ? 'bg-amber-100 text-amber-700' : 'bg-zinc-100 text-zinc-500'
                        }`}>
                          {comp.status === 'OPEN' ? 'Aperto' : 'Risolto'}
                        </span>
                      </div>
                      <p className="text-zinc-600 leading-normal italic bg-white p-2 rounded border border-zinc-150">
                        "{comp.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: SLOTS LIST & WORFLOW DRIL DOWN */}
        {activeTab === 'slots' && !drilldownSlotId && (
          <div className="p-6 space-y-6 animate-fadeIn">
            {/* Title */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-200 pb-4">
              <div>
                <h1 className="text-lg font-black text-[#2E2E38] tracking-tight uppercase flex items-center gap-2">
                  <span>📅 Ottimizzazione Slot Sanitarie</span>
                </h1>
                <p className="text-xs text-zinc-500 mt-1">
                  Verifica in tempo reale gli slot cancellati, avvia il candidate ranking e lancia le offerte.
                </p>
              </div>

              {/* Quick simulation info */}
              {demoStep === 4 && appointments.some(a => a.id === 'APT-1042' && a.status === 'Liberato') && (
                <div className="bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg text-xs text-red-600 font-extrabold animate-bounce">
                  ⚡ Giulia Bianchi ha appena liberato uno slot! Clicca sulla riga evidenziata in rosso per procedere.
                </div>
              )}
            </div>

            {/* FILTERS TOOLBAR */}
            <section className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cerca paziente, ID..."
                  value={slotSearchTerm}
                  onChange={(e) => setSlotSearchTerm(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-700"
                />
              </div>

              {/* Filter Sede */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 shrink-0 font-bold">Sede:</span>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-1.5 text-xs"
                >
                  <option value="Tutte">Tutte le sedi</option>
                  <option value="Milano Centro">Milano Centro</option>
                  <option value="Milano Nord">Milano Nord</option>
                  <option value="Monza">Monza</option>
                </select>
              </div>

              {/* Filter Specialità */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 shrink-0 font-bold">Specialità:</span>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-1.5 text-xs"
                >
                  <option value="Tutte">Tutte</option>
                  <option value="Radiologia">Radiologia</option>
                  <option value="Cardiologia">Cardiologia</option>
                  <option value="Ortopedia">Ortopedia</option>
                  <option value="Laboratorio">Laboratorio</option>
                  <option value="Fisioterapia">Fisioterapia</option>
                </select>
              </div>

              {/* Filter Stato */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 shrink-0 font-bold">Stato:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-1.5 text-xs"
                >
                  <option value="Tutte">Tutti gli stati</option>
                  <option value="Confermato">Confermato</option>
                  <option value="In attesa di conferma">In attesa</option>
                  <option value="A rischio">A rischio</option>
                  <option value="Liberato">Liberato</option>
                  <option value="Offerto">Offerto</option>
                  <option value="Accettato">Accettato</option>
                  <option value="Completato">Completato</option>
                </select>
              </div>
            </section>

            {/* TABLE OF SLOTS */}
            <section className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-500 font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="p-3.5">ID Appuntamento</th>
                      <th className="p-3.5">Paziente ID</th>
                      <th className="p-3.5">Specialità & Prestazione</th>
                      <th className="p-3.5">Data & Ora</th>
                      <th className="p-3.5">Sede & Device</th>
                      <th className="p-3.5">Stato Workflow</th>
                      <th className="p-3.5">Priorità Clinica</th>
                      <th className="p-3.5 text-right">Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map(appt => {
                        const isGiuliaTarget = appt.id === 'APT-1042';
                        const isGiuliaReleased = isGiuliaTarget && appt.status === 'Liberato';
                        return (
                          <tr 
                            key={appt.id}
                            onClick={() => handleSlotRowClick(appt.id)}
                            className={`border-b border-zinc-150 transition cursor-pointer ${
                              isGiuliaReleased 
                                ? 'bg-red-50 border-l-4 border-red-500 hover:bg-red-100/80 font-semibold' 
                                : isGiuliaTarget && appt.status === 'Accettato'
                                ? 'bg-indigo-50 border-l-4 border-indigo-500 hover:bg-indigo-100/80 font-semibold'
                                : isGiuliaTarget && appt.status === 'Completato'
                                ? 'bg-emerald-50 border-l-4 border-emerald-500 hover:bg-emerald-100/80'
                                : 'hover:bg-zinc-50'
                            }`}
                          >
                            <td className="p-3.5 font-bold text-zinc-950">
                              {appt.id}
                            </td>
                            <td className="p-3.5 font-mono font-medium text-zinc-500">
                              {appt.patientId}
                            </td>
                            <td className="p-3.5">
                              <div>
                                <span className="font-extrabold text-zinc-800">{appt.examType}</span>
                                <span className="text-[10px] text-zinc-400 block font-medium">{appt.specialty} • {appt.physician}</span>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <span className="font-semibold text-zinc-700">{appt.date}</span>
                              <span className="text-[10px] text-zinc-400 block">{appt.time}</span>
                            </td>
                            <td className="p-3.5 text-zinc-600">
                              <span className="font-semibold text-zinc-700">{appt.location}</span>
                              <span className="text-[10px] text-zinc-400 block font-mono">{appt.deviceId} • {appt.room}</span>
                            </td>
                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded-full font-black text-[9px] uppercase inline-block ${
                                appt.status === 'Confermato' ? 'bg-emerald-100 text-emerald-700' :
                                appt.status === 'In attesa di conferma' ? 'bg-amber-100 text-amber-700 animate-pulse' :
                                appt.status === 'A rischio' ? 'bg-red-100 text-red-700 font-extrabold' :
                                appt.status === 'Liberato' ? 'bg-red-500 text-white shadow-sm' :
                                appt.status === 'Candidate search' ? 'bg-indigo-100 text-indigo-700 font-black animate-pulse' :
                                appt.status === 'Offerto' ? 'bg-indigo-100 text-indigo-700' :
                                appt.status === 'Accettato' ? 'bg-indigo-600 text-white font-extrabold' :
                                appt.status === 'Completato' ? 'bg-emerald-600 text-white font-bold' :
                                'bg-zinc-100 text-zinc-600'
                              }`}>
                                {appt.status}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                appt.priority === 'Alta' ? 'bg-red-100 text-red-600' :
                                appt.priority === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-zinc-100 text-zinc-500'
                              }`}>
                                {appt.priority}
                              </span>
                            </td>
                            <td className="p-3.5 text-right font-bold text-blue-600 hover:underline">
                              {(appt.status === 'Liberato' || isGiuliaTarget) ? 'Gestisci Workflow →' : 'Dettagli'}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-zinc-400 text-xs">
                          Nessuno slot corrispondente ai filtri impostati.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* WORKFLOW DETAILED VIEW CONTAINER */}
        {drilldownSlotId && (
          <div className="p-6 space-y-6 bg-white flex-1 animate-fadeIn">
            {/* Workflow Navigation Header */}
            <div className="flex justify-between items-center border-b border-zinc-200 pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCloseWorkflow}
                  className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-[#2E2E38] font-bold text-xs rounded-lg transition"
                >
                  ← Chiudi Workflow
                </button>
                <div className="h-5 w-px bg-zinc-300" />
                <div>
                  <h2 className="font-extrabold text-[#2E2E38] text-sm uppercase">
                    Slot Recovery Control Room
                  </h2>
                  <p className="text-[11px] text-zinc-400">ID Slot: {drilldownSlotId} • Gestione riallocazione e sicurezza</p>
                </div>
              </div>

              {/* Progress Stepper in Workflow */}
              <div className="flex items-center gap-2">
                {[
                  { stepNum: 4, name: 'Slot Liberato' },
                  { stepNum: 5, name: 'Matching' },
                  { stepNum: 7, name: 'Device Gate' },
                  { stepNum: 8, name: 'Offerta' },
                  { stepNum: 10, name: 'Outcome' }
                ].map((s, idx) => {
                  const isActive = demoStep === s.stepNum || (s.stepNum === 5 && demoStep === 6);
                  const isCompleted = demoStep > s.stepNum;
                  return (
                    <React.Fragment key={s.stepNum}>
                      {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />}
                      <span className={`text-[10px] font-bold px-2 py-1 rounded transition-all ${
                        isActive 
                          ? 'bg-[#2E2E38] text-white ring-2 ring-[#FFE600]' 
                          : isCompleted 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-zinc-100 text-zinc-400'
                      }`}>
                        {s.name}
                      </span>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* SPLIT SCREEN WORKFLOW DETAILS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: ACTIVE SLOT BASE INFORMATION */}
              <div className="lg:col-span-4 bg-zinc-50 rounded-2xl p-4 border border-zinc-200 space-y-4">
                <div className="border-b border-zinc-200 pb-2">
                  <h4 className="font-black text-[#2E2E38] text-[11px] uppercase tracking-wider">Specifiche dello Slot Liberato</h4>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-zinc-400 block font-medium">Prestazione Clinica:</span>
                    <span className="font-extrabold text-[#2E2E38] text-sm">
                      {appointments.find(a => a.id === drilldownSlotId)?.examType}
                    </span>
                    <span className="text-[10px] text-zinc-500 block">
                      Specialità: {appointments.find(a => a.id === drilldownSlotId)?.specialty}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-white p-2 rounded border border-zinc-150">
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Data Liberata:</span>
                      <span className="font-bold text-[#2E2E38]">{appointments.find(a => a.id === drilldownSlotId)?.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Orario:</span>
                      <span className="font-bold text-[#2E2E38]">{appointments.find(a => a.id === drilldownSlotId)?.time}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-zinc-400 block font-medium">Sede e Sala Clinica:</span>
                    <span className="font-bold text-zinc-700">
                      {appointments.find(a => a.id === drilldownSlotId)?.location} • {appointments.find(a => a.id === drilldownSlotId)?.room}
                    </span>
                  </div>

                  <div className="bg-red-500/5 border border-red-500/10 p-3 rounded-lg space-y-1">
                    <span className="text-zinc-400 block font-medium">Dettagli di Rilascio:</span>
                    <p className="font-bold text-red-700">Motivo: {appointments.find(a => a.id === drilldownSlotId)?.cancelReason || 'Impossibilità lavorativa'}</p>
                    <p className="text-[10px] text-zinc-500 font-semibold">Preavviso utile calcolato: 168 ore</p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Valore Economico Proxy:</span>
                      <span className="font-black text-emerald-700 text-sm">{appointments.find(a => a.id === drilldownSlotId)?.proxyValue} €</span>
                    </div>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded font-black uppercase">
                      Proxy CUP
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-zinc-400 block font-medium mb-1.5">Stato Workflow Attuale:</span>
                    <span className="px-3 py-1 bg-[#2E2E38] text-[#FFE600] rounded-full font-black text-xs uppercase inline-block">
                      {appointments.find(a => a.id === drilldownSlotId)?.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: WORKFLOW DYNAMIC STEPS INTERACTIVE AREA */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* SUB-STEP 1: INITIATE CANDIDATE SEARCH */}
                {appointments.find(a => a.id === drilldownSlotId)?.status === 'Liberato' && (
                  <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200 space-y-4 shadow-sm animate-fadeIn">
                    <div className="space-y-1">
                      <h3 className="font-black text-[#2E2E38] text-base">Fase 2: Ricerca Candidati Compatibili</h3>
                      <p className="text-xs text-zinc-500">
                        Il sistema analizzerà la lista d'attesa per trovare i pazienti compatibili con la prestazione radiologica liberata, rispettando la priorità clinica e l'anzianità.
                      </p>
                    </div>

                    <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded-lg text-xs text-zinc-700 flex gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#2E2E38] shrink-0 mt-0.5" />
                      <p className="italic font-serif">
                        "Questo ranking supporta la decisione dell’operatore e non sostituisce la valutazione clinica."
                      </p>
                    </div>

                    <button
                      onClick={handleRunCandidateSearch}
                      className="py-3 px-6 bg-zinc-900 text-white font-extrabold text-xs rounded-xl hover:bg-black transition flex items-center justify-center gap-2 shadow shadow-zinc-900/10"
                    >
                      <Search className="w-4 h-4 text-[#FFE600]" />
                      <span>Avvia Motore di Matching dei Candidati</span>
                    </button>
                  </div>
                )}

                {/* SUB-STEP 2: MATCHING & RANKING LIST */}
                {['Candidate search', 'Offerto', 'Accettato', 'Completato'].includes(appointments.find(a => a.id === drilldownSlotId)?.status || '') && (demoStep === 5 || demoStep === 6) && (
                  <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200 space-y-4 shadow-sm animate-fadeIn">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-zinc-200 pb-3">
                      <div>
                        <h3 className="font-black text-[#2E2E38] text-base">Ranking dei Candidati Compatibili</h3>
                        <p className="text-xs text-zinc-500">
                          Algoritmo di compatibilità spiegabile ponderato per priorità clinica e attesa.
                        </p>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-bold italic">
                        Dati sintetici • Spiegazione clinica abilitata
                      </span>
                    </div>

                    {/* LIST OF CANDIDATES */}
                    <div className="space-y-3">
                      {candidates.map(cand => {
                        const isSelected = selectedCandidateId === cand.id;
                        return (
                          <div 
                            key={cand.id}
                            className={`p-4 bg-white rounded-xl border transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                              isSelected 
                                ? 'border-indigo-500 ring-2 ring-indigo-500/20' 
                                : 'border-zinc-200 hover:border-zinc-300'
                            }`}
                          >
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2.5">
                                <span className="font-black text-zinc-800 text-sm">{cand.name}</span>
                                <span className="text-[10px] font-mono text-zinc-400">{cand.patientId}</span>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                                  cand.priority === 'Alta' ? 'bg-red-100 text-red-600' :
                                  cand.priority === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-zinc-100 text-zinc-500'
                                }`}>
                                  Priorità {cand.priority}
                                </span>
                                <span className="text-[10px] bg-indigo-50 text-indigo-700 font-black px-1.5 py-0.5 rounded">
                                  Score: {cand.compatibilityScore}%
                                </span>
                              </div>

                              <div className="text-[11px] text-zinc-500 grid grid-cols-2 gap-x-4 gap-y-1">
                                <div>• Attesa: <strong>{cand.daysInWaitingList} giorni</strong></div>
                                <div>• Sede preferita: <strong>{cand.preferredLocation}</strong></div>
                                <div>• Disponibilità: <strong>{cand.availability}</strong></div>
                                <div>• Autorizzazione Assicurativa: <strong>{cand.insuranceAuthorized ? 'SÌ (Valida)' : 'NO (In attesa)'}</strong></div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                              <button 
                                onClick={() => setShowExplanationModal(cand.id)}
                                className="flex-1 md:flex-none py-1.5 px-2.5 bg-zinc-100 hover:bg-zinc-200 text-[#2E2E38] font-bold text-[10px] rounded border border-zinc-200 flex items-center justify-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Spiegazione</span>
                              </button>

                              <button
                                onClick={() => handleSelectCandidateMatteo(cand.id)}
                                className={`flex-1 md:flex-none py-1.5 px-3 rounded text-[10px] font-black transition ${
                                  isSelected 
                                    ? 'bg-emerald-600 text-white' 
                                    : 'bg-zinc-900 text-white hover:bg-black'
                                }`}
                              >
                                {isSelected ? '✓ Selezionato' : 'Seleziona'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* OVERRIDE COMPLIANCE BOX */}
                    {selectedCandidateId && selectedCandidateId !== 'CAN-001' && (
                      <div className="p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl space-y-3 animate-fadeIn text-xs">
                        <div className="flex gap-2 text-amber-700 font-bold">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>Selezionato candidato non in cima al ranking</span>
                        </div>
                        <p className="text-zinc-600 leading-normal">
                          È richiesto un motivo per modificare la proposta suggerita dal sistema e superare la priorità ottimale. Questa giustificazione verrà registrata immutabilmente nel log di audit.
                        </p>
                        <div className="space-y-1">
                          <label className="font-extrabold text-[#2E2E38]">Giustificazione obbligatoria per override:</label>
                          <input 
                            type="text"
                            placeholder="E.g. Paziente ha manifestato urgenza telefonica urgente per intervento programmato"
                            value={overrideReason}
                            onChange={(e) => setOverrideReason(e.target.value)}
                            className="w-full bg-white border border-zinc-300 rounded-lg p-2 font-medium"
                          />
                        </div>
                      </div>
                    )}

                    {/* SUBMIT MATCH */}
                    {selectedCandidateId && (
                      <button
                        onClick={() => {
                          if (selectedCandidateId !== 'CAN-001' && !overrideReason) {
                            alert("È obbligatorio inserire la giustificazione dell'override per procedere!");
                            return;
                          }
                          // Advance step to Device Gate (Step 7)
                          onManualStepAdvance();
                        }}
                        className="w-full py-2.5 bg-[#2E2E38] hover:bg-black text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                      >
                        <span>Procedi al Device Availability Gate</span>
                        <ArrowRight className="w-4 h-4 text-[#FFE600]" />
                      </button>
                    )}
                  </div>
                )}

                {/* SUB-STEP 3: DEVICE AVAILABILITY GATE */}
                {demoStep === 7 && (
                  <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200 space-y-4 shadow-sm animate-fadeIn">
                    <div className="border-b border-zinc-200 pb-2">
                      <h3 className="font-black text-[#2E2E38] text-base flex items-center gap-2">
                        <Shield className="w-5 h-5 text-amber-500" /> Device Availability Gate
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Verifica dell'integrità cyber e dello stato biomedico del dispositivo <strong>RM-001</strong> prima dell'invio della proposta.
                      </p>
                    </div>

                    {/* Device Status Board */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      
                      {/* Left Block: Device Info */}
                      <div className="bg-white p-3.5 rounded-xl border border-zinc-150 space-y-2">
                        <span className="font-extrabold text-zinc-500 block border-b border-zinc-100 pb-1">Dati Hardware & Bio</span>
                        <div>Device ID: <strong>RM-001 (Risonanza Magnetica)</strong></div>
                        <div>Uptime: <strong>97.2% (anomalo)</strong></div>
                        <div>Manutenzione: <strong>02/08/2026</strong></div>
                        <div>Firmware: <strong>v5.8.4-build19</strong></div>
                        <div>
                          Stato Biomedical Gate: 
                          <span className={`ml-1 px-1.5 py-0.5 rounded font-bold text-[10px] ${
                            biomedicalCheckCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                          }`}>
                            {biomedicalCheckCompleted ? 'CONFERMATO' : 'Pendente (Richiede verifica)'}
                          </span>
                        </div>
                      </div>

                      {/* Right Block: Cyber Info */}
                      <div className="bg-white p-3.5 rounded-xl border border-zinc-150 space-y-2">
                        <span className="font-extrabold text-zinc-500 block border-b border-zinc-100 pb-1">Cyber Security & Compliance</span>
                        <div>Patch Compliance: <strong className="text-red-500">NO COMPLIANT</strong></div>
                        <div>Connessioni fallite DICOM: <strong>14/ora (alto)</strong></div>
                        <div>Anomalie IDS aperte: <strong>3 segnalazioni (High)</strong></div>
                        <div className="text-red-600 font-bold bg-red-50 p-1 px-1.5 rounded text-[10px] leading-snug">
                          ⚠️ Rilevati tentativi di autenticazione falliti SSH.
                        </div>
                      </div>
                    </div>

                    {/* Gate Evaluation Banner */}
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-900 rounded-xl space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1">
                          🛡️ Decisione Automatica Gate:
                        </span>
                        <span className="px-2.5 py-1 bg-amber-500 text-white rounded font-black text-xs">
                          {biomedicalCheckCompleted ? 'ALLOW WITH CONSTRAINTS' : 'ALLOW WITH CONDITIONS'}
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed italic">
                        "Lo slot può essere offerto soltanto dopo la verifica della disponibilità della risorsa. Il device gate restituisce un allarme per patch non conformi ma non bloccanti per l'erogazione della prestazione, previo controllo biomedicale in loco."
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <button
                        onClick={handleRequestBiomedicalVerify}
                        disabled={biomedicalCheckCompleted || isVerifyingBio}
                        className="flex-1 py-2.5 bg-zinc-900 text-white hover:bg-black font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 ${isVerifyingBio ? 'animate-spin text-yellow-400' : ''}`} />
                        <span>{isVerifyingBio ? 'Controllo biomedicale in corso...' : biomedicalCheckCompleted ? '✓ Verifica Biomedicale Completata' : 'Avvia Verifica Biomedicale Urgente'}</span>
                      </button>

                      {biomedicalCheckCompleted && (
                        <button
                          onClick={() => onManualStepAdvance()}
                          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approva Proposta & Procedi</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* SUB-STEP 4: PROPOSAL SUMMARY & SEND OFFER */}
                {demoStep === 8 && (
                  <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200 space-y-4 shadow-sm animate-fadeIn">
                    <div className="border-b border-zinc-200 pb-2">
                      <h3 className="font-black text-[#2E2E38] text-base">Riepilogo Proposta Slot Anticipato</h3>
                      <p className="text-xs text-zinc-500">
                        Verifica finale prima della spedizione push al paziente prescelto.
                      </p>
                    </div>

                    {selectedCandidate && (
                      <div className="bg-white p-4 rounded-xl border border-zinc-150 text-xs space-y-3 shadow-sm">
                        <div className="grid grid-cols-2 gap-3 pb-2 border-b border-zinc-100">
                          <div>
                            <span className="text-zinc-400 block">Candidato Destinatario:</span>
                            <strong className="text-[#2E2E38] text-sm">{selectedCandidate.name}</strong>
                            <span className="text-[10px] text-zinc-400 block font-mono">{selectedCandidate.patientId}</span>
                          </div>
                          <div>
                            <span className="text-zinc-400 block">Prestazione Proposta:</span>
                            <strong>Risonanza Magnetica Encefalo</strong>
                            <span className="text-[10px] text-zinc-400 block">Sede: Milano Centro (RM-001)</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pb-2 border-b border-zinc-100">
                          <div>
                            <span className="text-zinc-400 block">Vecchio Appuntamento:</span>
                            <span className="line-through text-zinc-400">18 Agosto 2026</span>
                          </div>
                          <div>
                            <span className="text-zinc-400 block">Nuova Proposta anticipata:</span>
                            <span className="font-black text-emerald-600">21 Luglio 2026 ore 10:30</span>
                            <span className="text-[9px] text-emerald-700 font-semibold block">Anticipo di 28 Giorni!</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-zinc-400 block">Canale di notifica automatizzato:</span>
                          <strong>Notifica App Push + SMS prioritario</strong>
                        </div>
                      </div>
                    )}

                    {/* Microcopy disclaimer */}
                    <div className="bg-yellow-500/5 border border-yellow-500/10 p-3 rounded-lg text-[11px] text-zinc-600">
                      💡 <strong>Nessuna cancellazione automatica:</strong> "La mancata risposta del paziente non comporta la cancellazione automatica." Matteo avrà 3 ore per confermare l'accettazione, superate le quali la proposta passerà al secondo candidato in graduatoria (Stefano Moretti).
                    </div>

                    <button
                      onClick={handleApproveAndSendOffer}
                      className="w-full py-3 bg-indigo-600 text-white font-extrabold text-xs rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow shadow-indigo-600/10"
                    >
                      <Send className="w-4 h-4 text-[#FFE600]" />
                      <span>Invia Proposta al Paziente</span>
                    </button>
                  </div>
                )}

                {/* SUB-STEP 5: WAITING FOR PATIENT ACCEPTANCE */}
                {demoStep === 9 && (
                  <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200 text-center space-y-4 shadow-sm animate-fadeIn">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                      <Send className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-black text-[#2E2E38] text-base">Proposta Spedita a Matteo Rossini</h3>
                      <p className="text-xs text-zinc-500 max-w-md mx-auto">
                        L'offerta di anticipo slot è stata notificata via smartphone a Matteo Rossini. Lo stato della prenotazione è ora <strong>Offerto</strong>.
                      </p>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl max-w-sm mx-auto text-xs text-indigo-700">
                      Siamo in attesa che il paziente accetti la proposta. Usa la <strong>Guida Demo</strong> in basso a destra o passa alla <strong>Vista Paziente (Matteo)</strong> per simulare l'accettazione.
                    </div>
                  </div>
                )}

                {/* SUB-STEP 6: OUTCOME AND REGISTER COMPLETION */}
                {demoStep === 10 && (
                  <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200 space-y-4 shadow-sm animate-fadeIn">
                    <div className="border-b border-zinc-200 pb-2">
                      <h3 className="font-black text-[#2E2E38] text-base">Fase Finale: Chiusura Clinica ed Erogazione</h3>
                      <p className="text-xs text-zinc-500">
                        Matteo Rossini ha accettato l'appuntamento, si è presentato alla sede di Milano Centro ed ha effettuato il check-in in radiologia.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-lg border border-zinc-150">
                        <span className="text-zinc-400 block">Slot Rilanciato:</span>
                        <strong>21 Luglio ore 10:30</strong>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-zinc-150">
                        <span className="text-zinc-400 block">Paziente Completato:</span>
                        <strong>Matteo Rossini</strong>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-zinc-150">
                        <span className="text-zinc-400 block">Tempo di Recupero:</span>
                        <strong>240 min preavviso</strong>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl text-xs text-emerald-800 space-y-1">
                      <p className="font-extrabold flex items-center gap-1">⭐ Misurazione del Valore:</p>
                      <p className="italic font-serif leading-relaxed">
                        "Il valore viene riconosciuto quando la prestazione recuperata risulta completata." Lo slot non conta come recuperato fino a questo click finale di erogazione.
                      </p>
                    </div>

                    <button
                      onClick={handleRegisterCompletion}
                      className="w-full py-3 bg-emerald-600 text-white font-extrabold text-xs rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-1.5 shadow shadow-emerald-600/15"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Registra Prestazione Completata (Innalza KPI)</span>
                    </button>
                  </div>
                )}

                {/* SUB-STEP 7: FINAL COMPLETED STATE */}
                {demoStep >= 11 && (
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-4 shadow-sm animate-fadeIn">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-extrabold text-emerald-800 text-lg">Slot Recovery Completato con Successo!</h3>
                      <p className="text-xs text-zinc-600 max-w-md mx-auto">
                        La risonanza magnetica di Giulia Bianchi è stata liberata, riassegnata a Matteo Rossini, ed erogata. La North Star Metric è salita correttamente a <strong>25 prestazioni recuperate</strong>.
                      </p>
                    </div>

                    <div className="flex gap-2 justify-center pt-2">
                      <button
                        onClick={() => {
                          setActiveTab('dashboard');
                          handleCloseWorkflow();
                        }}
                        className="py-2 px-4 bg-zinc-900 text-white font-bold text-xs rounded-xl hover:bg-black transition"
                      >
                        Vai alla Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('audit');
                          handleCloseWorkflow();
                        }}
                        className="py-2 px-4 bg-white border border-zinc-200 text-zinc-700 font-bold text-xs rounded-xl hover:bg-zinc-50 transition"
                      >
                        Visualizza Audit Log
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* TAB 3: DEVICE FLEET & BIOSECURITY CYBER */}
        {activeTab === 'devices' && !drilldownSlotId && (
          <div className="p-6 space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-lg font-black text-[#2E2E38] tracking-tight uppercase">
                🛡️ Parco Dispositivi Medicali & Cyber Security
              </h1>
              <p className="text-xs text-zinc-500 mt-1">
                Monitoraggio della conformità patch, degli eventi anomali di rete e dell'attività dei dispositivi integrati.
              </p>
            </div>

            {/* CYBER SUMMARY BOARD */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-500/5 border border-red-500/15 p-4 rounded-xl text-xs space-y-1">
                <span className="font-extrabold text-red-600">IDS Security Alert</span>
                <p className="text-zinc-700 font-bold">RM-001: 3 cyber eventi High/Critical aperti</p>
                <p className="text-zinc-500">Latenza anomala e tentativi di accesso SSH non autorizzati.</p>
              </div>
              <div className="bg-emerald-500/5 border border-[#FFE600]/35 p-4 rounded-xl text-xs space-y-1">
                <span className="font-extrabold text-yellow-600">Patch Compliance</span>
                <p className="text-zinc-700 font-bold">5 su 6 dispositivi conformi (83.3%)</p>
                <p className="text-zinc-500">RM-001 richiede patch cumulativa di sicurezza di livello 2.</p>
              </div>
              <div className="bg-zinc-100 p-4 rounded-xl text-xs space-y-1">
                <span className="font-extrabold text-[#2E2E38]">Stato Biomedica</span>
                <p className="text-zinc-700 font-bold">Uptime medio parco: 98.5%</p>
                <p className="text-zinc-500">Nessuna manutenzione bloccante pianificata oggi.</p>
              </div>
            </section>

            {/* DEVICE LIST TABLE */}
            <section className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-500 font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="p-3.5">ID Dispositivo</th>
                      <th className="p-3.5">Nome e Sede</th>
                      <th className="p-3.5">Stato Hardware</th>
                      <th className="p-3.5">Uptime Mensile</th>
                      <th className="p-3.5">Cyber Compliance</th>
                      <th className="p-3.5">Anomalie Recenti</th>
                      <th className="p-3.5">Gate Decision</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map(dev => (
                      <tr key={dev.id} className="border-b border-zinc-150 hover:bg-zinc-50">
                        <td className="p-3.5 font-bold text-[#2E2E38] font-mono">{dev.id}</td>
                        <td className="p-3.5">
                          <span className="font-extrabold text-zinc-800">{dev.name}</span>
                          <span className="text-[10px] text-zinc-400 block font-medium">Sede: {dev.location}</span>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            dev.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-700' :
                            dev.status === 'ALERT' ? 'bg-amber-100 text-amber-700 font-black animate-pulse' :
                            'bg-zinc-100 text-zinc-500'
                          }`}>
                            {dev.status}
                          </span>
                        </td>
                        <td className="p-3.5 font-semibold text-zinc-700">{dev.uptime}%</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            dev.patchCompliance ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                          }`}>
                            {dev.patchCompliance ? 'Conforme' : 'Patch Mancante'}
                          </span>
                        </td>
                        <td className="p-3.5 text-[11px] text-zinc-500 max-w-[200px] truncate" title={dev.recentAnomalies.join(', ')}>
                          {dev.recentAnomalies.length > 0 ? dev.recentAnomalies[0] : 'Nessuna anomalia'}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                            dev.availabilityDecision === 'ALLOW' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                          }`}>
                            {dev.availabilityDecision}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* TAB 4: AUDIT TRAIL LOG */}
        {activeTab === 'audit' && !drilldownSlotId && (
          <div className="p-6 space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-lg font-black text-[#2E2E38] tracking-tight uppercase">
                📜 Registro Audit Trail Immutabile
              </h1>
              <p className="text-xs text-zinc-500 mt-1">
                Ogni transizione di stato, decisione dell'operatore biomedico, override motivato o misurazione del valore viene loggata immutabilmente.
              </p>
            </div>

            {/* AUDIT TABLE */}
            <section className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-500 font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="p-3.5">ID Log</th>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5">Evento</th>
                      <th className="p-3.5">Sorgente</th>
                      <th className="p-3.5">Operatore / Attore</th>
                      <th className="p-3.5">Paziente ID</th>
                      <th className="p-3.5">Regola Applicata</th>
                      <th className="p-3.5">Esito Decisione</th>
                      <th className="p-3.5">Override Motivato / Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditTrail.map((log, idx) => (
                      <tr 
                        key={log.id} 
                        className={`border-b border-zinc-150 hover:bg-zinc-50 ${
                          idx < 3 && log.id.startsWith('AUD-NEW') ? 'bg-yellow-50 font-medium' : ''
                        }`}
                      >
                        <td className="p-3.5 font-bold text-zinc-400 font-mono">{log.id}</td>
                        <td className="p-3.5 text-[10px] text-zinc-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            log.event === 'slot_released' ? 'bg-red-100 text-red-700' :
                            log.event === 'offer_sent' ? 'bg-amber-100 text-amber-700' :
                            log.event === 'offer_accepted' ? 'bg-indigo-100 text-indigo-700' :
                            log.event === 'appointment_completed' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-zinc-100 text-zinc-600'
                          }`}>
                            {log.event}
                          </span>
                        </td>
                        <td className="p-3.5 text-zinc-500 font-mono text-[10px]">{log.sourceSystem}</td>
                        <td className="p-3.5 text-zinc-800 font-bold">{log.operator}</td>
                        <td className="p-3.5 text-zinc-500 font-mono font-medium">{log.patientId}</td>
                        <td className="p-3.5 text-[10px] text-zinc-500 font-semibold">{log.ruleApplied}</td>
                        <td className="p-3.5 font-bold text-zinc-700">{log.decision}</td>
                        <td className="p-3.5 text-zinc-600 italic">
                          {log.override || log.outcome || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

      </main>

      {/* COMPLIMENTARY CATASTROPHIC CLARIFICATION MATCHING DIALOG */}
      {showExplanationModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 select-none animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl border border-zinc-100">
            <div className="flex justify-between items-start border-b border-zinc-150 pb-2">
              <div>
                <h4 className="font-extrabold text-sm text-[#2E2E38] uppercase">
                  Spiegazione Clinico-Organizzativa Ranking
                </h4>
                <p className="text-[10px] text-zinc-400">Trasparenza algoritmica SalusCare AI-Rank v2.4</p>
              </div>
              <button 
                onClick={() => setShowExplanationModal(null)}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-zinc-600">
              <div className="bg-yellow-500/10 p-3 rounded-lg text-yellow-900 border border-yellow-500/20 leading-relaxed font-medium">
                "Questo ranking supporta la decisione dell’operatore e non sostituisce la valutazione clinica." Il punteggio non è vincolante ed è pienamente overrideable per esigenze cliniche straordinarie.
              </div>

              <div className="space-y-2">
                <span className="font-extrabold text-zinc-700 block">Fattori e Reason Codes calcolati:</span>
                <div className="space-y-1.5 font-medium">
                  {candidates.find(c => c.id === showExplanationModal)?.reasonCodes.map((reason, i) => (
                    <div key={i} className="flex gap-2 items-start text-zinc-700">
                      <div className="bg-emerald-100 text-emerald-700 p-0.5 rounded-full mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <p>{reason}</p>
                    </div>
                  ))}
                  {candidates.find(c => c.id === showExplanationModal)?.constraints && (
                    <div className="mt-2 p-2.5 bg-red-500/5 border border-red-500/15 rounded text-red-700 space-y-1">
                      <p className="font-bold">Vincoli e Conflitti:</p>
                      {candidates.find(c => c.id === showExplanationModal)?.constraints?.map((constraint, i) => (
                        <p key={i}>• {constraint}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[10px] text-zinc-400 leading-relaxed border-t border-zinc-100 pt-2 text-center">
                Canale di contatto autorizzato: {candidates.find(c => c.id === showExplanationModal)?.contactChannel}
              </div>
            </div>

            <button 
              onClick={() => setShowExplanationModal(null)}
              className="w-full py-2 bg-zinc-900 text-white font-extrabold text-xs rounded-lg hover:bg-black transition text-center"
            >
              Chiudi Finestra Informativa
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
