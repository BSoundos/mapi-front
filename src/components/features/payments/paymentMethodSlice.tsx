// paymentSlice.ts

import { createSlice } from '@reduxjs/toolkit';

interface PaymentState {
  method: string;
}

const initialState: PaymentState = {
  method: '', // Initialiser la méthode de paiement à une valeur par défaut
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentMethod(state, action) {
      state.method = action.payload;
    },
  },
});

export const { setPaymentMethod } = paymentSlice.actions;
export default paymentSlice.reducer;
