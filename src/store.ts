// store.ts
import { configureStore } from '@reduxjs/toolkit';
import subscriptionPlansReducer from '../src/components/features/payments/subscriptionPlansSlice';
import subscriptionPlansPerUseReducer from '../src/components/features/payments/subscriptionPlansPerUseSlice';
import navigationReducer from '../src/components/features/payments/selectedPlanSlice';
import planReducer from '../src/components/features/payments/selectedPlanSlice';
import planPerUseReducer from '../src/components/features/payments/selectedPlanPerUseSlice';

import paymentReducer from '../src/components/features/payments/paymentMethodSlice';
import confirmPaymentReducer from '../src/components/features/payments/paymentSlice';
import generateAccessKeyReducer from '../src/components/features/payments/generateAccessKeySlice';
import invoicesReducer from '../src/components/features/invoices/invoiceSlice';
import invoiceDReducer from '../src/components/features/invoices/invoiceSlice';

const store = configureStore({
  reducer: {
    subscriptionPlans: subscriptionPlansReducer,
    subscriptionPlansPerUse: subscriptionPlansPerUseReducer,
    navigation: navigationReducer,
    plan: planReducer,
    plan_peruse: planPerUseReducer, 
    payment: paymentReducer,
    confirmpPayment: confirmPaymentReducer,
    accesskey : generateAccessKeyReducer,
    invoiceHistory: invoicesReducer,
    invoiceDetail: invoiceDReducer,
    // Autres reducers...
  },
});

export type RootState = ReturnType<typeof store.getState>; // Définition de RootState ici
export default store;
