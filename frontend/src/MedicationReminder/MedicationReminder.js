import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ReminderCard } from '../components/reminderCard';
import Header from '../Header';  // Import the Header component
import "./MedicationReminder.css"
import "bootstrap/dist/css/bootstrap.css"

function MedicationReminder() {
  const [formData, setFormData] = useState({
    'drug': '',
    'duration': '',
    'durationUnit': 'hours'
  });

  const [reminderList, setReminderList] = useState([]);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/log-in');
      return;
    }

    axios.get('http://localhost:3004/api/reminders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log("Fetched reminders:", response.data);
      setReminderList(response.data);
    })
    .catch((error) => {
      console.error('Error fetching reminders:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    });
  }, [navigate]);

  const onInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const deleteReminder = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3004/api/reminders/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      setReminderList(reminderList.filter((reminder) => reminder._id !== id));
    })
    .catch((error) => {
      console.error('Error deleting reminder:', error);
    });
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('http://localhost:3004/api/reminders', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log("Server response:", response);
      setReminderList((prevReminderList) => [...prevReminderList, response.data]);
      console.log(reminderList);
      setFormData({ drug: '', duration: '', durationUnit: 'hours' });
      ref.current.reset();
    })
    .catch((error) => {
      console.error('Error adding reminder:', error);
    });
  };
 
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <div className="medication-reminder">
          <h1 className='main-heading'>Welcome to the medication reminder</h1>
          
          <div className='reminder-dialogue-box'>
            <form ref={ref} onSubmit={onSubmit} className="form form-floating">
              <div className='form-floating'>
                <input onChange={onInputChange} className='form_1 form-control' type="text" id="drug" name="drug" value={formData.drug} placeholder='Enter drug' required />
                <label htmlFor="drug" className='form-label'>Enter drug</label>
              </div>  
              <div className='form-floating'>
                <input onChange={onInputChange} className='form_2 form-control' id="duration" type="number" name="duration" value={formData.duration} placeholder='Enter duration' required />
                <label htmlFor="duration" className='form-label'>Enter duration</label>
              </div>
              <div className='form-floating'>
                <select onChange={onInputChange} className='form-control' id="durationUnit" name="durationUnit" value={formData.durationUnit} required>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
                <label htmlFor="durationUnit" className='form-label'>Duration Unit</label>
              </div>
              <button className="submit btn btn-lg" type="submit">Add Reminder</button>
            </form>
          </div>

          <div className='dashboard'>
            {reminderList.map((data) => (
              <ReminderCard key={data?._id} data={data} onDelete={() => deleteReminder(data?._id)}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicationReminder;