// store.ts
import { configureStore } from '@reduxjs/toolkit';
import subscriptionPlansReducer from '../components/features/subscriptions/subscriptionPlansSlice';
import subscriptionPlansPerUseReducer from '../components/features/subscriptions/subscriptionPlansPerUseSlice';
import navigationReducer from '../components/features/subscriptions/selectedPlanSlice';
import planReducer from '../components/features/subscriptions/selectedPlanSlice';
import planPerUseReducer from '../components/features/subscriptions/selectedPlanPerUseSlice';

import paymentReducer from '../components/features/payments/paymentMethodSlice';
import confirmPaymentReducer from '../components/features/payments/paymentSlice';
import generateAccessKeyReducer from '../components/features/subscriptions/generateAccessKeySlice';
import invoicesReducer from '../components/features/invoices/invoiceSlice';


import apipopularReducer from '../components/features/apis/ApiSlice';
import AboutReducer from '../components/features/apis/AboutSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    subscriptionPlans: subscriptionPlansReducer,
    subscriptionPlansPerUse: subscriptionPlansPerUseReducer,
    navigation: navigationReducer,
    plan: planReducer,
    plan_peruse: planPerUseReducer,
    payment: paymentReducer,
    confirmpPayment: confirmPaymentReducer,
    accesskey: generateAccessKeyReducer,
    invoice: invoicesReducer,
    apipopular: apipopularReducer,
    AboutSlice: AboutReducer,
    // Autres reducers...
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
