// src/components/MedicationReminder.js
import React, { useState } from 'react';
import "./MedicationReminder.css"

function MedicationReminder() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  const addReminder = () => {
    setReminders([...reminders, newReminder]);
    setNewReminder('');
  };

  return (
    <div className="medication-reminder">
      <h1 className='main-heading'>Welcome to the medication
        reminder
      </h1>
      <div className='reminder-dialogue-box'>
        <form className='forms'>
        <input className='form_1' type="text" name="drugname" placeholder="Drug" required>
        </input>
        <input className='form_2' type="number" name="duration" placeholder='Reminder duration' required>
        </input>
        <input className="submit" type="submit" value="Submit">
        </input>
        </form>
      </div>

      <div className='dashboard'>

      </div>

      <footer>
        <p>&copy; 2024 My Website</p>
      </footer>

    </div>
  );
}

export default MedicationReminder;
