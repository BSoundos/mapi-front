// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/components/features/authentication/authSlice';
import subscriptionPlansReducer from '@/components/features/payments/subscriptionPlansSlice';
import subscriptionPlansPerUseReducer from '@/components/features/payments/subscriptionPlansPerUseSlice';
import navigationReducer from '@/components/features/payments/selectedPlanSlice';
import planReducer from '@/components/features/payments/selectedPlanSlice';
import planPerUseReducer from '@/components/features/payments/selectedPlanPerUseSlice';
import paymentReducer from '@/components/features/payments/paymentMethodSlice';
import confirmPaymentReducer from '@/components/features/payments/paymentSlice';
import invoicesReducer from '@/components/features/invoices/invoiceSlice';
import apiProviderReducer from '@/components/features/apis_management/apiSlice';
import versionReducer from '@/components/features/apis_management/versionSlice';
import categoriesReducer from '@/components/features/apis/categoriesSlice';
import apiReducer from '@/components/features/apis/ApiSlice';
import apiReducer from '@/components/features/apis/ApiSlice';
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
import subscriptionReducer from '@/components/features/subscriptions/SubscriptionsListSlice';

import ReviewReducer from '@/components/features/apis/ReviewSlice';

import discussionsReducer from '@/components/features/discussions/discussionsSlice';
import discussionReducer from '@/components/features/discussions/discussionSlice';
import addDiscussionReducer from '@/components/features/discussions/addDiscussionSlice';

import repliesReducer from '@/components/features/discussions/ReplySlice';
import addReplyReducer from '@/components/features/discussions/addReplySlice';
import generateAccessKeyReducer from '@/components/features/payments/generateAccessKeySlice';
import TicketReducer from '@/components/features/tickets/TicketSlice';
import TicketDiscussionReducer from  '@/components/features/tickets/TicketDiscussionSlice';
import invoicesDReducer from '@/components/features/invoices/invoiceDetailSlice';
import endpointReducer from '@/components/features/apis/endpointSlice';
import reviewsReducer from '@/components/features/apis/ReviewSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    review:reviewsReducer,
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
    api: apiReducer,
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
    objectMonthUser:objectMonthUserReducer,
    ticket: TicketReducer,
    ticketReplies: TicketDiscussionReducer,
    subscriptions: subscriptionReducer, 
    discussions: discussionsReducer,
    discussion: discussionReducer,
    addDiscussion: addDiscussionReducer,
    replies: repliesReducer,
    addReply: addReplyReducer,
    endpoints:endpointReducer,

    // other reducers...
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;


