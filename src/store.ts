// store.ts
import { configureStore } from '@reduxjs/toolkit';
import subscriptionPlansReducer from './components/slices/subscriptionPlansSlice';
import navigationReducer from './components/slices/selectedPlanSlice';
import planReducer from './components/slices/selectedPlanSlice';
import paymentReducer from './components/slices/paymentMethodSlice';
import confirmPaymentReducer from './components/slices/paymentSlice';
const store = configureStore({
  reducer: {
    subscriptionPlans: subscriptionPlansReducer,
    navigation: navigationReducer,
    plan: planReducer, 
    payment: paymentReducer,
    confirmpPayment: confirmPaymentReducer,
    // Autres reducers...
  },
});

export type RootState = ReturnType<typeof store.getState>; // Définition de RootState ici
export default store;
