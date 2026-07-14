import React from 'react';
import { Activity, ShieldCheck, Landmark, Monitor, Smartphone, HelpCircle, User, Layers } from 'lucide-react';
import { DemoState } from '../types';

interface HeaderProps {
  demoState: DemoState;
  setDemoState: React.Dispatch<React.SetStateAction<DemoState>>;
  showDemoPanel: boolean;
  setShowDemoPanel: (show: boolean) => void;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  demoState,
  setDemoState,
  showDemoPanel,
  setShowDemoPanel,
  onResetDemo
}) => {
  const toggleView = (view: 'patient' | 'operations') => {
    // Determine target patient ID based on the step or selected view
    let activePatientId = 'PAT-1042'; // Giulia Bianchi
    if (view === 'patient' && demoState.currentStep >= 9) {
      activePatientId = 'PAT-2011'; // Matteo Rossini receives the offer
    }

    setDemoState(prev => ({
      ...prev,
      view,
      activePatientId
    }));
  };

  return (
    <header className="bg-white text-[#2E2E38] border-b border-[#E5E7EB] h-16 px-4 md:px-6 flex items-center justify-between shrink-0 select-none">
      {/* Brand & Solution Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#2E2E38] rounded-lg flex items-center justify-center text-[#FFE600] font-black">
          <Activity className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-base text-[#2E2E38]">SalusCare</span>
            <span className="bg-[#FFE600] text-[#2E2E38] font-bold text-[9px] px-1.5 py-0.5 rounded leading-none">DEMO</span>
          </div>
          <span className="text-[10px] text-zinc-500 tracking-wider font-semibold uppercase">Smart Access & Resilience</span>
        </div>
      </div>

      {/* Primary View Switcher */}
      <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200">
        <button
          onClick={() => toggleView('patient')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
            demoState.view === 'patient'
              ? 'bg-[#FFE600] text-[#2E2E38] shadow-sm'
              : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/50'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span className="hidden sm:inline">📱 Vista Paziente</span>
        </button>
        <button
          onClick={() => toggleView('operations')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
            demoState.view === 'operations'
              ? 'bg-[#FFE600] text-[#2E2E38] shadow-sm'
              : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/50'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span className="hidden sm:inline">🖥️ Vista Operations</span>
        </button>
      </div>

      {/* Right Actions: Persona, Synthetic Badge, Demo Guide Toggle */}
      <div className="flex items-center gap-3">
        {/* Active Persona Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-600">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-zinc-400">Ruolo:</span>
          <span className="font-semibold text-zinc-700">
            {demoState.view === 'patient'
              ? (demoState.activePatientId === 'PAT-1042' ? 'Giulia Bianchi (Paziente)' : 'Matteo Rossini (Paziente)')
              : 'Marco Rinaldi (Ops Coordinator)'}
          </span>
        </div>

        {/* Demo Guide Toggle */}
        <button
          onClick={() => setShowDemoPanel(!showDemoPanel)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold border transition ${
            showDemoPanel
              ? 'bg-yellow-500/10 text-[#2E2E38] border-[#FFE600] hover:bg-yellow-500/20'
              : 'bg-white text-zinc-600 border-zinc-200 hover:text-[#2E2E38] hover:bg-zinc-50'
          }`}
          title="Mostra/Nascondi Assistente di Demo"
        >
          <Layers className="w-4 h-4" />
          <span>Guida Demo</span>
        </button>

        {/* Synthetic Disclaimer Badge */}
        <div className="hidden md:flex items-center gap-1 bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Dati Sintetici</span>
        </div>
      </div>
    </header>
  );
};
