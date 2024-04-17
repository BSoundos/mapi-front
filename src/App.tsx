import './App.css'
import './index.css';
import './styles/Paiement.css';

// App.tsx
import SubscriptionPlansPage from '../src/components/SubscriptionPlans';
import SubscriptionPlansPerUsePage from '../src/components/SubscriptionPlansPerUse';

import PlanDetailsPage from '../src/components/subscriptionPlanPayment';
import GeneratingAccessKeyPage from '../src/components/GeneratingAcceeskey';
import PlanDetailsPerusePage from '../src/components/SubscriptionPlan-peruse-Payment';
// import Invoices from './components/InvoicesHistory';
import InvoiceHistoryPage from './components/InvoicesHistory';
import InvoiceDetails from './components/InvoiceDetails';

import MainPage from '../src/components/mainpage';
import AboutPage from './components/AboutPage';
import NavBar2 from './components/NavBar2';
import AjouterReview from './components/AjouterReview';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/authentication/Login';
import ExampleComponent from './components/authentication/test/ExampleComponent';
import { useEffect } from 'react';
import axios from 'axios';
import Register from './components/authentication/Register';
import Verify from './components/authentication/Verify';
import Home from './components/Home';




const App = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
  }, []);

  const data = {}





  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="payment-per-month/subscriptionPlans/:apiVersion" element={<MainPage />} />
        <Route path='/about/:id' element={<AboutPage />} />
        <Route path="/plan" element={<SubscriptionPlansPage />} />
        <Route path="/" element={<NavBar2 data={data} />} />
        <Route path="payment-per-use/subscriptionPlans/:apiVersion" element={<SubscriptionPlansPerUsePage />} />
        <Route path="payment-per-month/subscriptionPlans/:apiVersion/plan/:planId" element={<PlanDetailsPage />} />
        <Route path="payment-per-use/subscriptionPlans/:apiVersion/plan/:planId" element={<PlanDetailsPerusePage />} />
        <Route path="/accesskey/:apiVersion/:planId" element={<GeneratingAccessKeyPage />} />


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:username" element={<Verify />} />
        <Route path="/test" element={<ExampleComponent />} />

        <Route path="/Transaction_history" element={<InvoiceHistoryPage />} />
        <Route path="/Transaction_details" element={<InvoiceDetails />} />


        <Route path="/ajouterreview" element={<AjouterReview />} />


      </Routes>
    </Router>
  );
};


export default App;