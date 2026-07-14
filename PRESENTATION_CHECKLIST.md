# SALUSCARE SMART ACCESS & RESILIENCE — PRESENTATION CHECKLIST
> **Dati sintetici a scopo dimostrativo.** Piattaforma di ottimizzazione della capacità sanitaria per SalusCare Group S.p.A.

Questa checklist è progettata per supportare il relatore prima e durante una sessione di presentazione dal vivo o di pitch della soluzione davanti al cliente SalusCare Group S.p.A.

---

## 1. SETUP AMBIENTE (10 Minuti prima della presentazione)

- [ ] **Avvio dell'applicazione**: Verificare che l'applicazione sia correttamente avviata e accessibile tramite URL.
- [ ] **Reset dello stato demo**: Cliccare sul pulsante **Reset** nel pannello di destra *Guida Demo* per riportare l'intero database e i contatori di KPI alla baseline originaria.
- [ ] **Risoluzione dello schermo e Zoom**:
  * Impostare lo zoom del browser al 100% (o 90% in schermi laptop da 13" per una panoramica ottimale).
  * Risoluzione ideale dello schermo: **1440×900** o superiore.
- [ ] **Browser Full-Screen**: Attivare la modalità schermo intero del browser (tasto F11 su Windows, Cmd+Ctrl+F su Mac) per nascondere schede e barre degli indirizzi ed eliminare distrazioni.
- [ ] **Connessione di rete**: L'applicazione funziona interamente in locale e offline, escludendo rischi di interruzione per instabilità di rete.

---

## 2. VERIFICA DEI WORKFLOW (Prima del pitch)

- [ ] **Test rapido di Workflow 1 (Disdetta)**:
  * Passare a Vista Paziente.
  * Cliccare su Gestisci Prenotazione -> Richiedi Riprogrammazione.
  * Verificare che lo stato dello slot cambi in "Liberato" nella vista Cockpit Operations.
- [ ] **Test rapido di Workflow 2 (Recupero)**:
  * Cliccare sullo slot liberato.
  * Cliccare su "Trova candidati compatibili".
  * Verificare che Matteo Rossini sia selezionabile e che compaia il Device Availability Gate.
  * Verificare che il controllo biomedicale sblocchi il gate in ALLOW.
  * Verificare che l'invio della proposta e l'accettazione nella vista di Matteo Rossini aggiornino lo slot in "Accettato".
  * Cliccare su "Registra completamento" e verificare che la North Star Metric salga a **25** e il beneficio a **6.800 €**.
- [ ] **Reset Finale**: Ricordarsi di rieseguire il **Reset** dopo i test rapidi prima che il cliente entri nella stanza!

---

## 3. SCENARIO DI PRESENTAZIONE CONSIGLIATO

### A. Percorso Completo (Raccomandato, 4 minuti)
*Seguire rigorosamente i 12 passi evidenziati nel pannello **Guida Demo** a destra.*
1. Presentare l'architettura di SalusCare, la dashboard e i KPI di partenza (24).
2. Spostarsi nella Patient App e illustrare la facilità d'uso del Portale Paziente per Giulia Bianchi.
3. Simulare la richiesta di riprogrammazione per "Impossibilità lavorativa" (Workflow 1).
4. Mostrare l'immediata ricezione del segnale nel Cockpit (Stato: Liberato).
5. Mostrare l'avvio del ranking spiegabile e illustrare i reason codes di Matteo Rossini.
6. Spiegare il concetto di "Override Motivato" a tutela del coordinatore sanitario.
7. Presentare il Device Availability Gate ed evidenziare l'allarme cyber su RM-001.
8. Simulare l'invio della proposta a Matteo.
9. Ricevere ed accettare la proposta nell'app di Matteo (Workflow 2, anticipo di 28 giorni).
10. Simulare il Check-In e registrare la prestazione come completata.
11. Evidenziare lo spostamento dei KPI (la North Star sale a 25) e il beneficio economico reale.
12. Mostrare la conformità e la tracciabilità delle azioni nell'Audit Log.

### B. Percorso Rapido (90 secondi)
*In caso di tempi estremamente ristretti (es. demo veloce durante una fiera o un allineamento executive).*
* **Passo 1**: Mostrare lo slot rosso liberato di Giulia Bianchi nella tabella.
* **Passo 2**: Cliccare "Trova candidati", selezionare Matteo, procedere al Device Gate.
* **Passo 3**: Cliccare "Verifica Biomedicale", approvare l'offerta ed inviarla.
* **Passo 4**: Accettare l'offerta nella Patient App e cliccare su "Registra completamento" in Cockpit.
* **Passo 5**: Mostrare l'aggiornamento dei KPI (la North Star sale a 25) nella Dashboard.

---

## 4. PIANO DI FALLBACK TECNICO

*Se durante la demo dal vivo il relatore dimentica una riga di codice, commette un errore di sequenza o il cliente richiede di saltare un passaggio:*
* **Azione di ripristino istantaneo**: Utilizzare il pulsante **"Simula Azione" (Forza stato automatico)** situato in fondo al pannello della Guida Demo di destra. Questo pulsante esegue istantaneamente tutte le transizioni di stato del database richieste per la fase attiva e sblocca la presentazione, indipendentemente dalle azioni compiute in precedenza.
* **Azione di emergenza**: Se si desidera saltare direttamente all'esito finale dei KPI aggiornati senza mostrare i singoli passaggi operativi, cliccare sulla barra dei pallini in cima alla Guida Demo per saltare direttamente alla **Fase 11**.
