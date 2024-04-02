import { configureStore } from "@reduxjs/toolkit";
import invoicesReducer from './components/slices/invoiceSlice';

export const store = configureStore({
    reducer: {
        invoice: invoicesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>; // Définition de RootState ici
export default store;