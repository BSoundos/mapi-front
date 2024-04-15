import './App.css'
import './index.css';
import './styles/Paiement.css';

// App.tsx
import SubscriptionPlansPage from '../src/components/SubscriptionPlans';
import SubscriptionPlansPerUsePage from '../src/components/SubscriptionPlansPerUse';

import PlanDetailsPage from '../src/components/subscriptionPlanPayment';
import GeneratingAccessKeyPage  from '../src/components/GeneratingAcceeskey';
import PlanDetailsPerusePage from '../src/components/SubscriptionPlan-peruse-Payment';
import Invoices from './components/InvoicesHistory';
import InvoiceDetails from './components/InvoiceDetails';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

const App = () => {




  
  return (
    <Router>
      <Routes>
        <Route path="payment-per-month/subscriptionPlans/:apiVersion" element={<SubscriptionPlansPage />} />
        <Route path="payment-per-use/subscriptionPlans/:apiVersion" element={<SubscriptionPlansPerUsePage />} />
        <Route path="payment-per-month/subscriptionPlans/:apiVersion/plan/:planId" element={<PlanDetailsPage />} />
        <Route path="payment-per-use/subscriptionPlans/:apiVersion/plan/:planId" element={<PlanDetailsPerusePage />} />
        <Route path="/accesskey/:apiVersion/:planId" element={<GeneratingAccessKeyPage />} />
        <Route path="/Transaction_history" element={<Invoices />} />
        <Route path="/Transaction_details" element={<InvoiceDetails />} />
      
      </Routes>
    </Router>
  );
};


export default App;