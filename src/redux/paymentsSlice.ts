import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPayment, IPaymentStatus } from 'src/model/paymentDTO';
import { feeToNumber } from 'src/util/formatters';
import type { RootState } from './rootState';

export interface IPaymentsState {
  items: IPayment[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: IPaymentsState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    addPayment(state, { payload }: PayloadAction<IPayment>) {
      state.items.push({ ...payload, status: IPaymentStatus.WAITING_PAYMENT });
      state.totalQuantity += 1;
      state.totalAmount += feeToNumber(payload.amount);
    },
    updatePaymentStatusPaid(
      state,
      { payload }: PayloadAction<Partial<IPayment>>,
    ) {
      const index = state.items.findIndex(
        item =>
          item.hash === payload.hash &&
          item.status === IPaymentStatus.WAITING_PAYMENT,
      );

      if (index > -1) {
        state.items[index] = {
          ...payload,
          status: IPaymentStatus.PAID,
          amount: payload.amount!,
          amountPaid: payload.amountPaid!,
        };
      }
    },
    removePaymentItem(state, { payload }: PayloadAction<string>) {
      const index = state.items.findIndex(
        item =>
          item.hash === payload &&
          item.status === IPaymentStatus.WAITING_PAYMENT,
      );

      if (index > -1) {
        state.totalQuantity -= 1;
        state.totalAmount -= feeToNumber(state.items[index].amount);
        state.items.splice(index, 1);
      }
    },
    removePayments(state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
});

export const {
  addPayment,
  updatePaymentStatusPaid,
  removePaymentItem,
  removePayments,
} = paymentsSlice.actions;

export default paymentsSlice.reducer;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const usePayments = (state: RootState) => state.payments;
