
import './styles/Paiement.css';
// App.tsx
import SubscriptionPlansPage from '../src/components/SubscriptionPlans';
import PlanDetailsPage from '../src/components/subscriptionPlanPayment';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubscriptionPlansPage />} />
        <Route path="/plan/:id" element={<PlanDetailsPage />} />
      </Routes>
    </Router>
  );
};


export default App;