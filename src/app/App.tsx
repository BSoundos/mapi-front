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
import DiscussionsPage from '@/pages/discussions/Discussions';
import UserProfilSetting from '@/pages/UserSettings/UserProfilSetting';
import UserSecuritySettings from '@/pages/UserSettings/UserSecuriteSettings';
import ProviderProfilSetting from '@/pages/UserSettings/ProviderProfilSetting';
import ProviderSecuritySettings from '@/pages/UserSettings/ProviderSecuriteSettings';
import ProviderRoutes from './ProviderRoutes';
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
        <Route path='api' element={<Api/>} >
          <Route index element={<ApiAbout />} />
          <Route path='about/:id' element={<ApiAbout />} />
          <Route path='endpoint/:id' element={<Endpoints />} />
          <Route path='documentation/:id' element={<Documentation />} />
          <Route path='pricing/:id' element={<Pricing />} />
          <Route path='support/:id' element={<Support />} />
          <Route path="discussions/:id" element={<DiscussionsPage />} />
          <Route path="discussions/:id/:iddis" element={<DiscussionDetailsPage />} />
          <Route path="payment/Plans/:id" element={<SubscriptionPlansPage/>} />
          <Route path="payment/Plans/:id/per-month/plan/:planId" element={<PlanDetailsPage />} />
          <Route path="payment/Plans/:id/per-use/plan/:planId" element={<PlanDetailsPerusePage  />} />
        </Route>
        <Route path="/accesskey/:apiVersion/:planId/:typeplan" element={<GeneratingAccessKeyPage />} />
        <Route path="apis" element={<MainPage />} />
        <Route path="/userProfileSettings" element={<UserProfilSetting/>}/>
        <Route path="/userSecuritySettings" element={<UserSecuritySettings/>}/>
       

        {/* Pricing & Payment */}
        <Route path="plan" element={<SubscriptionPlansPage />} />
        <Route path="payment-per-use/subscriptionPlans/:apiVersion/plan/:planId" element={<PlanDetailsPerusePage />} />
        <Route path="payment-per-use/subscriptionPlans/:apiVersion" element={<SubscriptionPlansPerUsePage />} />
        <Route path="payment-per-month/subscriptionPlans/:apiVersion/plan/:planId" element={<PlanDetailsPage />} />
        <Route path="accesskey/:apiVersion/:planId" element={<GeneratingAccessKeyPage />} />
        <Route path="/SubscriptionsList" element={<SubscriptionListPage />} />

        {/* Authentication */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify/:username" element={<Verify />} />
        {/* Invoices */}
        <Route path="/Transaction-History" element={<InvoiceHistoryPage />} />
        <Route path="/Transaction_details/:id" element={<InvoiceDetails />} />
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
        <Route path="/providerProfileSettings" element={<ProviderProfilSetting/>}/>
        <Route path="/providerSecuritySettings" element={<ProviderSecuritySettings/>}/>
  

      </Routes>
    </Router>
  );
};


export default App;