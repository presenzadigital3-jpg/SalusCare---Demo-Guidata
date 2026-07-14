# SALUSCARE SMART ACCESS & RESILIENCE — SCRIPT DELLA PRESENTAZIONE
> **Dati sintetici a scopo dimostrativo.** Piattaforma di ottimizzazione della capacità sanitaria per SalusCare Group S.p.A.

Questo documento contiene due scenari parlati per guidare l'operatore o il relatore durante la presentazione dal vivo al top management del Gruppo SalusCare.

---

## VERSIONE A — FLOW COMPLETO (3:30 - 4:00 Minuti)
*Ideale per un comitato di approvazione del pilot o per un workshop tecnico-operativo.*

| Fase | Schermata | Azione nel Prototipo | Durata | Testo Esatto da Pronunciare / Messaggio Chiave |
| :--- | :--- | :--- | :---: | :--- |
| **1. Introduzione** | **Operations Cockpit** (Dashboard) | Mostrare i KPI iniziali (Recovered Completed Appointments = 24) | 30s | "Buongiorno a tutti. Oggi vi presentiamo il cuore operativo di SalusCare Smart Access & Resilience. Questa che vedete è la dashboard direzionale degli Operations. Notate la nostra North Star Metric di partenza: 24 prestazioni completate recuperate. Il nostro obiettivo non è semplicemente inviare notifiche, ma recuperare capacità sanitaria inutilizzata e misurare il beneficio reale solo quando la prestazione viene effettivamente completata. Passiamo ora alla vista del paziente." |
| **2. Accesso Paziente** | **Patient App** (Giulia Bianchi) | Selezionare Vista Paziente, mostrare l'appuntamento del 21 Luglio | 30s | "A questo punto il paziente apre l’app e trova il prossimo appuntamento. Non gli chiediamo soltanto di ricordarsi della visita: gli permettiamo di confermare, cancellare o richiedere una riprogrammazione attraverso un percorso semplice, trasparente e tracciabile, eliminando il classico no-show passivo." |
| **3. Cancellazione** | **Patient App** (Reschedule Form) | Cliccare su 'Richiedi Riprogrammazione', selezionare 'Impossibilità lavorativa' e inviare | 40s | "Qui il paziente comunica che non può presentarsi. Sceglie 'Impossibilità lavorativa'. Notate l'avviso: il sistema informa chiaramente che lo slot attuale verrà liberato immediatamente per fini di ottimizzazione. La cancellazione anticipata non è più soltanto un evento amministrativo: diventa un segnale operativo in tempo utile che libera capacità nel circuito." |
| **4. Slot Liberato** | **Operations Cockpit** (Slots Table) | Tornare a Vista Operations. Cliccare sulla riga rossa di Giulia Bianchi (APT-1042) | 35s | "Lo slot passa immediatamente nel cockpit Operations. Vediamo Giulia Bianchi (PAT-1042) con stato 'Liberato' e un preavviso utile di ben 168 ore. Il sistema rileva automaticamente la disponibilità e abilita la ricerca di un candidato ottimale. Clicchiamo sullo slot per entrare nella Control Room." |
| **5. Candidate Search** | **Cockpit** (Slot details) | Cliccare su 'Trova candidati compatibili' per caricare il ranking | 30s | "Il sistema non propone indiscriminatamente il primo paziente disponibile in lista: genera una lista compatibile che rispetta priorità clinica, giorni di attesa accumulati, sede sanitaria, autorizzazioni assicurative esistenti e vincoli logistici." |
| **6. Spiegazione Ranking** | **Cockpit** (Matching List) | Cliccare su 'Spiegazione' del primo candidato (Matteo Rossini), poi selezionarlo | 35s | "Qui rendiamo il ranking spiegabile. L’operatore vede perché il paziente è stato proposto: Matteo Rossini rispetta la priorità clinica alta, ha ben 45 giorni di attesa accumulati (superiore alla media P90) ed ha l'autorizzazione assicurativa valida. L'operatore potrebbe effettuare un override, ma per conformità dovrebbe motivarlo per iscritto. Selezioniamo Matteo e procediamo." |
| **7. Device Gate** | **Cockpit** (Device Gate) | Cliccare su 'Verifica Biomedicale' (attesa 1.5s), poi su 'Approva e Procedi' | 35s | "Prima di inviare l’offerta verifichiamo la disponibilità reale del device. Non vogliamo recuperare capacità sulla carta per poi scoprire che la risorsa non può erogare la prestazione. Il device gate restituisce inizialmente 'Allow with conditions' a causa di anomalie di rete. L’operatore richiede la verifica biomedicale d'urgenza e, soltanto dopo la conferma automatica dell'ingegneria, sblocca il gateway e autorizza l'offerta." |
| **8. Invio Proposta** | **Cockpit** (Proposal Send) | Cliccare su 'Invia proposta al paziente' | 20s | "Rivediamo il riepilogo della proposta. Il sistema utilizzerà canali push in app e SMS per garantire la massima tempestività di risposta, lasciando a Matteo una finestra di 3 ore per confermare prima di passare al candidato successivo. Inviamo la proposta." |
| **9. Accettazione** | **Patient App** (Matteo Rossini) | Passare a Vista Paziente (ora Matteo Rossini). Cliccare su 'Accetta Nuova Data' | 30s | "Matteo Rossini riceve la proposta in tempo reale sulla sua app. Visualizza l'anticipo ottenuto: ben 28 giorni prima rispetto al suo vecchio appuntamento del 18 Agosto! Con un semplice click accetta il nuovo slot. Il sistema sposta la sua agenda e libera il suo vecchio slot del 18 Agosto, innescando un circolo virtuoso di resilienza." |
| **10. Completamento** | **Operations Cockpit** (Outcome Screen) | Tornare a Cockpit, aprire la scheda Outcome dello slot e cliccare 'Registra completamento' | 25s | "Il paziente ha effettuato il check-in e completato la risonanza. Simuliamo ora il completamento clinico della prestazione. Clicchiamo su 'Registra prestazione completata'. Solo ora il workflow si chiude formalmente." |
| **11. KPI Aggiornati** | **Operations Cockpit** (Dashboard) | Andare su Dashboard e mostrare i KPI aggiornati (NSM = 25, Benefit = 6.800€) | 20s | "È soltanto in questo momento che aggiorniamo la North Star Metric: lo slot è stato liberato, riassegnato e trasformato in una prestazione effettivamente erogata. La nostra North Star sale a 25 e il beneficio economico netto a 6.800 €. Questa è la prova del valore recuperato." |
| **12. Audit Trail & Chiusura** | **Operations Cockpit** (Audit Tab) | Mostrare l'Audit Log con le nuove righe evidenziate in giallo | 20s | "Ogni singola fase — dalla cancellazione di Giulia al completamento di Matteo — viene loggata immutabilmente nell'Audit Trail per fini di compliance e spiegabilità. Questa demo rappresenta con chiarezza il processo che il pilot deve validare: collegare dato, decisione, controllo umano e outcome. La piattaforma è il target; il pilot è la prova; il recupero di capacità è il beneficio. Grazie." |

---

## VERSIONE B — DEMO RAPIDA (90 Secondi)
*Ideale per un elevator pitch o un passaggio veloce durante un meeting di allineamento.*

1. **Dashboard Iniziale (0 - 15s)**:
   * **Visualizzazione**: Cockpit Operations (Dashboard).
   * **Relazione**: *"Questo è il Cockpit di SalusCare. Monitoriamo in tempo reale la North Star Metric: ad oggi abbiamo 24 prestazioni completate recuperate su 46 slot liberate. Vediamo ora cosa succede quando si libera della capacità."*
2. **Slot Liberato (15s - 35s)**:
   * **Azione**: Cliccare su "📅 Ottimizzazione Slot", e selezionare lo slot rosso di Giulia Bianchi (`APT-1042`).
   * **Relazione**: *"Giulia Bianchi ha richiesto un rinvio per motivi di lavoro. Lo slot del 21 Luglio è ora 'Liberato' con 168 ore di preavviso. Clicco su 'Trova candidati compatibili' per attivare l'algoritmo di matching prioritario."*
3. **Ranking & Device Gate (35s - 65s)**:
   * **Azione**: Selezionare Matteo Rossini (Score 96%), cliccare su "Procedi al Device Gate", cliccare "Verifica Biomedicale" e poi "Approva ed invia proposta".
   * **Relazione**: *"Il sistema propone Matteo Rossini con uno score del 96% basato su priorità alta e 45 giorni in lista d'attesa. Verifichiamo il dispositivo RM-001 tramite il Device Gate: è 'Allow with conditions' per anomalie cyber minori. Effettuiamo un controllo biomedicale d'urgenza, otteniamo il via libera ed inviamo l'offerta."*
4. **Accettazione & Outcome (65s - 90s)**:
   * **Azione**: Passare alla Vista Paziente, cliccare "Accetta Nuova Data" per Matteo Rossini, poi tornare al Cockpit, e cliccare "Registra prestazione completata".
   * **Relazione**: *"Matteo riceve la notifica e accetta l'anticipo di 28 giorni. Effettuato il check-in clinico, registriamo la prestazione come completata. Notate la Dashboard: la nostra North Star Metric sale istantaneamente a 25 e il valore recuperato aumenta di 380 €. Abbiamo convertito uno slot perso in salute erogata."*
