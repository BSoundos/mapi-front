// store.ts
import { configureStore } from '@reduxjs/toolkit';
import subscriptionPlansReducer from '../components/slices/subscriptionPlansSlice';
import subscriptionPlansPerUseReducer from '../components/slices/subscriptionPlansPerUseSlice';
import navigationReducer from '../components/slices/selectedPlanSlice';
import planReducer from '../components/slices/selectedPlanSlice';
import planPerUseReducer from '../components/slices/selectedPlanPerUseSlice';

import paymentReducer from '../components/slices/paymentMethodSlice';
import confirmPaymentReducer from '../components/slices/paymentSlice';
import generateAccessKeyReducer from '../components/slices/generateAccessKeySlice';
import invoicesReducer from '../components/slices/invoiceSlice';


import apipopularReducer from '../components/slices/ApiSlice';
import AboutReducer from '../components/slices/AboutSlice';
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
