import React, { useState } from 'react';
import { 
  Calendar, MapPin, User, ChevronRight, FileText, CheckCircle2, AlertTriangle, 
  Clock, CreditCard, Stethoscope, Video, ArrowLeft, ArrowRight, ShieldAlert,
  Sparkles, Check, X, Smartphone, Globe
} from 'lucide-react';
import { Appointment, Patient, AppointmentStatus } from '../types';

interface PatientAppProps {
  activePatientId: string;
  appointments: Appointment[];
  patients: Patient[];
  onRescheduleRequest: (appointmentId: string, reason: string) => void;
  onAcceptOffer: (appointmentId: string) => void;
  onDeclineOffer: (appointmentId: string) => void;
  demoStep: number;
  onManualStepAdvance: () => void;
}

export const PatientApp: React.FC<PatientAppProps> = ({
  activePatientId,
  appointments,
  patients,
  onRescheduleRequest,
  onAcceptOffer,
  onDeclineOffer,
  demoStep,
  onManualStepAdvance
}) => {
  const [currentTab, setCurrentTab] = useState<'home' | 'appointments'>('home');
  const [selectedApptId, setSelectedApptId] = useState<string | null>(null);
  const [rescheduleReason, setRescheduleReason] = useState('Impossibilità lavorativa');
  const [rescheduleNotes, setRescheduleNotes] = useState('');
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // Find current patient data
  const patient = patients.find(p => p.id === activePatientId) || patients[0];
  
  // Find appointments related to this patient
  const patientAppointments = appointments.filter(a => a.patientId === patient.id);
  
  // Active appointment for drilldown or detail
  const activeAppt = selectedApptId 
    ? appointments.find(a => a.id === selectedApptId) 
    : patientAppointments[0];

  // Specific check for Matteo Rossini's offered slot
  // In step 8 & 9, Matteo Rossini is offered Giulia's original slot (APT-1042)
  const offeredAppointment = appointments.find(a => a.patientId === patient.id && a.status === 'Offerto');

  const handleRequestRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeAppt) {
      onRescheduleRequest(activeAppt.id, rescheduleReason);
      setShowRescheduleForm(false);
      setSelectedApptId(null);
      // Auto-advance if demo is aligned
      if (demoStep === 3) {
        onManualStepAdvance();
      }
    }
  };

  const handleAcceptProposal = () => {
    if (offeredAppointment) {
      onAcceptOffer(offeredAppointment.id);
      if (demoStep === 9) {
        onManualStepAdvance();
      }
    }
  };

  const handleDeclineProposal = () => {
    if (offeredAppointment) {
      onDeclineOffer(offeredAppointment.id);
    }
  };

  return (
    <div className="flex-1 bg-zinc-100 p-4 lg:p-8 flex items-center justify-center overflow-y-auto">
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* View mode buttons */}
        <div className="w-full flex justify-between items-center mb-4 max-w-md">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Visualizzazione App</span>
          <div className="flex bg-zinc-200 p-0.5 rounded-lg text-xs">
            <button 
              onClick={() => setIsPhoneFrame(true)} 
              className={`px-3 py-1 rounded-md font-bold flex items-center gap-1.5 ${isPhoneFrame ? 'bg-white text-zinc-800 shadow' : 'text-zinc-600'}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Smartphone Frame
            </button>
            <button 
              onClick={() => setIsPhoneFrame(false)} 
              className={`px-3 py-1 rounded-md font-bold flex items-center gap-1.5 ${!isPhoneFrame ? 'bg-white text-zinc-800 shadow' : 'text-zinc-600'}`}
            >
              <Globe className="w-3.5 h-3.5" />
              Responsive Web
            </button>
          </div>
        </div>

        {/* Device Frame Wrapper */}
        <div className={`w-full transition-all duration-300 ${
          isPhoneFrame 
            ? 'max-w-[400px] h-[780px] border-[12px] border-zinc-900 rounded-[45px] shadow-2xl bg-white overflow-hidden flex flex-col relative' 
            : 'max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col'
        }`}>
          {/* Phone Status Bar */}
          {isPhoneFrame && (
            <div className="bg-zinc-900 text-white text-[11px] px-6 py-2 flex justify-between items-center select-none">
              <span className="font-semibold">09:41</span>
              <div className="w-20 h-4 bg-black rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2" />
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] bg-yellow-400 text-zinc-900 px-1 rounded font-bold">5G</span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" title="Connessione Protetta" />
              </div>
            </div>
          )}

          {/* App Header */}
          <div className="bg-white text-[#2E2E38] p-4 flex items-center justify-between border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2E2E38] rounded-lg flex items-center justify-center text-[#FFE600] font-black text-sm">
                S
              </div>
              <div>
                <h4 className="font-extrabold text-xs tracking-tight">SalusCare Portal</h4>
                <p className="text-[9px] text-zinc-500">Digital Patient Gate</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#FFE600]/25 text-[#2E2E38] px-2 py-0.5 rounded border border-[#FFE600]/40 font-bold">
                {patient.id}
              </span>
            </div>
          </div>

          {/* App Body Area */}
          <div className="flex-1 overflow-y-auto bg-zinc-50 flex flex-col">
            
            {/* ALERT BOX (offered slot notification) */}
            {offeredAppointment && (
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-4 shadow-md flex flex-col gap-3 relative overflow-hidden animate-pulse">
                <div className="absolute right-2 top-2 opacity-10">
                  <Sparkles className="w-24 h-24" />
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="bg-white/20 p-1.5 rounded-lg mt-0.5">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-xs uppercase tracking-wider">Slot Anticipato Rilevato!</h5>
                    <p className="text-xs font-semibold leading-snug">
                      Si è liberato uno slot compatibile con la tua prestazione per il giorno <strong className="underline">{offeredAppointment.date}</strong> alle <strong>{offeredAppointment.time}</strong>.
                    </p>
                  </div>
                </div>
                
                {/* Visual Difference Indicator */}
                <div className="bg-zinc-900/10 p-2.5 rounded border border-white/15 text-[11px] space-y-1">
                  <div>🔍 <strong>Vantaggio Temporale:</strong></div>
                  <div className="flex items-center justify-between font-bold">
                    <span>Vecchio Appuntamento:</span>
                    <span className="line-through text-zinc-200">18 Agosto 2026</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-yellow-100">
                    <span>Nuova data proposta:</span>
                    <span>{offeredAppointment.date} (Anticipo di 28 giorni!)</span>
                  </div>
                </div>

                <div className="flex gap-2 text-xs pt-1">
                  <button 
                    onClick={handleAcceptProposal}
                    className="flex-1 py-2 bg-zinc-900 text-[#FFE600] font-extrabold rounded-lg hover:bg-black transition flex items-center justify-center gap-1 shadow"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accetta Nuova Data</span>
                  </button>
                  <button 
                    onClick={handleDeclineProposal}
                    className="py-2 px-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/35 transition"
                    title="Mantieni l'appuntamento esistente"
                  >
                    Rifiuta
                  </button>
                </div>
              </div>
            )}

            {/* IF COMPLETED CONFIRMATION IN STEP 9 */}
            {patient.id === 'PAT-2011' && appointments.find(a => a.patientId === 'PAT-2011' && a.status === 'Accettato') && (
              <div className="bg-emerald-600 text-white p-4 shadow-md flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-bold text-xs uppercase tracking-wider">Nuovo Appuntamento Confermato!</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Hai accettato la proposta. Il tuo appuntamento di <strong>Risonanza Magnetica</strong> è stato anticipato con successo a <strong>Milano Centro</strong> il giorno <strong>21 Luglio alle ore 10:30</strong>. Lo slot originario del 18 Agosto è stato rilasciato per altri pazienti in lista d'attesa.
                </p>
              </div>
            )}

            {/* TAB SELECTOR */}
            <div className="flex border-b border-zinc-200 bg-white sticky top-0 z-10">
              <button 
                onClick={() => { setCurrentTab('home'); setSelectedApptId(null); setShowRescheduleForm(false); }}
                className={`flex-1 py-3 text-center text-xs font-extrabold border-b-2 transition ${
                  currentTab === 'home' && !selectedApptId && !showRescheduleForm
                    ? 'border-[#2E2E38] text-[#2E2E38]' 
                    : 'border-transparent text-zinc-400 hover:text-zinc-600'
                }`}
              >
                Home Portale
              </button>
              <button 
                onClick={() => { setCurrentTab('appointments'); setSelectedApptId(null); setShowRescheduleForm(false); }}
                className={`flex-1 py-3 text-center text-xs font-extrabold border-b-2 transition ${
                  currentTab === 'appointments' || selectedApptId || showRescheduleForm
                    ? 'border-[#2E2E38] text-[#2E2E38]' 
                    : 'border-transparent text-zinc-400 hover:text-zinc-600'
                }`}
              >
                Miei Appuntamenti ({patientAppointments.length})
              </button>
            </div>

            {/* MAIN SCREENS CONTENT */}
            <div className="p-4 flex-1 space-y-4">
              
              {/* SCREEN 1: HOME */}
              {currentTab === 'home' && !selectedApptId && !showRescheduleForm && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Greeting card */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center border border-zinc-200">
                        <User className="w-5 h-5 text-zinc-600" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-[#2E2E38]">Ciao, {patient.name}!</h4>
                        <p className="text-[10px] text-zinc-400">ID Paziente: {patient.id} • Sede: {patient.preferredLocation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Prossimo Appuntamento widget */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#2E2E38]" /> Prossimo Appuntamento
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        patientAppointments[0]?.status === 'In attesa di conferma' ? 'bg-amber-100 text-amber-700' :
                        patientAppointments[0]?.status === 'Confermato' ? 'bg-emerald-100 text-emerald-700' :
                        patientAppointments[0]?.status === 'Liberato' ? 'bg-red-50 text-red-500 border border-red-100' :
                        patientAppointments[0]?.status === 'Accettato' ? 'bg-indigo-100 text-indigo-700 font-extrabold' :
                        'bg-zinc-100 text-zinc-600'
                      }`}>
                        {patientAppointments[0]?.status || 'Nessuno'}
                      </span>
                    </div>

                    {patientAppointments.length > 0 ? (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <h5 className="font-extrabold text-sm text-[#2E2E38]">{patientAppointments[0].examType}</h5>
                          <p className="text-[11px] text-zinc-500">{patientAppointments[0].specialty} • {patientAppointments[0].physician}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1.5 text-zinc-600 bg-zinc-50 p-2 rounded border border-zinc-100">
                            <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <div>
                              <p className="text-[9px] text-zinc-400">Data e Ora</p>
                              <p className="font-bold text-[#2E2E38]">{patientAppointments[0].date} - {patientAppointments[0].time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-zinc-600 bg-zinc-50 p-2 rounded border border-zinc-100">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <div>
                              <p className="text-[9px] text-zinc-400">Sede Sanitaria</p>
                              <p className="font-bold text-[#2E2E38]">{patientAppointments[0].location}</p>
                            </div>
                          </div>
                        </div>

                        {/* Preparazione richiesta snippet */}
                        <div className="bg-zinc-50 p-2.5 rounded border border-zinc-100 space-y-1 text-[11px]">
                          <span className="font-bold text-zinc-500">Preparazione richiesta:</span>
                          <p className="text-zinc-600 leading-normal">{patientAppointments[0].preparationRequired}</p>
                        </div>

                        <button 
                          onClick={() => { setSelectedApptId(patientAppointments[0].id); setCurrentTab('appointments'); }}
                          className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 text-[#2E2E38] font-bold text-xs rounded-lg transition flex items-center justify-center gap-1"
                        >
                          <span>Gestisci Prenotazione</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-500 text-center py-4">Nessun appuntamento prenotato al momento.</p>
                    )}
                  </div>

                  {/* Quick services grids */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Servizi Digitali Rapidi</h5>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-white p-3 rounded-xl border border-zinc-200 flex flex-col gap-2 hover:border-zinc-300 transition cursor-pointer">
                        <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-[#2E2E38]">Referti & Esami</p>
                          <p className="text-[9px] text-zinc-400">Scarica PDF firmati</p>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-zinc-200 flex flex-col gap-2 hover:border-zinc-300 transition cursor-pointer">
                        <div className="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                          <Video className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-[#2E2E38]">Televisite</p>
                          <p className="text-[9px] text-zinc-400">Video-consulto medico</p>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-zinc-200 flex flex-col gap-2 hover:border-zinc-300 transition cursor-pointer">
                        <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-[#2E2E38]">Fatture & Ticket</p>
                          <p className="text-[9px] text-zinc-400">Paga online in sicurezza</p>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-zinc-200 flex flex-col gap-2 hover:border-zinc-300 transition cursor-pointer">
                        <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                          <Stethoscope className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-[#2E2E38]">Ricette Mediche</p>
                          <p className="text-[9px] text-zinc-400">Codici ricetta dematerializzati</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Informational warning */}
                  <div className="bg-zinc-100 p-2.5 rounded border border-zinc-200 text-center">
                    <p className="text-[9px] text-zinc-400 leading-normal flex items-center justify-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-zinc-400 shrink-0" />
                      Tutti i dati mostrati sono sintetici a solo scopo dimostrativo.
                    </p>
                  </div>
                </div>
              )}

              {/* SCREEN 2: APPOINTMENTS LIST */}
              {currentTab === 'appointments' && !selectedApptId && !showRescheduleForm && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex justify-between items-center pb-1">
                    <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Miei Appuntamenti</h5>
                    <span className="text-[10px] text-zinc-500 font-medium">Totale: {patientAppointments.length} prestazioni</span>
                  </div>

                  <div className="space-y-3">
                    {patientAppointments.map(appt => (
                      <div 
                        key={appt.id}
                        onClick={() => setSelectedApptId(appt.id)}
                        className="bg-white p-3.5 rounded-xl border border-zinc-200 shadow-sm hover:border-zinc-300 transition cursor-pointer space-y-2.5 relative group"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded">
                              {appt.specialty}
                            </span>
                            <h6 className="font-extrabold text-sm text-[#2E2E38] mt-1 group-hover:text-blue-600 transition">
                              {appt.examType}
                            </h6>
                          </div>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            appt.status === 'In attesa di conferma' ? 'bg-amber-100 text-amber-700' :
                            appt.status === 'Confermato' ? 'bg-emerald-100 text-emerald-700' :
                            appt.status === 'Liberato' ? 'bg-red-50 text-red-500 border border-red-100' :
                            appt.status === 'Accettato' ? 'bg-indigo-100 text-indigo-700 font-extrabold' :
                            'bg-zinc-100 text-zinc-600'
                          }`}>
                            {appt.status}
                          </span>
                        </div>

                        <div className="flex gap-4 text-[11px] text-zinc-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{appt.date} alle {appt.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{appt.location}</span>
                          </div>
                        </div>

                        <div className="text-[10px] text-zinc-400 border-t border-zinc-100 pt-2 flex justify-between items-center">
                          <span>Medico: {appt.physician}</span>
                          <span className="text-zinc-500 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-all">
                            Dettaglio <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SCREEN 3: APPOINTMENT DETAIL SCREEN */}
              {selectedApptId && activeAppt && !showRescheduleForm && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Back to list button */}
                  <button 
                    onClick={() => setSelectedApptId(null)}
                    className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-800 transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Torna alla lista</span>
                  </button>

                  {/* Header card */}
                  <div className="bg-zinc-50 border border-[#E5E7EB] text-[#2E2E38] p-4 rounded-xl space-y-2">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#2E2E38] bg-[#FFE600]/25 px-2 py-0.5 rounded border border-[#FFE600]/40">
                      {activeAppt.specialty}
                    </span>
                    <h5 className="font-extrabold text-base leading-snug">{activeAppt.examType}</h5>
                    <p className="text-xs text-zinc-500 font-medium">Referente: {activeAppt.physician} • Sede: {activeAppt.location}</p>
                  </div>

                  {/* Status indicator info */}
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200 flex justify-between items-center shadow-sm">
                    <span className="text-xs font-bold text-zinc-500">Stato Appuntamento:</span>
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${
                      activeAppt.status === 'In attesa di conferma' ? 'bg-amber-100 text-amber-700' :
                      activeAppt.status === 'Confermato' ? 'bg-emerald-100 text-emerald-700' :
                      activeAppt.status === 'Liberato' ? 'bg-red-50 text-red-500 border border-red-100' :
                      activeAppt.status === 'Accettato' ? 'bg-indigo-100 text-indigo-700 font-extrabold' :
                      'bg-zinc-100 text-zinc-600'
                    }`}>
                      {activeAppt.status}
                    </span>
                  </div>

                  {/* Logistic details */}
                  <div className="bg-white p-4 rounded-xl border border-zinc-200 space-y-3 shadow-sm text-xs">
                    <div className="flex justify-between items-center py-2 border-b border-zinc-100">
                      <span className="text-zinc-400 font-medium">Data prenotata:</span>
                      <span className="font-bold text-[#2E2E38]">{activeAppt.date}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-100">
                      <span className="text-zinc-400 font-medium">Orario di convocazione:</span>
                      <span className="font-bold text-[#2E2E38]">{activeAppt.time}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-100">
                      <span className="text-zinc-400 font-medium">Ambulatorio / Macchina:</span>
                      <span className="font-bold text-zinc-600">{activeAppt.room} ({activeAppt.deviceId})</span>
                    </div>
                  </div>

                  {/* Requirements details */}
                  <div className="bg-white p-4 rounded-xl border border-zinc-200 space-y-2 shadow-sm text-xs">
                    <span className="font-extrabold text-zinc-500 block">Preparazione Obbligatoria Richiesta:</span>
                    <p className="text-zinc-600 leading-relaxed bg-zinc-50 p-2.5 rounded border border-zinc-100 italic">
                      {activeAppt.preparationRequired}
                    </p>
                  </div>

                  {/* Actions buttons */}
                  {activeAppt.status !== 'Liberato' && activeAppt.status !== 'Accettato' && (
                    <div className="space-y-2 pt-2">
                      <button 
                        onClick={() => setShowRescheduleForm(true)}
                        className="w-full py-2.5 bg-[#FFE600] text-[#2E2E38] font-extrabold text-xs rounded-xl hover:bg-yellow-400 transition flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Richiedi Riprogrammazione</span>
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm("Sei sicuro di voler cancellare definitivamente questo appuntamento? Lo slot verrà rilasciato subito.")) {
                            onRescheduleRequest(activeAppt.id, "Cancellazione definitiva");
                            setSelectedApptId(null);
                          }
                        }}
                        className="w-full py-2 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 font-bold text-xs rounded-xl transition"
                      >
                        Cancella Appuntamento
                      </button>
                    </div>
                  )}

                  {activeAppt.status === 'Liberato' && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center text-xs text-red-600 font-medium">
                      Hai liberato questo appuntamento. Il sistema è alla ricerca di uno slot alternativo compatibile con le tue preferenze.
                    </div>
                  )}
                </div>
              )}

              {/* SCREEN 4: RESCHEDULE REQUEST FORM */}
              {showRescheduleForm && activeAppt && (
                <form onSubmit={handleRequestRescheduleSubmit} className="space-y-4 animate-fadeIn">
                  <button 
                    type="button"
                    onClick={() => setShowRescheduleForm(false)}
                    className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-800 transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Annulla</span>
                  </button>

                  <h5 className="text-sm font-extrabold text-[#2E2E38] tracking-tight border-b border-zinc-200 pb-2 uppercase text-xs text-zinc-400">
                    Modulo di Riprogrammazione
                  </h5>

                  {/* Warning Info */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-2">
                    <div className="flex gap-2 text-amber-700 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Rilascio immediato dello slot</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-normal">
                      Inoltrando questa richiesta, il tuo attuale slot del <strong>{activeAppt.date}</strong> alle <strong>{activeAppt.time}</strong> verrà <strong>liberato immediatamente</strong> per consentire il recupero ad altri pazienti compatibili. Verrai inserito con priorità nel circuito di ottimizzazione.
                    </p>
                  </div>

                  {/* Motivation */}
                  <div className="space-y-1.5 text-xs">
                    <label className="font-extrabold text-[#2E2E38] block">Seleziona Motivazione:</label>
                    <select 
                      value={rescheduleReason}
                      onChange={(e) => setRescheduleReason(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-lg p-2 font-medium"
                    >
                      <option value="Impossibilità lavorativa">Impossibilità lavorativa</option>
                      <option value="Problema di salute imprevisto">Problema di salute imprevisto</option>
                      <option value="Difficoltà logistiche o trasporto">Difficoltà logistiche o trasporto</option>
                      <option value="Altro impegno improrogabile">Altro impegno improrogabile</option>
                    </select>
                  </div>

                  {/* Sede preferita and timing preferences */}
                  <div className="space-y-2 text-xs">
                    <div className="space-y-1">
                      <label className="font-extrabold text-[#2E2E38] block">Fascia Oraria Preferita:</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-1.5 p-2 border border-zinc-200 rounded bg-white">
                          <input type="checkbox" defaultChecked id="pref_morning" className="accent-[#2E2E38]" />
                          <label htmlFor="pref_morning" className="font-medium text-zinc-600">Mattina (08-13)</label>
                        </div>
                        <div className="flex items-center gap-1.5 p-2 border border-zinc-200 rounded bg-white">
                          <input type="checkbox" id="pref_afternoon" className="accent-[#2E2E38]" />
                          <label htmlFor="pref_afternoon" className="font-medium text-zinc-600">Pomeriggio (13-19)</label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-extrabold text-[#2E2E38] block">Sede Sanitaria Preferita:</label>
                      <div className="bg-white border border-zinc-300 rounded-lg p-2 font-medium">
                        {activeAppt.location} (Consigliata)
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1 text-xs">
                    <label className="font-extrabold text-[#2E2E38] block">Note opzionali:</label>
                    <textarea 
                      value={rescheduleNotes}
                      onChange={(e) => setRescheduleNotes(e.target.value)}
                      placeholder="Fornisci eventuali dettagli per agevolare il matching..."
                      className="w-full bg-white border border-zinc-300 rounded-lg p-2 h-16 font-medium text-xs text-zinc-600"
                    />
                  </div>

                  {/* Submit buttons */}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 text-white font-extrabold text-xs rounded-xl hover:bg-emerald-700 transition shadow-md shadow-emerald-700/10 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Inoltra Richiesta & Libera Slot</span>
                  </button>
                </form>
              )}

            </div>
          </div>

          {/* Phone Navigation Bar */}
          {isPhoneFrame && (
            <div className="bg-zinc-950 border-t border-zinc-800 p-2 shrink-0 flex justify-center items-center select-none">
              <div className="w-32 h-1 bg-white/40 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
