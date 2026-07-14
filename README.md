# SALUSCARE SMART ACCESS & RESILIENCE
> **Dati sintetici a scopo dimostrativo.** Prototipo interattivo ad alta fedeltà della piattaforma di ottimizzazione e ottimizzazione degli slot sanitari per SalusCare Group S.p.A.

SALUSCARE SMART ACCESS & RESILIENCE è un prototipo cliccabile ad alta fedeltà progettato per dimostrare l'ottimizzazione e il recupero degli slot di prenotazione sanitari a seguito di cancellazioni o rinvii da parte dei pazienti, integrando il controllo di sicurezza biomedica (Device Gate) e assicurando la tracciabilità completa di tutte le decisioni (Audit Trail).

---

## 🚀 REQUISITI E INSTALLAZIONE rapida

L'applicazione è sviluppata in **React** con **Vite** e stilizzata interamente in **Tailwind CSS (v4)** con icone **Lucide Icons** e libreria di animazioni **Motion**.

### 1. Installazione delle dipendenze
Tutte le librerie necessarie sono dichiarate in `package.json` ed installate nel sandbox di esecuzione.
```bash
npm install
```

### 2. Avvio del server di sviluppo
Per lanciare la demo in modalità sviluppo locale con hot reload (sulla porta standard `3000` accessibile esternamente nel sandbox):
```bash
npm run dev
```

---

## 🧭 LA MODALITÀ "DEMO GUIDATA" & AUTOMAZIONE

Per garantire una presentazione fluida e a prova di errore davanti al top management, l'applicazione integra un **Pannello di Guida Demo** sulla destra:
1. **Navigazione Semplice**: I pulsanti *Avanti* e *Indietro* permettono di scorrere linearmente i **12 step chiave** del percorso clinico-organizzativo.
2. **Sincronizzazione Automatica delle Viste**: Avanzando con la guida, lo schermo centrale si sposterà automaticamente tra l'**App Paziente** (Giulia Bianchi o Matteo Rossini) e il **Cockpit di Operations**, impostando l'ID del paziente attivo corretto.
3. **Forzatura dello Stato ("Simula Azione")**: Se durante il pitch si commette un errore o si salta un passaggio manuale, il pulsante **"Simula Azione"** esegue istantaneamente le transizioni cumulative del database richieste per la fase corrente, sbloccando la demo.
4. **Pulsante Reset**: Il pulsante **"Reset"** ricarica istantaneamente il database fittizio ripristinando tutti i contatori e lo storico ai valori di baseline.

---

## 📁 STRUTTURA DEL PROGETTO

La base di codice è strutturata in modo modulare per favorire la leggibilità e la manutenibilità:

```text
/
├── DEMO_SCRIPT.md             # Script parlati per la demo (versione completa e rapida)
├── SCREEN_MAP.md              # Elenco e finalità operative di ciascuna schermata
├── DEMO_DATA_DICTIONARY.md    # Definizione delle metriche (KPI) e degli stati
├── PRESENTATION_CHECKLIST.md  # Checklist di preparazione pre-demo per il relatore
├── README.md                  # Questo file di istruzioni tecniche
├── package.json               # Dipendenze ed script NPM
├── metadata.json              # Configurazione e metadati della web application
├── index.html                 # Entrypoint HTML principale
├── src/
│   ├── main.tsx               # Inizializzatore React
│   ├── index.css              # File CSS globale con configurazione Tailwind CSS v4
│   ├── types.ts               # Dichiarazione delle interfacce TypeScript statiche
│   ├── data.ts                # Database sintetico (20 appuntamenti, 12 pazienti, 6 device, ecc.)
│   ├── App.tsx                # Gestione del routing e del database centrale della demo
│   └── components/
│       ├── Header.tsx         # Barra di navigazione superiore (View Switcher e Persona badge)
│       ├── DemoPanel.tsx      # Pannello laterale di assistenza per il presentatore (Guida Demo)
│       ├── PatientApp.tsx     # App mobile/responsive Giulia Bianchi e Matteo Rossini
│       └── OperationsCockpit.tsx # Console back-office (Dashboard, Slots, Device Fleet, Audit Log)
```

---

## 🛠️ SCELTE TECNICHE PRINCIPALI

1. **State Management Centralizzato in `App.tsx`**: Per consentire una sincronizzazione istantanea tra le azioni compiute nella *Patient App* e le informazioni visualizzate nel *Cockpit Operations*, l'intero database demo (es. stati degli appuntamenti, audit trail, allarmi) è gestito tramite uno stato React unificato passato ai sotto-componenti.
2. **Aesthetic Design "Corporate High-Contrast"**: Lo stile grafico rispetta l'identità del brand SalusCare con un'estetica professionale e rassicurante, incentrata su ampi spazi negativi, card pulite, badge di stato definiti e l'uso del giallo di accento in contrasto con un elegante grigio scuro antracite (`#2E2E38`).
3. **Device Availability Gate**: Progettato per mostrare come la sicurezza cyber impatti i flussi operativi biomedici. Permette di simulare un'autenticazione ed una verifica biomedicale bloccando preventivamente i canali in caso di fallimento o sbloccandoli solo a seguito del controllo.
4. **Algoritmo di Ranking Spiegabile**: Mostra chiaramente che la riallocazione degli slot non è una decisione automatica del computer, bensì un supporto decisionale per l'operatore (*Human-in-the-loop*), che rispetta la priorità clinica e l'anzianità di lista, consentendo l'override motivato registrato in audit.

---

## ⚠️ DISCLAIMER IMPORTANTE

Questo software è un **prototipo dimostrativo** sviluppato a scopo di presentazione commerciale e di validazione del concetto (*Proof of Concept*).
* **Non costituisce un dispositivo medico** o un software clinico certificato.
* **Non contiene dati sanitari reali** (tutti i dati sono generati in modalità sintetica e pseudonimizzati).
* Non è destinato all'utilizzo in ambienti clinici di produzione o per fini diagnostici reali.
* Non è associato ad alcun marchio o brand protetto.
