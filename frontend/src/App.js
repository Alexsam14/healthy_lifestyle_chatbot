import './App.css';
import Chatbot from './Chatbot/Chatbot';
import MedicationReminder from './MedicationReminder/MedicationReminder';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


const Main = () => {
  const navigate = useNavigate();

  return (
    <main>
      <h2 className='main-title'>Welcome to Healthy Lifestyle Chatbot</h2>
      <div className='main-actions'>
        <button 
          onClick={() => navigate('/chatbot')}
        >
          Chatbot
        </button>
        <button 
          onClick={() => navigate('/medication-reminder')}
        >
          Medication Reminder
        </button>
      </div>
    </main>
  );
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/medication-reminder" element={<MedicationReminder />} />
      </Routes>
    </Router>
  );
}


export default App;
