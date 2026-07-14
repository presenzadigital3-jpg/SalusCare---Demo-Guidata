import React from 'react';
import { Play, ArrowRight, ArrowLeft, RefreshCw, Layers, ShieldCheck, UserCheck, HelpCircle } from 'lucide-react';
import { DemoState } from '../types';

interface DemoPanelProps {
  demoState: DemoState;
  setDemoState: React.Dispatch<React.SetStateAction<DemoState>>;
  onAdvanceStep: (step: number) => void;
  onGoBackStep: (step: number) => void;
  onResetDemo: () => void;
  onFastForwardStep: (step: number) => void;
}

export interface DemoStep {
  number: number;
  title: string;
  view: 'patient' | 'operations';
  activePatientId: string;
  description: string;
  spokenScript: string;
  keyAction: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    number: 1,
    title: 'Dashboard Iniziale',
    view: 'operations',
    activePatientId: 'PAT-1042',
    description: 'Cockpit direzionale con KPI iniziali a scopo dimostrativo. Presenta la North Star Metric.',
    spokenScript: 'Benvenuti nella demo di SalusCare Smart Access & Resilience. Questa è la dashboard direzionale degli Operations. Notate i nostri KPI di partenza: 24 prestazioni completate recuperate. Il nostro obiettivo è ottimizzare la capacità e ridurre gli slot inutilizzati rispettando la priorità clinica e la sicurezza dei dispositivi.',
    keyAction: 'Avvia il flusso premendo Avanti per passare alla Patient App.'
  },
  {
    number: 2,
    title: 'App Paziente: Giulia Bianchi',
    view: 'patient',
    activePatientId: 'PAT-1042',
    description: 'Giulia Bianchi visualizza il suo appuntamento fissato tra 7 giorni.',
    spokenScript: 'A questo punto il paziente apre l’app e trova il prossimo appuntamento. Non gli chiediamo soltanto di ricordarsi della visita: gli permettiamo di confermare, cancellare o richiedere una riprogrammazione attraverso un percorso semplice e tracciabile.',
    keyAction: 'Apri l\'appuntamento di Giulia Bianchi e richiedi una riprogrammazione.'
  },
  {
    number: 3,
    title: 'Richiesta Riprogrammazione',
    view: 'patient',
    activePatientId: 'PAT-1042',
    description: 'Giulia invia la richiesta di riprogrammazione inserendo la motivazione lavorativa.',
    spokenScript: 'Qui il paziente comunica che non può presentarsi. La cancellazione anticipata non è più soltanto un evento amministrativo: diventa un segnale operativo che libera capacità in tempo utile.',
    keyAction: 'Completa la richiesta di riprogrammazione inserendo "Impossibilità lavorativa" e conferma.'
  },
  {
    number: 4,
    title: 'Cockpit: Slot Liberato',
    view: 'operations',
    activePatientId: 'PAT-1042',
    description: 'Il cockpit riceve lo slot liberato e calcola il preavviso e il valore economico proxy.',
    spokenScript: 'Lo slot passa immediatamente nel cockpit. Vediamo lo slot di risonanza magnetica di Giulia Bianchi con stato "Liberato" e un preavviso utile di 168 ore. Il sistema rileva automaticamente la disponibilità e abilita la ricerca di un candidato ottimale.',
    keyAction: 'Clicca sullo slot liberato di Giulia Bianchi nella tabella e vai ai dettagli.'
  },
  {
    number: 5,
    title: 'Candidate Matching & Ranking',
    view: 'operations',
    activePatientId: 'PAT-1042',
    description: 'La piattaforma effettua il ranking spiegabile dei candidati compatibili in lista d\'attesa.',
    spokenScript: 'Il sistema non propone indiscriminatamente il primo paziente disponibile: genera una lista compatibile che rispetta priorità clinica, giorni di attesa, sede, autorizzazioni e vincoli logistici.',
    keyAction: 'Clicca su "Trova candidati compatibili" per caricare il ranking.'
  },
  {
    number: 6,
    title: 'Spiegazione del Ranking',
    view: 'operations',
    activePatientId: 'PAT-1042',
    description: 'Analisi dei reason codes per Matteo Rossini (Score: 96).',
    spokenScript: 'Qui rendiamo il ranking spiegabile. L’operatore vede perché il paziente è stato proposto e può esercitare un override, ma deve motivarlo. Selezioniamo Matteo Rossini, che rispetta tutti i vincoli ed è in attesa da 45 giorni.',
    keyAction: 'Visualizza la spiegazione del ranking di Matteo Rossini, selezionalo e clicca "Procedi al Device Gate".'
  },
  {
    number: 7,
    title: 'Device Availability Gate',
    view: 'operations',
    activePatientId: 'PAT-1042',
    description: 'Il gateway di sicurezza biomedica e cyber. Stato: ALLOW WITH CONDITIONS.',
    spokenScript: 'Prima di inviare l’offerta verifichiamo la disponibilità reale del device. Non vogliamo recuperare capacità sulla carta per poi scoprire che la risorsa non può erogare la prestazione. Il device gate restituisce "Allow with conditions" a causa di patch e controlli di sicurezza. L’operatore richiede la verifica biomedicale e, soltanto dopo la conferma, autorizza l’offerta.',
    keyAction: 'Richiedi la verifica biomedicale, attendi il via libera e clicca su "Approva ed invia proposta".'
  },
  {
    number: 8,
    title: 'Invio Proposta al Candidato',
    view: 'operations',
    activePatientId: 'PAT-1042',
    description: 'Riepilogo e invio dell\'offerta di slot anticipato tramite canali multicanale.',
    spokenScript: 'Rivediamo il riepilogo della proposta. Il sistema utilizzerà canali push e SMS per garantire la massima tempestività. Clicchiamo su "Invia proposta al paziente" per spedire l\'offerta.',
    keyAction: 'Clicca su "Invia proposta al paziente" per cambiare lo stato in "Offerto".'
  },
  {
    number: 9,
    title: 'App Paziente: Accettazione',
    view: 'patient',
    activePatientId: 'PAT-2011', // Matteo Rossini
    description: 'Matteo Rossini visualizza la proposta di slot anticipato (33 giorni di anticipo!) e l\'accetta.',
    spokenScript: 'Il paziente riceve la proposta in tempo reale sulla sua app. Visualizza l\'anticipo ottenuto (33 giorni prima rispetto alla prenotazione originaria!) e decide di accettare il nuovo slot.',
    keyAction: 'Apri l\'offerta nella schermata di Matteo Rossini e clicca su "Accetta Proposta".'
  },
  {
    number: 10,
    title: 'Cockpit: Registrazione Outcome',
    view: 'operations',
    activePatientId: 'PAT-1042',
    description: 'Registrazione del check-in ed effettiva erogazione della prestazione recuperata.',
    spokenScript: 'Il paziente ha effettuato il check-in. Ora simuliamo il completamento clinico della prestazione. Clicchiamo su "Registra prestazione completata".',
    keyAction: 'Nel cockpit Operations, apri la vista Outcome e clicca su "Registra prestazione completata".'
  },
  {
    number: 11,
    title: 'KPI Aggiornati (North Star)',
    view: 'operations',
    activePatientId: 'PAT-1042',
    description: 'Aggiornamento della North Star Metric "Recovered Completed Appointments" da 24 a 25.',
    spokenScript: 'Infine registriamo la prestazione completata. È soltanto in questo momento che aggiorniamo la North Star Metric: lo slot è stato liberato, riassegnato e trasformato in una prestazione effettivamente erogata. Qui vediamo il recupero di capacità: non notifiche inviate, non click, ma prestazioni recuperate e completate.',
    keyAction: 'Verifica che il contatore delle prestazioni recuperate e completate sia salito a 25.'
  },
  {
    number: 12,
    title: 'Audit Trail & Chiusura',
    view: 'operations',
    activePatientId: 'PAT-1042',
    description: 'Log immutabili di audit completi che tracciano l\'intero processo decisionale e biomedico.',
    spokenScript: 'Ogni singola fase di questo processo — dalla cancellazione di Giulia all\'accettazione e completamento di Matteo — viene loggata immutabilmente nell\'Audit Trail. Questa trasparenza garantisce la conformità e la spiegabilità clinico-organizzativa del sistema. Questa demo non rappresenta ancora il prodotto finale. Rappresenta però con chiarezza il processo che il pilot deve validare: collegare dato, decisione, controllo umano e outcome. La piattaforma è il target; il pilot è la prova; il recupero di capacità è il beneficio.',
    keyAction: 'Esamina l\'audit trail completo e clicca su Reset Demo per ricominciare.'
  }
];

export const DemoPanel: React.FC<DemoPanelProps> = ({
  demoState,
  setDemoState,
  onAdvanceStep,
  onGoBackStep,
  onResetDemo,
  onFastForwardStep
}) => {
  const currentStepData = DEMO_STEPS.find(s => s.number === demoState.currentStep) || DEMO_STEPS[0];

  return (
    <div className="w-full lg:w-96 bg-white text-[#2E2E38] flex flex-col h-full border-l border-[#E5E7EB] select-none relative">
      {/* Panel Header */}
      <div className="p-4 bg-zinc-50 border-b border-[#E5E7EB] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#2E2E38]" />
          <div>
            <h3 className="font-extrabold tracking-tight text-xs uppercase text-[#2E2E38]">Demo Assistita</h3>
            <p className="text-[10px] text-zinc-500">SalusCare Resilience Guide</p>
          </div>
        </div>
        <button
          onClick={onResetDemo}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white text-zinc-600 hover:text-[#2E2E38] hover:bg-zinc-100 transition rounded-md border border-[#E5E7EB] font-bold"
          title="Ripristina Demo allo stato iniziale"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Progress indicators */}
      <div className="px-4 py-3 bg-zinc-50/50 border-b border-[#E5E7EB] flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
        {DEMO_STEPS.map(step => {
          const isCompleted = step.number < demoState.currentStep;
          const isActive = step.number === demoState.currentStep;
          return (
            <button
              key={step.number}
              onClick={() => onFastForwardStep(step.number)}
              className={`flex-1 min-w-[12px] h-1.5 rounded-full transition ${
                isActive ? 'bg-[#FFE600]' : isCompleted ? 'bg-emerald-500' : 'bg-zinc-200'
              }`}
              title={`Passa allo step ${step.number}: ${step.title}`}
            />
          );
        })}
      </div>

      {/* Main step details */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Step number badge & title */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-[#2E2E38] tracking-wider uppercase bg-[#FFE600]/25 px-2 py-0.5 rounded border border-[#FFE600]/40">
            Fase {currentStepData.number} di {DEMO_STEPS.length}
          </span>
          <h4 className="text-base font-extrabold text-[#2E2E38] tracking-tight">{currentStepData.title}</h4>
        </div>

        {/* View Badge */}
        <div className="flex items-center gap-2 py-1 px-2 rounded bg-zinc-100 text-xs text-zinc-600 w-fit font-semibold">
          <span className={`w-2 h-2 rounded-full ${currentStepData.view === 'patient' ? 'bg-sky-500' : 'bg-amber-500'}`} />
          <span>Schermata richiesta: <strong>{currentStepData.view === 'patient' ? 'App Paziente' : 'Operations Cockpit'}</strong></span>
        </div>

        {/* Technical Description */}
        <div className="bg-zinc-50 border border-[#E5E7EB] p-3 rounded-lg text-xs text-zinc-600 space-y-2">
          <div className="flex items-center gap-1.5 text-zinc-500 font-bold">
            <ShieldCheck className="w-4 h-4 text-[#2E2E38]" />
            <span>Cosa sta succedendo nel sistema:</span>
          </div>
          <p className="leading-relaxed font-medium text-zinc-700">{currentStepData.description}</p>
        </div>

        {/* SPOKEN SCRIPT (Very Important!) */}
        <div className="bg-yellow-500/5 border border-yellow-200 p-3.5 rounded-lg space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-zinc-700 uppercase">
            <span className="flex items-center gap-1"><Play className="w-3.5 h-3.5 text-[#2E2E38]" /> Script Parlato per il Relatore</span>
            <span className="text-[9px] text-zinc-400">Leggere durante la demo</span>
          </div>
          <p className="text-xs text-zinc-800 font-serif leading-relaxed italic select-all p-2 bg-white rounded border border-[#E5E7EB]">
            "{currentStepData.spokenScript}"
          </p>
        </div>

        {/* UI Action highlight */}
        <div className="bg-[#FFE600]/15 border-l-4 border-[#FFE600] p-3 rounded-r-lg space-y-1">
          <div className="text-[10px] uppercase font-bold text-zinc-500">Azione richiesta nel prototipo:</div>
          <p className="text-xs font-semibold text-zinc-800">{currentStepData.keyAction}</p>
        </div>
      </div>

      {/* Demo Controls Footer */}
      <div className="p-4 bg-zinc-50 border-t border-[#E5E7EB] flex flex-col gap-3">
        {/* Navigation buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onGoBackStep(demoState.currentStep - 1)}
            disabled={demoState.currentStep === 1}
            className="flex-1 py-2 px-3 text-xs font-bold bg-white text-zinc-600 hover:bg-zinc-100 hover:text-[#2E2E38] transition rounded-lg border border-[#E5E7EB] flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Indietro</span>
          </button>
          
          <button
            onClick={() => onAdvanceStep(demoState.currentStep + 1)}
            disabled={demoState.currentStep === DEMO_STEPS.length}
            className="flex-[2] py-2 px-4 text-xs font-bold bg-[#FFE600] text-[#2E2E38] hover:bg-yellow-400 transition rounded-lg flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-40"
          >
            <span>{demoState.currentStep === DEMO_STEPS.length ? 'Fine Demo' : 'Avanti'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Fast-Forward Assistance Toggle */}
        <div className="bg-white p-2.5 rounded-lg flex items-center justify-between text-xs border border-[#E5E7EB]">
          <div className="flex items-center gap-1.5 text-zinc-500 font-medium">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Forza stato automatico</span>
          </div>
          <button
            onClick={() => onFastForwardStep(demoState.currentStep)}
            className="text-[10px] text-[#2E2E38] hover:underline font-extrabold"
            title="Esegue automaticamente le azioni di questo step"
          >
            Simula Azione
          </button>
        </div>

        {/* Synthetic Data Disclaimer */}
        <div className="text-[9px] text-zinc-400 text-center leading-normal">
          Dati sintetici a solo scopo dimostrativo.<br />Non utilizzare in ambiti clinici reali.
        </div>
      </div>
    </div>
  );
};
