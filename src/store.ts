// store.ts
import { configureStore } from '@reduxjs/toolkit';
import subscriptionPlansReducer from './components/slices/subscriptionPlansSlice';
import navigationReducer from './components/slices/selectedPlanSlice';
import planReducer from './components/slices/selectedPlanSlice';
import paymentReducer from './components/slices/paymentMethodSlice';
import confirmPaymentReducer from './components/slices/paymentSlice';
import apipopularReducer from './components/slices/ApiSlice';
import AboutReducer from './components/slices/AboutSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    subscriptionPlans: subscriptionPlansReducer,
    navigation: navigationReducer,
    plan: planReducer, 
    payment: paymentReducer,
    confirmpPayment: confirmPaymentReducer,
    apipopular: apipopularReducer,
    AboutSlice: AboutReducer,
    // Autres reducers...
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>; 
export default store;
