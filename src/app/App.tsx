import '@/styles/App.css'
import '@/styles/index.css';
import '@/styles/Paiement.css';

// App.tsx
import SubscriptionPlansPage from '../pages/payment/SubscriptionPlans';
import SubscriptionPlansPerUsePage from '../pages/payment/SubscriptionPlansPerUse';

import PlanDetailsPage from '../pages/payment/subscriptionPlanPayment';
import GeneratingAccessKeyPage from '../pages/payment/GeneratingAcceeskey';
import PlanDetailsPerusePage from '../pages/payment/SubscriptionPlan-peruse-Payment';
// import Invoices from './components/InvoicesHistory';
import InvoiceHistoryPage from '../pages/invoices/InvoicesHistory';
import InvoiceDetails from '../pages/invoices/InvoiceDetails';

import MainPage from '../pages/api_hub/mainpage';
import AboutPage from '../pages/api_hub/AboutPage';
// import AjouterReview from './components/AjouterReview';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/authentication/Login';
import { useEffect } from 'react';
import axios from 'axios';
import Register from '../pages/authentication/Register';
import Verify from '../pages/authentication/Verify';
import Home from '../pages/home/Home';




const App = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      // console.log(token)
    }
  }, []);


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="payment-per-month/subscriptionPlans/:apiVersion" element={<MainPage />} />
        <Route path='/about/:id' element={<AboutPage />} />
        <Route path="/plan" element={<SubscriptionPlansPage />} />
        <Route path="/apis" element={<MainPage />} />
        <Route path="payment-per-use/subscriptionPlans/:apiVersion" element={<SubscriptionPlansPerUsePage />} />
        <Route path="payment-per-month/subscriptionPlans/:apiVersion/plan/:planId" element={<PlanDetailsPage />} />
        <Route path="payment-per-use/subscriptionPlans/:apiVersion/plan/:planId" element={<PlanDetailsPerusePage />} />
        <Route path="/accesskey/:apiVersion/:planId" element={<GeneratingAccessKeyPage />} />


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:username" element={<Verify />} />

        <Route path="/Transaction_history" element={<InvoiceHistoryPage />} />
        <Route path="/Transaction_details" element={<InvoiceDetails />} />


        {/* <Route path="/ajouterreview" element={<AjouterReview />} /> */}


      </Routes>
    </Router>
  );
};


export default App;