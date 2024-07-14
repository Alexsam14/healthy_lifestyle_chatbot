import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import Chatbot from './Chatbot/Chatbot';
import MedicationReminder from './MedicationReminder/MedicationReminder';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import About from './components/about-page';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


const Main = () => {
  const navigate = useNavigate();

  return (
    <main>
      <h2 className='main-title text-center'>Welcome to Healthy Lifestyle Chatbot</h2>
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
       


      </div>
    </main>
  );
};


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/about-us" element={<About />} />
        <Route path="/log-in" element={<LogIn />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Main />} className = "change"/>
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/medication-reminder" element={<MedicationReminder />} />
        <Route path="/log-in/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}


export default App;
