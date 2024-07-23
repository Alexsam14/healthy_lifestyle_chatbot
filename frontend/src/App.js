import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import Chatbot from './Chatbot/Chatbot';
import MedicationReminder from './MedicationReminder/MedicationReminder';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import About from './components/about-page';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// Import the Header component
import Header from './Header';

const Main = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main>
        <div className="main-content">
          <h1 className="main-title">Welcome to Healthy Lifestyle Chatbot</h1>
          <p className="main-description">
            Discover a revolutionary new way to manage your health and lifestyle. Use our AI-powered chatbot to get personalized advice and set up medication reminders.
          </p>
          <div className="feature-boxes">
            <div className="feature-box">
              <button onClick={() => navigate('/main/chatbot')}>Chatbot</button>
              <p>Get personalized health advice and lifestyle recommendations from our AI-powered chatbot.</p>
            </div>
            <div className="feature-box">
              <button onClick={() => navigate('/main/medication-reminder')}>Medication Reminder</button>
              <p>Never miss a dose with our smart medication reminder system.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about-us" element={<About />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/chatbot" element={<Chatbot />} />
        <Route path="/main/medication-reminder" element={<MedicationReminder />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;