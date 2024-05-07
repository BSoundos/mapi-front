// store.ts
import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/components/features/authentication/authSlice';

import subscriptionPlansReducer from '@/components/features/subscriptions/subscriptionPlansSlice';
import subscriptionPlansPerUseReducer from '@/components/features/subscriptions/subscriptionPlansPerUseSlice';
import navigationReducer from '@/components/features/subscriptions/selectedPlanSlice';
import planReducer from '@/components/features/subscriptions/selectedPlanSlice';
import planPerUseReducer from '@/components/features/subscriptions/selectedPlanPerUseSlice';

import paymentReducer from '@/components/features/payments/paymentMethodSlice';
import confirmPaymentReducer from '@/components/features/payments/paymentSlice';
import generateAccessKeyReducer from '@/components/features/subscriptions/generateAccessKeySlice';
import invoicesReducer from '@/components/features/invoices/invoiceSlice';
import apiProviderReducer from '@/components/features/apis_management/apiSlice';
import versionReducer from '@/components/features/apis_management/versionSlice';
import categoriesReducer from '@/components/features/apis/categoriesSlice';
import apipopularReducer from '@/components/features/apis/ApiSlice';
import AboutReducer from '@/components/features/apis/AboutSlice';
import functionalitiesReducer from '@/components/features/apis/functionalitiesSlice';
import subscriptionplanReducer from '@/components/features/apis_management/subPlanSlice';
import objectReducer from '@/components/features/apis_management/objectSlice';
import featureReducer from '@/components/features/apis_management/featureSlice';
import featureStatusReducer from '@/components/features/apis_management/featureStatusSlice';
import objectPerMonthReducer from '@/components/features/apis_management/objectPerMonthSlice';
import objectPerUseReducer from '@/components/features/apis_management/objectPerUseSlice';
import privatePlanReducer from '@/components/features/apis_management/privatePlanSlice';
import objectUserReducer from '@/components/features/apis_management/ObjectUserSlice';
import objectMonthUserReducer from '@/components/features/apis_management/objectMonthUserSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
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
    apiProvider:apiProviderReducer,
    versions:versionReducer,
    categories: categoriesReducer,
    functionalities: functionalitiesReducer,
    subscriptionplan:subscriptionplanReducer,
    privatePlan:privatePlanReducer,
    object:objectReducer,
    feature:featureReducer,
    featureStatus:featureStatusReducer,
    objectPerMonth:objectPerMonthReducer,
    objectPerUse:objectPerUseReducer,
    objectPerUseUser:objectUserReducer,
    objectMonthUser:objectMonthUserReducer

    // other reducers...
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
