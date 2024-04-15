
import './styles/Paiement.css';
// App.tsx
import SubscriptionPlansPage from '../src/components/SubscriptionPlans';
import PlanDetailsPage from '../src/components/subscriptionPlanPayment';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './components/authentication/Login';
import ExampleComponent from './components/authentication/test/ExampleComponent';
import { useEffect } from 'react';
import axios from 'axios';
import Register from './components/authentication/Register';
import Verify from './components/authentication/Verify';




const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubscriptionPlansPage />} />
        <Route path="/plan/:id" element={<PlanDetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:username" element={<Verify />} />
        <Route path="/test" element={<ExampleComponent/>} />
      </Routes>
    </Router>
  );
};


export default App;