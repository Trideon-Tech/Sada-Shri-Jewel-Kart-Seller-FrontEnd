import './App.css';
import LandingPage from './components/LandingPage.jsx'
import { useNavigate,Routes,Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <button onClick={() => navigate(-1)}>go back</button>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route path="*" element={<LandingPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
