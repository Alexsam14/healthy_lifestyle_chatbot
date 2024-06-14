// src/components/MedicationReminder.js
import React, { useState } from 'react';

function MedicationReminder() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  const addReminder = () => {
    setReminders([...reminders, newReminder]);
    setNewReminder('');
  };

  return (
    <div className="medication-reminder">
      <h2>Medication Reminder</h2>
      <ul>
        {reminders.map((reminder, index) => (
          <li key={index}>{reminder}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newReminder}
        onChange={(e) => setNewReminder(e.target.value)}
        placeholder="Add a new reminder..."
      />
      <button onClick={addReminder}>Add Reminder</button>
    </div>
  );
}

export default MedicationReminder;
