// App.tsx
import SubscriptionPlansPage from '../src/components/SubscriptionPlans';
import PlanDetailsPage from '../src/components/subscriptionPlanPayment';
import MainPage from '../src/components/mainpage';
import AboutPage from './components/AboutPage';
import NavBar2 from './components/NavBar2';
import AjouterReview from './components/AjouterReview';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

const App = () => {
   const data = {}
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/about/:id' element={<AboutPage/>}/>
        <Route path="/plan" element={<SubscriptionPlansPage />} />
        <Route path="/" element={<NavBar2 data={data} />} />         
        <Route path="/plan/:id" element={<PlanDetailsPage />} />
        <Route path="/ajouterreview" element={<AjouterReview  />} />

        
      </Routes>
    </Router>
  );
};


export default App;