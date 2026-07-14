# SALUSCARE SMART ACCESS & RESILIENCE — SCREEN MAP
> **Dati sintetici a scopo dimostrativo.** Piattaforma di ottimizzazione della capacità sanitaria per SalusCare Group S.p.A.

Questo documento mappa tutte le schermate, viste e modali interattive sviluppate nel prototipo ad alta fedeltà, collegandole ai rispettivi obiettivi di business e attori della demo.

---

## AREA A — PATIENT APP / PORTALE PAZIENTE

### 1. Home Portale (`/patient`)
* **Persona**: Giulia Bianchi (`PAT-1042`) / Matteo Rossini (`PAT-2011`)
* **Obiettivo**: Offrire una porta digitale d'accesso semplificata ed evidenziare i prossimi appuntamenti clinici e gli avvisi urgenti.
* **Azioni Principali**:
  * Visualizzare il widget dinamico del prossimo appuntamento con lo stato di conferma in evidenza.
  * Navigare nei servizi digitali rapidi (Referti, Televisite, Pagamenti ticket).
  * Ricevere notifiche pop-up in evidenza (es. la proposta di anticipo per Matteo Rossini).
* **Collegamento al Workflow**: È l'entry point di Giulia Bianchi per liberare lo slot (Workflow 1, Step 2) e di Matteo Rossini per accettare la proposta (Workflow 2, Step 9).

### 2. Miei Appuntamenti (`/patient/appointments`)
* **Persona**: Giulia Bianchi
* **Obiettivo**: Fornire la lista storica e futura di tutte le prestazioni cliniche prenotate presso le strutture SalusCare.
* **Azioni Principali**:
  * Visualizzare specialità, prestazione, data, ora, sede e medico referente per ciascun esame.
  * Cliccare su un appuntamento per accedere alla scheda di dettaglio per la gestione.
* **Collegamento al Workflow**: Permette a Giulia di individuare la Risonanza Magnetica del 21 Luglio da gestire.

### 3. Dettaglio Appuntamento (`/patient/appointments/[id]`)
* **Persona**: Giulia Bianchi
* **Obiettivo**: Mostrare i dettagli logistici di convocazione e le preparazioni cliniche obbligatorie (es. digiuno o esami ematici propedeutici).
* **Azioni Principali**:
  * Cliccare su "Richiedi Riprogrammazione" per aprire il modulo di reschedule.
  * Cliccare su "Cancella Appuntamento" per annullare direttamente.
* **Collegamento al Workflow**: Avvia la transizione dello slot da "In attesa di conferma" a "Liberato" (Workflow 1, Step 3).

### 4. Modulo Riprogrammazione (`/patient/reschedule`)
* **Persona**: Giulia Bianchi
* **Obiettivo**: Consentire l'inoltro strutturato della richiesta di rinvio specificando motivazioni e preferenze di orario.
* **Azioni Principali**:
  * Selezionare la motivazione obbligatoria ("Impossibilità lavorativa").
  * Esprimere le preferenze di fascia oraria (Mattina / Pomeriggio).
  * Cliccare su "Inoltra Richiesta & Libera Slot" per rilasciare immediatamente la risorsa.
* **Collegamento al Workflow**: Esegue la transazione che libera la capacità nel cockpit di Operations (Workflow 1, Step 3 -> Step 4).

### 5. Proposta di Slot Anticipato (`/patient/offer`)
* **Persona**: Matteo Rossini (`PAT-2011`)
* **Obiettivo**: Presentare un'offerta di anticipo personalizzata a seguito del rilascio di uno slot compatibile, evidenziando il vantaggio temporale netto.
* **Azioni Principali**:
  * Visualizzare il confronto affiancato: Vecchia Data (18 Agosto) vs Nuova Data (21 Luglio).
  * Leggere il risparmio di tempo (28 giorni prima).
  * Cliccare su "Accetta Nuova Data" per confermare.
  * Cliccare su "Rifiuta" per mantenere l'appuntamento originario senza penalità.
* **Collegamento al Workflow**: Consente l'accettazione della proposta da parte di Matteo Rossini, aggiornando lo slot in "Accettato" (Workflow 2, Step 9).

---

## AREA B — OPERATIONS COCKPIT

### 6. Dashboard Direzionale (`/operations`)
* **Persona**: Marco Rinaldi (`Operations Coordinator`)
* **Obiettivo**: Monitorare l'efficienza complessiva della capacità, i KPI e l'aggiornamento della North Star Metric.
* **Azioni Principali**:
  * Analizzare la North Star Metric *Recovered Completed Appointments* (che sale da 24 a 25 al completamento del flusso).
  * Esaminare il funnel di conversione (Liberati -> Offerti -> Accettati -> Completati).
  * Controllare gli indicatori di avviso cyber e i reclami attivi del paziente.
* **Collegamento al Workflow**: Mostra lo stato di partenza (Step 1) e l'impatto economico/operativo finale del riallineamento (Step 11).

### 7. Gestione Slot (`/operations/slots`)
* **Persona**: Marco Rinaldi
* **Obiettivo**: Monitorare la totalità delle agende attive delle sedi (Milano Centro, Milano Nord, Monza) e individuare le anomalie e le disdette.
* **Azioni Principali**:
  * Filtrare la griglia per sede, specialità, stato del workflow e priorità.
  * Individuare lo slot rosso "Liberato" di Giulia Bianchi.
  * Cliccare sulla riga dello slot per avviare la procedura di riallocazione resiliente.
* **Collegamento al Workflow**: Evidenzia il cambio di stato dello slot da "Prenotato" a "Liberato" e apre l'accesso alla Control Room (Workflow 2, Step 4).

### 8. Scheda Slot Liberato (`/operations/slots/[id]`)
* **Persona**: Marco Rinaldi
* **Obiettivo**: Analizzare le caratteristiche tecniche ed economiche del posto vacante (ore di preavviso utile, valore proxy, referto richiesto).
* **Azioni Principali**:
  * Cliccare su "Trova candidati compatibili" per lanciare l'algoritmo di ranking.
* **Collegamento al Workflow**: Avvia la ricerca attiva dei candidati in lista d'attesa (Workflow 2, Step 5).

### 9. Ranking & Matching dei Candidati (`/operations/matching/[slotId]`)
* **Persona**: Marco Rinaldi
* **Obiettivo**: Presentare una graduatoria trasparente e spiegabile di 5 candidati ideali estratti dalla lista d'attesa.
* **Azioni Principali**:
  * Cliccare su "Visualizza spiegazione" per aprire il dettaglio dei reason codes.
  * Selezionare il candidato ottimale (Matteo Rossini).
  * Compilare la motivazione dell'override qualora si decida di selezionare un candidato diverso dal primo (scelta tutelata).
  * Cliccare su "Procedi al Device Availability Gate".
* **Collegamento al Workflow**: Esegue la selezione clinico-organizzativa del candidato ottimale (Workflow 2, Step 5 e Step 6).

### 10. Device Availability Gate (`/operations/device-gate/[slotId]`)
* **Persona**: Marco Rinaldi
* **Obiettivo**: Assicurare l'operatività tecnica e l'immunità cyber del dispositivo biomedico prima di inviare offerte esterne, bloccando preventivamente i canali in caso di allarmi critici.
* **Azioni Principali**:
  * Esaminare lo stato del gate (inizialmente in "Allow with conditions" per patch mancanti).
  * Cliccare su "Richiedi Verifica Biomedicale Urgente" (simulazione di un controllo biomedico manuale, che cambia lo stato in "ALLOW").
  * Cliccare su "Approva Proposta & Procedi" per sbloccare l'invio.
* **Collegamento al Workflow**: Garantisce la sicurezza tecnologica ed abilita la generazione dell'offerta (Workflow 2, Step 7).

### 11. Riepilogo Offerta (`/operations/offer/[slotId]`)
* **Persona**: Marco Rinaldi
* **Obiettivo**: Rivedere i dettagli logistici dell'offerta e determinare i canali di contatto.
* **Azioni Principali**:
  * Cliccare su "Invia proposta al paziente" per spedire la notifica e sbloccare l'azione nella Patient App.
* **Collegamento al Workflow**: Transiziona lo slot in stato "Offerto" e notifica il paziente Matteo Rossini (Workflow 2, Step 8).

### 12. outcome & Registrazione Chiusura (`/operations/outcome/[slotId]`)
* **Persona**: Marco Rinaldi
* **Obiettivo**: Eseguire la validazione amministrativa e clinica del completamento della prestazione recuperata.
* **Azioni Principali**:
  * Cliccare su "Registra prestazione completata" per validare l'esito.
* **Collegamento al Workflow**: Chiude il ciclo di recupero dello slot e incrementa la North Star Metric di SalusCare (Workflow 2, Step 10).

### 13. Parco Device & Cybersecurity (`/operations/devices`)
* **Persona**: Marco Rinaldi / Ingegneria Clinica
* **Obiettivo**: Offrire una panoramica dello stato di salute, uptime e cyber compliance di tutti i 6 dispositivi medici del gruppo.
* **Azioni Principali**:
  * Monitorare l'uptime dei singoli macchinari.
  * Controllare gli allarmi IDS per ciascun device (es. scansioni di porte su RM-001).

### 14. Registro Audit Trail (`/operations/audit`)
* **Persona**: Marco Rinaldi / Responsabile Compliance
* **Obiettivo**: Garantire la piena tracciabilità e immutabilità delle azioni compiute da operatori o automatismi.
* **Azioni Principali**:
  * Consultare l'elenco cronologico di eventi (da `appointment_created` a `value_measured`).
  * Ispezionare i reason codes registrati e le giustificazioni di override inserite.
