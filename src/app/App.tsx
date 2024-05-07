import '@/styles/App.css'
import '@/styles/index.css';
import '@/styles/Paiement.css';

// App.tsx
import SubscriptionPlansPage from '@/pages/payment/SubscriptionPlans';
import SubscriptionPlansPerUsePage from '@/pages/payment/SubscriptionPlansPerUse';

import PlanDetailsPage from '@/pages/payment/subscriptionPlanPayment';
import GeneratingAccessKeyPage from '@/pages/payment/GeneratingAcceeskey';
import PlanDetailsPerusePage from '@/pages/payment/SubscriptionPlan-peruse-Payment';

import InvoiceHistoryPage from '@/pages/invoices/InvoicesHistory';
import InvoiceDetails from '@/pages/invoices/InvoiceDetails';

import MainPage from '@/pages/api_hub/mainpage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '@/pages/authentication/Login';
import { useEffect } from 'react';
import axios from 'axios';
import Register from '@/pages/authentication/Register';
import Verify from '@/pages/authentication/Verify';
import Home from '@/pages/home/Home';
import Api from '@/pages/api_hub/Api';
import ApiAbout from '@/pages/api_hub/ApiAbout';
import Endpoints from '@/pages/api_hub/Endpoints';
import Documentation from '@/pages/api_hub/Documentation';
import Pricing from '@/pages/api_hub/Pricing';
import Support from '@/pages/api_hub/Support';
import Discussions from '@/pages/discussions/Discussions';
import DiscussionDetailsPage from '@/pages/discussions/DiscusionDetails';
import SubscriptionListPage from '@/pages/Subscriptions/SubscriptionList';
import MyApis from '@/pages/apis_management/MyApis';
import VersionsApi from '@/pages/apis_management/VersionApi';
import GeneralApi from '@/components/apis_management/GeneralApi';
import PricingPublicApi from '@/pages/apis_management/PricingPublicApi';
import PricingPrivateApi from '@/pages/apis_management/PriningPrivateApi';
import Ticket from '@/pages/support_hub/Ticket';
import Discussion from '@/pages/support_hub/TicketDiscussionsPage';
import UserTicketsPage  from '@/pages/support_hub/userTickets';
import UserAddTicket  from '@/pages/support_hub/AddTicket';
import UserTicketDiscussionPage  from '@/pages/support_hub/userTicketDiscussion';

const App = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
  }, []);


  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        {/* Api Hub */}
        <Route path='api' element={<Api />} >
          <Route index element={<ApiAbout />} />
          <Route path='about' element={<ApiAbout />} />
          <Route path='endpoints' element={<Endpoints />} />
          <Route path='documentation' element={<Documentation />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='support' element={<Support />} />
        </Route>
        <Route path="apis" element={<MainPage />} />
        {/* Pricing & Payment */}
        <Route path="plan" element={<SubscriptionPlansPage />} />
        <Route path="payment-per-use/subscriptionPlans/:apiVersion/plan/:planId" element={<PlanDetailsPerusePage />} />
        <Route path="payment-per-use/subscriptionPlans/:apiVersion" element={<SubscriptionPlansPerUsePage />} />
        <Route path="payment-per-month/subscriptionPlans/:apiVersion" element={<MainPage />} />
        <Route path="payment-per-month/subscriptionPlans/:apiVersion/plan/:planId" element={<PlanDetailsPage />} />
        <Route path="accesskey/:apiVersion/:planId" element={<GeneratingAccessKeyPage />} />
        <Route path="/SubscriptionsList" element={<SubscriptionListPage />} />

        {/* Authentication */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify/:username" element={<Verify />} />
        {/* Invoices */}
        <Route path="Transaction_history" element={<InvoiceHistoryPage />} />
        <Route path="Transaction_details" element={<InvoiceDetails />} />
        <Route path="/Discussions/:apiId" element={<Discussions />} />
        <Route path="/DiscussionDetails/:discussionId" element={<DiscussionDetailsPage />} />

        {/* Ticket system */}
        <Route path="/Tickets" element={<Ticket />} />
        <Route path="/Discussions" element={<Discussion />} />
        <Route path="/TicketsDiscussions/:ticketId" element={<Discussion />} />
        <Route path="/userTickets" element={<UserTicketsPage />} />
        <Route path="/userAddTicket/:pk" element={<UserAddTicket />} />
        <Route path="/userDiscussions/:ticketId" element={<UserTicketDiscussionPage />} />


         {/* Provider Pages  */}
        
         <Route path="/my-apis" element={<MyApis />} />
        <Route path="/version-api/:id" element={<VersionsApi/>}/>
        <Route path="/general-api/:id" element={<GeneralApi/>}/>
        <Route path="/pricing-api/public/:id" element={<PricingPublicApi/>}/>
        <Route path="/pricing-api/private/:id" element={<PricingPrivateApi/>}/>


      </Routes>
    </Router>
  );
};


export default App;