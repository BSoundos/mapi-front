// store.ts
import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/components/features/authentication/authSlice';

import subscriptionPlansReducer from '../components/features/payments/subscriptionPlansSlice';
import subscriptionPlansPerUseReducer from '../components/features/payments/subscriptionPlansPerUseSlice';
import navigationReducer from '../components/features/payments/selectedPlanSlice';
import planReducer from '../components/features/payments/selectedPlanSlice';
import planPerUseReducer from '../components/features/payments/selectedPlanPerUseSlice';

import paymentReducer from '../components/features/payments/paymentMethodSlice';
import confirmPaymentReducer from '../components/features/payments/paymentSlice';
import generateAccessKeyReducer from '../components/features/payments/generateAccessKeySlice';
import invoicesReducer from '../components/features/invoices/invoiceSlice';
import invoicesDReducer from '../components/features/invoices/invoiceDetailSlice';
import apipopularReducer from '../components/features/apis/ApiSlice';
import AboutReducer from '../components/features/apis/AboutSlice';
import { useDispatch } from 'react-redux';
import subscriptionReducer from '../components/features/subscriptions/SubscriptionsListSlice';


import discussionsReducer from '@/components/features/discussions/discussionsSlice';
import discussionReducer from '@/components/features/discussions/discussionSlice';
import addDiscussionReducer from '@/components/features/discussions/addDiscussionSlice';

import repliesReducer from '@/components/features/discussions/replySlice';
import addReplyReducer from '@/components/features/discussions/addReplySlice';



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
    invoiceHistory: invoicesReducer,
    invoiceDetail: invoicesDReducer,
    apipopular: apipopularReducer,
    AboutSlice: AboutReducer,
    subscriptions: subscriptionReducer, 
    

    discussions: discussionsReducer,
    discussion: discussionReducer,
    addDiscussion: addDiscussionReducer,
    replies: repliesReducer,
    addReply: addReplyReducer,
    // other reducers...
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;


