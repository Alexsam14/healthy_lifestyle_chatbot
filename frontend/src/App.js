import './App.css';
import Chatbot from './Chatbot/Chatbot';
import MedicationReminder from './MedicationReminder/MedicationReminder';
import SignIn from './components/sign-in';
import Register from './components/register-account';
import About from './components/about-page';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


const Main = () => {
  const navigate = useNavigate();

  return (
    <main>
      <h2 className='main-title'>Welcome to Healthy Lifestyle Chatbot</h2>
      <div className='main-actions'>
        <button 
          onClick={() => navigate('/Chatbot')}
        >
          Chatbot
        </button>
        <button 
          onClick={() => navigate('/medication-reminder')}
        >
          Medication Reminder
        </button>
        <button 
          onClick={() => navigate('/sign-in')}
        >
          Sign-In
        </button>
        <button 
          onClick={() => navigate('/about-us')}
        >
          About Us
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
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-in/register" element={<Register />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
    </Router>
  );
}


export default App;
