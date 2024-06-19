import React, { useState, useRef } from 'react';
import { ReminderCard } from '../components/reminderCard';
import "./MedicationReminder.css"

const dbReminders = [
  {'drug': 'paracetamol', 'duration': 19},
  {'drug': 'insulin', 'duration': 3},
]

function MedicationReminder() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');
  const [formData, setFormData] = useState({
    'drug': 'example drug',
    'duration': 7
  });

  const [reminderList, setReminderList] = useState([]);

  const ref = useRef();

  // Load initial reminders from dbReminders when component mounts
  useState(() => {
    // api call: could use axios or fetch()
    setReminderList(dbReminders);
  }, []);

  const addReminder = () => {
    setReminders([...reminders, newReminder]);
    setNewReminder('');
  };

  const onInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // Update reminderList with current formData
    setReminderList(prevReminderList => [...prevReminderList, formData]);
  }

  return (
    <div className="medication-reminder">
      <h1 className='main-heading'>Welcome to the medication reminder</h1>
      
      <div className='reminder-dialogue-box'>
        <form ref={ref} className='forms' onSubmit={onSubmit}>
          <input onChange={onInputChange} className='form_1' type="text" name="drug" placeholder={formData.drug} required />
          <input onChange={onInputChange} className='form_2' type="number" name="duration" placeholder={formData.duration + ' hours'} required />
          <input className="submit" type="submit" value="Submit" />
        </form>

        <div className='checkbox-container'>
          {/* Checkbox inputs */}
        </div>
      </div>

      <div className='dashboard'>
        {reminderList.map((data, index) => (
          <ReminderCard key={index} drug={data.drug} duration={data.duration} />
        ))}
      </div>

      <footer>
        <p>&copy; 2024 My Website</p>
      </footer>
    </div>
  );
}

export default MedicationReminder;
