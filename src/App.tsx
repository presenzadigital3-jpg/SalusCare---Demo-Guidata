import React, { useState } from 'react';
import { Header } from './components/Header';
import { PatientApp } from './components/PatientApp';
import { OperationsCockpit } from './components/OperationsCockpit';
import { DemoPanel, DEMO_STEPS } from './components/DemoPanel';
import { 
  getInitialAppointments, getInitialDevices, getInitialCyberEvents, 
  getInitialAuditTrail, getInitialComplaints, getInitialOperationalAlerts,
  PATIENTS 
} from './data';
import { Appointment, Device, CyberEvent, AuditEvent, Complaint, OperationalAlert, DemoState } from './types';

export default function App() {
  // Global Shared States
  const [appointments, setAppointments] = useState<Appointment[]>(() => getInitialAppointments());
  const [devices, setDevices] = useState<Device[]>(() => getInitialDevices());
  const [cyberEvents, setCyberEvents] = useState<CyberEvent[]>(() => getInitialCyberEvents());
  const [auditTrail, setAuditTrail] = useState<AuditEvent[]>(() => getInitialAuditTrail());
  const [complaints, setComplaints] = useState<Complaint[]>(() => getInitialComplaints());
  const [alerts, setAlerts] = useState<OperationalAlert[]>(() => getInitialOperationalAlerts());

  // Demo Assistata State
  const [demoState, setDemoState] = useState<DemoState>({
    currentStep: 1,
    view: 'operations',
    activePatientId: 'PAT-1042',
    activeSlotId: 'APT-1042'
  });

  const [showDemoPanel, setShowDemoPanel] = useState(true);

  // Workflow states tracked centrally to bridge Patient & Ops
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [overrideReason, setOverrideReason] = useState('');
  const [biomedicalCheckRequested, setBiomedicalCheckRequested] = useState(false);
  const [biomedicalCheckCompleted, setBiomedicalCheckCompleted] = useState(false);
  const [currentOfferState, setCurrentOfferState] = useState<'idle' | 'sent' | 'accepted' | 'completed'>('idle');

  // Triggered when patient requests reschedule in Patient App
  const handleRescheduleRequest = (apptId: string, reason: string) => {
    // 1. Update the appointment status to "Liberato"
    setAppointments(prev => prev.map(a => 
      a.id === apptId 
        ? { ...a, status: 'Liberato', cancelReason: reason, hoursNotice: 168 } 
        : a
    ));

    // 2. Register event in Audit Trail
    const newAuditEvent: AuditEvent = {
      id: `AUD-NEW-RELEASE-${Date.now()}`,
      timestamp: new Date().toISOString(),
      event: 'slot_released',
      sourceSystem: 'PORTALE_PAZIENTE',
      operator: 'Giulia Bianchi',
      patientId: 'PAT-1042',
      appointmentId: apptId,
      episodeId: 'EPI-9042',
      ruleApplied: 'REG_CANCELLATION_RECON',
      decision: 'RELEASED'
    };
    setAuditTrail(prev => [newAuditEvent, ...prev]);

    // 3. Create a warning operational alert
    const newAlert: OperationalAlert = {
      id: `ALT-NEW-RELEASE-${Date.now()}`,
      type: 'SLOT_RISK',
      message: `Slot RMN liberato da Giulia Bianchi (Milano Centro, RM-001). Preavviso utile calcolato: 168 ore.`,
      timestamp: new Date().toISOString(),
      severity: 'HIGH',
      resolved: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  // Triggered when candidate accepts the offer in Patient App
  const handleAcceptOffer = (apptId: string) => {
    // Update appointment state to "Accettato"
    setAppointments(prev => prev.map(a => 
      a.id === apptId 
        ? { ...a, status: 'Accettato' } 
        : a
    ));
    setCurrentOfferState('accepted');

    // Add audit logs
    const acceptEvent: AuditEvent = {
      id: `AUD-NEW-ACCEPT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      event: 'offer_accepted',
      sourceSystem: 'PORTALE_PAZIENTE',
      operator: 'Matteo Rossini',
      patientId: 'PAT-2011',
      appointmentId: apptId,
      episodeId: 'EPI-9011',
      ruleApplied: 'REG_RECON_FLOW',
      decision: 'SUCCESS'
    };

    const reassignEvent: AuditEvent = {
      id: `AUD-NEW-REASSIGN-${Date.now() + 100}`,
      timestamp: new Date().toISOString(),
      event: 'slot_reassigned',
      sourceSystem: 'SMART_ACCESS',
      operator: 'SISTEMA_ACCESS',
      patientId: 'PAT-2011',
      appointmentId: apptId,
      episodeId: 'EPI-9011',
      ruleApplied: 'REG_SLOT_ALLOC',
      decision: 'REASSIGNED'
    };

    setAuditTrail(prev => [reassignEvent, acceptEvent, ...prev]);
  };

  const handleDeclineOffer = (apptId: string) => {
    // If declined, return status to Liberato so candidate search can run again
    setAppointments(prev => prev.map(a => 
      a.id === apptId 
        ? { ...a, status: 'Liberato' } 
        : a
    ));
  };

  // Reset Demo to Initial Baseline
  const handleResetDemo = () => {
    setAppointments(getInitialAppointments());
    setDevices(getInitialDevices());
    setCyberEvents(getInitialCyberEvents());
    setAuditTrail(getInitialAuditTrail());
    setComplaints(getInitialComplaints());
    setAlerts(getInitialOperationalAlerts());
    setDemoState({
      currentStep: 1,
      view: 'operations',
      activePatientId: 'PAT-1042',
      activeSlotId: 'APT-1042'
    });
    setSelectedCandidateId(null);
    setOverrideReason('');
    setBiomedicalCheckRequested(false);
    setBiomedicalCheckCompleted(false);
    setCurrentOfferState('idle');
  };

  // Automated/Guided step advance helper
  const handleStepTransition = (targetStep: number) => {
    setDemoState(prev => {
      let nextView = prev.view;
      let nextPatientId = prev.activePatientId;

      // Define static view switching based on step configuration
      if (targetStep === 1) {
        nextView = 'operations';
      } else if (targetStep === 2) {
        nextView = 'patient';
        nextPatientId = 'PAT-1042'; // Giulia Bianchi
      } else if (targetStep === 3) {
        nextView = 'patient';
        nextPatientId = 'PAT-1042';
      } else if (targetStep === 4) {
        nextView = 'operations';
      } else if (targetStep === 5) {
        nextView = 'operations';
      } else if (targetStep === 6) {
        nextView = 'operations';
      } else if (targetStep === 7) {
        nextView = 'operations';
      } else if (targetStep === 8) {
        nextView = 'operations';
      } else if (targetStep === 9) {
        nextView = 'patient';
        nextPatientId = 'PAT-2011'; // Matteo Rossini receives the offer
      } else if (targetStep === 10) {
        nextView = 'operations';
      } else if (targetStep === 11) {
        nextView = 'operations';
      } else if (targetStep === 12) {
        nextView = 'operations';
      }

      return {
        ...prev,
        currentStep: targetStep,
        view: nextView,
        activePatientId: nextPatientId
      };
    });
  };

  // Synchronous state modifications on click "Avanti" in guide
  const handleAdvanceStep = (nextStep: number) => {
    // Before moving to next, make sure previous actions are simulated so the flow never breaks
    simulatePriorStepActions(nextStep);
    handleStepTransition(nextStep);
  };

  const handleGoBackStep = (prevStep: number) => {
    // Simply return step index
    handleStepTransition(prevStep);
  };

  // Direct fast-forward simulation (force state for selected step)
  const handleFastForwardStep = (stepNumber: number) => {
    // Run all cumulative actions up to this step
    simulatePriorStepActions(stepNumber + 1);
    handleStepTransition(stepNumber);
  };

  // Helper to ensure database is in a consistent state before showing a demo step
  const simulatePriorStepActions = (nextStep: number) => {
    // Cumulative simulation trigger based on step we are ENTERING
    if (nextStep >= 4) {
      // Step 3 was Patient reschedule -> slot must be Liberato
      setAppointments(prev => prev.map(a => 
        a.id === 'APT-1042' && ['In attesa di conferma', 'Confermato'].includes(a.status)
          ? { ...a, status: 'Liberato', cancelReason: 'Impossibilità lavorativa', hoursNotice: 168 } 
          : a
      ));
    }
    if (nextStep >= 6) {
      // Step 5 was Candidate search -> slot must be Candidate Search
      setAppointments(prev => prev.map(a => 
        a.id === 'APT-1042' && a.status === 'Liberato'
          ? { ...a, status: 'Candidate search' } 
          : a
      ));
    }
    if (nextStep >= 7) {
      // Step 6 was Select Candidate Matteo -> candidate is set
      setSelectedCandidateId('CAN-001');
    }
    if (nextStep >= 8) {
      // Step 7 was Device Gate approval -> biomedical check completed
      setBiomedicalCheckRequested(true);
      setBiomedicalCheckCompleted(true);
      setDevices(prev => prev.map(d => d.id === 'RM-001' ? {
        ...d,
        status: 'ONLINE',
        availabilityDecision: 'ALLOW',
        recentAnomalies: ['Verifica biomedicale superata (14/07/2026 - OK)']
      } : d));
    }
    if (nextStep >= 9) {
      // Step 8 was Offer sent -> status Offerto
      setAppointments(prev => prev.map(a => {
        if (a.id === 'APT-1042' && ['Candidate search', 'Liberato'].includes(a.status)) {
          return {
            ...a,
            status: 'Offerto',
            patientId: 'PAT-2011',
            patientName: 'Matteo Rossini',
            selectedCandidateId: 'CAN-001',
            hoursNotice: 168,
            totalRecoveryMinutes: 240
          };
        }
        return a;
      }));
      setCurrentOfferState('sent');
    }
    if (nextStep >= 10) {
      // Step 9 was Patient accepts -> status Accettato
      setAppointments(prev => prev.map(a => 
        a.id === 'APT-1042' && a.status === 'Offerto'
          ? { ...a, status: 'Accettato', patientId: 'PAT-2011', patientName: 'Matteo Rossini' } 
          : a
      ));
      setCurrentOfferState('accepted');
    }
    if (nextStep >= 11) {
      // Step 10 was Register complete -> status Completato
      setAppointments(prev => prev.map(a => 
        a.id === 'APT-1042' && a.status === 'Accettato'
          ? { ...a, status: 'Completato', patientId: 'PAT-2011', patientName: 'Matteo Rossini' } 
          : a
      ));
      setCurrentOfferState('completed');
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-50 font-sans antialiased text-[#2E2E38]">
      
      {/* GLOBAL BRAND HEADER */}
      <Header 
        demoState={demoState}
        setDemoState={setDemoState}
        showDemoPanel={showDemoPanel}
        setShowDemoPanel={setShowDemoPanel}
        onResetDemo={handleResetDemo}
      />

      {/* CORE WORKSPACE PORT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* VIEW ROUTER */}
        {demoState.view === 'patient' ? (
          <PatientApp 
            activePatientId={demoState.activePatientId}
            appointments={appointments}
            patients={PATIENTS}
            onRescheduleRequest={handleRescheduleRequest}
            onAcceptOffer={handleAcceptOffer}
            onDeclineOffer={handleDeclineOffer}
            demoStep={demoState.currentStep}
            onManualStepAdvance={() => handleAdvanceStep(demoState.currentStep + 1)}
          />
        ) : (
          <OperationsCockpit 
            appointments={appointments}
            setAppointments={setAppointments}
            devices={devices}
            setDevices={setDevices}
            cyberEvents={cyberEvents}
            auditTrail={auditTrail}
            setAuditTrail={setAuditTrail}
            complaints={complaints}
            alerts={alerts}
            demoStep={demoState.currentStep}
            onManualStepAdvance={() => handleAdvanceStep(demoState.currentStep + 1)}
            selectedCandidateId={selectedCandidateId}
            setSelectedCandidateId={setSelectedCandidateId}
            overrideReason={overrideReason}
            setOverrideReason={setOverrideReason}
            biomedicalCheckRequested={biomedicalCheckRequested}
            setBiomedicalCheckRequested={setBiomedicalCheckRequested}
            biomedicalCheckCompleted={biomedicalCheckCompleted}
            setBiomedicalCheckCompleted={setBiomedicalCheckCompleted}
            currentOfferState={currentOfferState}
            setCurrentOfferState={setCurrentOfferState}
          />
        )}

        {/* PERSISTENT DEMO PANEL ASSISTANT (RIGHT DRAWER) */}
        {showDemoPanel && (
          <DemoPanel 
            demoState={demoState}
            setDemoState={setDemoState}
            onAdvanceStep={handleAdvanceStep}
            onGoBackStep={handleGoBackStep}
            onResetDemo={handleResetDemo}
            onFastForwardStep={handleFastForwardStep}
          />
        )}
      </div>

    </div>
  );
}
