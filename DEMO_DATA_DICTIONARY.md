# SALUSCARE SMART ACCESS & RESILIENCE — DEMO DATA DICTIONARY
> **Dati sintetici a scopo dimostrativo.** Piattaforma di ottimizzazione della capacità sanitaria per SalusCare Group S.p.A.

Questo documento definisce la struttura dati, le metriche chiave e gli stati dei flussi di lavoro implementati nel prototipo dimostrativo.

---

## 1. METRICHE E INDICATORI DI PERFORMANCE (KPI)

### North Star Metric ⭐: Recovered Completed Appointments
* **Definizione**: Numero assoluto di prestazioni sanitarie erogate che provengono dal circuito di ottimizzazione della capacità residua (recupero slot vacanti).
* **Regola di Calcolo**: Un'appuntamento conta come recuperato soltanto se:
  1. Uno slot pre-esistente viene liberato a seguito di disdetta anticipata o richiesta di riprogrammazione;
  2. Viene assegnato a un nuovo paziente compatibile in lista d'attesa tramite ranking spiegabile;
  3. Il paziente accetta formalmente la proposta di anticipo;
  4. La prestazione viene effettivamente erogata (Check-In) e completata.
* **Valore di Baseline**: 24 prestazioni completate.
* **Valore Post-Workflow**: 25 prestazioni completate (innalzamento dinamico dopo l'accettazione e completamento del flusso di Matteo Rossini).

### Recovery Completion Rate (%)
* **Definizione**: Tasso percentuale di conversione degli slot liberati in prestazioni effettivamente recuperate e completate.
* **Formula**: `(Recovered Completed Appointments / Totale Slot Liberati) * 100`
* **Valore di Baseline**: `(24 / 46) * 100 = 52.2%`
* **Valore Post-Workflow**: `(25 / 46) * 100 = 54.3%` (ricalcolo in tempo reale)

### Valore Economico Netto Recuperato (Proxy Value)
* **Definizione**: Somma dei valori economici proxy (basati su rimborsi regionali / tariffe private) associati esclusivamente alle prestazioni recuperate e completate con successo.
* **Valore di Baseline**: 6.420 €
* **Valore Post-Workflow**: 6.800 € (+380 € derivanti dalla risonanza magnetica di Matteo Rossini completata con successo).

---

## 2. STATI DELL'APPUNTAMENTO / SLOT (`AppointmentStatus`)

I flussi di ottimizzazione prevedono una transizione di stato rigida e monitorabile:

| Stato | Significato Operativo |
| :--- | :--- |
| `Confermato` | L'appuntamento è confermato dal paziente originale; sala e macchinari sono prenotati. |
| `In attesa di conferma` | Il paziente originale deve ancora confermare la convocazione (es. Giulia Bianchi all'inizio). |
| `A rischio` | Il paziente non ha risposto a ripetuti reminder automatici; lo slot è sotto attenta osservazione del coordinatore. |
| `Liberato` | Il paziente originale ha disdetto o richiesto un rinvio; lo slot è vuoto ed è disponibile per il riutilizzo. |
| `Candidate search` | L'operatore ha avviato l'algoritmo di matching e il sistema sta calcolando il ranking dei pazienti idonei. |
| `Offerto` | È stata spedita una notifica push / SMS al primo candidato in graduatoria (Matteo Rossini). |
| `Accettato` | Il candidato ha accettato formalmente l'offerta di anticipo; l'agenda è stata riscritta. |
| `Completato` | Il paziente ha effettuato la visita; il valore economico viene contabilizzato e la North Star Metric aumenta di 1. |
| `Bloccato dal device gate` | Lo slot è congelato a causa di allarmi cyber o manutenzioni bloccanti del macchinario associato. |

---

## 3. PARCO DISPOSITIVI MEDICALI (`Device`)

Il prototipo integra 6 dispositivi medicali fittizi distribuiti su 3 sedi del gruppo:

1. **RM-001 (Risonanza Magnetica 3 Tesla - Milano Centro)**:
   * *Ruolo nella demo*: Dispositivo target associato all'appuntamento di Giulia Bianchi e Matteo Rossini.
   * *Postura Cyber*: Inizialmente in allarme (ALERT) con patch non conformi e scansioni di porte IP non autorizzate rilevate dall'Intrusion Detection System (IDS).
   * *Gate*: `ALLOW WITH CONDITIONS` (richiede verifica biomedicale urgente prima dello sblocco).
2. **RM-002 (Risonanza Magnetica 1.5 Tesla - Milano Nord)**: Stato `ONLINE`, uptime 98.9%.
3. **TAC-001 (Tomografia 128 Strati - Milano Nord)**: Stato `ONLINE`, uptime 99.1%.
4. **ECO-001 (Ecolaser HD Doppler Premium - Monza)**: Stato `ONLINE`, uptime 99.8%.
5. **RX-001 (Ortoclinostato Digitale RX-90 - Milano Centro)**: Stato `ONLINE`, uptime 98.5%.
6. **MAMMO-001 (Mammografo con Tomosintesi Hologic - Monza)**: Stato `ONLINE`, uptime 97.8%.

---

## 4. CODICI EVENTO DELL'AUDIT TRAIL (`AuditEvent`)

Tutti gli eventi significativi registrati nel registro di audit immutabile utilizzano codifiche standard:

* `appointment_created`: Creazione iniziale dell'appuntamento nel sistema CUP.
* `confirmation_requested`: Invio del reminder automatico di convocazione al paziente.
* `confirmation_received`: Ricezione della conferma positiva da parte del paziente.
* `slot_released`: Rilascio anticipato dello slot a seguito di disdetta o rinvio.
* `candidate_search_started`: Avvio manuale o automatico del motore di matching.
* `candidate_ranked`: Generazione del ranking pesato dei candidati in lista d'attesa.
* `device_gate_evaluated`: Valutazione automatica dell'integrità del dispositivo medico.
* `biomedical_check_requested`: Richiesta d'urgenza di un controllo biomedicale manuale.
* `biomedical_check_completed`: Esito positivo della verifica tecnica biomedicale (sblocco del gate).
* `operator_decision`: Approvazione formale dell'operatore human-in-the-loop per l'invio dell'offerta.
* `offer_sent`: Spedizione dell'offerta di slot anticipato sui canali digitali (push/SMS).
* `offer_accepted`: Accettazione formale dell'offerta da parte del paziente ricevente.
* `slot_reassigned`: Riallocazione formale e riscrittura dell'agenda CUP.
* `patient_checked_in`: Check-In del paziente presso il desk di accettazione della clinica.
* `appointment_completed`: Completamento clinico della prestazione (chiusura del workflow).
* `value_measured`: Misurazione finale del beneficio economico proxy generato.
