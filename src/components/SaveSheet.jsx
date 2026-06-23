export default function SaveSheet({ week, day, plan, date, onDateChange, onConfirm, onCancel }) {
  return (
    <div className="overlay show" onClick={e => { if (e.currentTarget === e.target) onCancel(); }}>
      <div className="sheet">
        <h3>Session speichern</h3>
        <p>Woche {week} · Tag {day} ({plan.label})</p>
        <label htmlFor="sheetDate">Datum des Trainings</label>
        <input
          type="date" id="sheetDate"
          value={date}
          onChange={e => onDateChange(e.target.value)}
        />
        <div className="sheet-actions">
          <button className="btn-ghost" onClick={onCancel}>Abbrechen</button>
          <button className="btn-primary" onClick={onConfirm}>Im Verlauf speichern</button>
        </div>
      </div>
    </div>
  );
}
