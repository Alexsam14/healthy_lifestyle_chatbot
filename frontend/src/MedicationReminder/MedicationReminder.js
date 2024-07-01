import React, { useState, useRef, useEffect} from 'react';
import axios from "axios";
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
    'drug': '',
    'duration': ''
  });

  const [reminderList, setReminderList] = useState([]);

  const ref = useRef();

  useEffect(() => {
    axios.get('/api/reminders')
      .then((response) => {
        setReminderList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reminders:', error);
      });
  }, []);

  /*
  useState(() => {
    // api call: could use axios or fetch()
    setReminderList(dbReminders);
  }, []);

  const addReminder = () => {
    setReminders([...reminders, newReminder]);
    setNewReminder('');
  };
  */

  const onInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  /*
  const deleteReminder = (index) => {
    setReminderList(reminderList.filter((_, i) => i !== index));
  };
  */

  const deleteReminder = (id) => {
    axios.delete(`/api/reminders/${id}`)
      .then(() => {
        setReminderList(reminderList.filter((reminder) => reminder._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting reminder:', error);
      });
  };

  /*
  const onSubmit = (e) => {
    e.preventDefault();
    // Update reminderList with current formData
    setReminderList(prevReminderList => [...prevReminderList, formData]);
  }
  */
  
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/reminders', formData)
      .then((response) => {
        setReminderList((prevReminderList) => [...prevReminderList, response.data]);
        setFormData({ drug: '', duration: '' }); // Reset form fields
        ref.current.reset();
      })
      .catch((error) => {
        console.error('Error adding reminder:', error);
      });
  };

  return (
    <div className="medication-reminder">
      <h1 className='main-heading'>Welcome to the medication reminder</h1>
      
      <div className='reminder-dialogue-box'>
        <form ref={ref} className='forms' onSubmit={onSubmit}>
          <input onChange={onInputChange} className='form_1' type="text" name="drug" value={formData.drug} placeholder='Enter drug'required />
          <input onChange={onInputChange} className='form_2' type="number" name="duration" value={formData.duration} placeholder='Enter duration in hours' required />
          <input className="submit" type="submit" value="Submit" />
        </form>

      </div>

      <div className='dashboard'>
        {reminderList.map((data) => (
          <ReminderCard key={data._id} drug={data.drug} duration={data.duration}  onDelete={() => deleteReminder(data._id)}/>
        ))}
      </div>

      <footer>
        <p>&copy; 2024 My Website</p>
      </footer>
    </div>
  );
}

export default MedicationReminder;
