
import './index.css';
import './styles/Paiement.css';

// App.tsx
import SubscriptionPlansPage from '../src/components/SubscriptionPlans';
import SubscriptionPlansPerUsePage from '../src/components/SubscriptionPlansPerUse';

import PlanDetailsPage from '../src/components/subscriptionPlanPayment';
import GeneratingAccessKeyPage  from '../src/components/GeneratingAcceeskey';
import PlanDetailsPerusePage from '../src/components/SubscriptionPlan-peruse-Payment';

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
    if (token){
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
    
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="payment-per-month/subscriptionPlans/:apiVersion" element={<SubscriptionPlansPage />} />
        <Route path="payment-per-use/subscriptionPlans/:apiVersion" element={<SubscriptionPlansPerUsePage />} />
        <Route path="payment-per-month/subscriptionPlans/:apiVersion/plan/:planId" element={<PlanDetailsPage />} />
        <Route path="payment-per-use/subscriptionPlans/:apiVersion/plan/:planId" element={<PlanDetailsPerusePage />} />
        <Route path="/accesskey/:apiVersion/:planId" element={<GeneratingAccessKeyPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:username" element={<Verify />} />
        <Route path="/test" element={<ExampleComponent/>} />
      </Routes>
    </Router>
  );
};


export default App;