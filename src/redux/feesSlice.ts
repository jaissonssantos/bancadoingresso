import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IFees, IPhysicalSale } from 'src/model/eventDTO';
import type { IProduct } from 'src/model/productDTO';
import { feeToNumber } from 'src/util/formatters';
import type { RootState } from './rootState';

export interface IFeesState {
  items: IProduct[];
  maximumFee: IPhysicalSale | IFees | null;
}

const initialState: IFeesState = {
  items: [],
  maximumFee: {
    id: null,
    allowCreditCardPayment: false,
    debit: null,
    credit: null,
    bankSlip: 0,
    pix: 0,
    installments: 0,
    administrateTax: 0,
    fee: 0,
  },
};

const feesSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    addFees(state, { payload }: PayloadAction<IProduct[]>) {
      state.items = payload;
      const products = payload.filter(item => item?.physicalSale?.id);
      const tickets = payload.filter(item => item?.payment?.fees?.id);

      const pickProductMaximumFee = products.reduce(
        (acc, currentItem): IPhysicalSale | IFees | any => {
          const accFee = feeToNumber(acc?.physicalSale?.fee);
          const currentFee = feeToNumber(currentItem?.physicalSale?.fee);

          return currentFee > accFee ? currentItem : acc;
        },
        products[0],
      );

      const pickTicketMaximumFee = tickets.reduce(
        (acc, currentItem): IPhysicalSale | IFees | any => {
          const accFee = feeToNumber(acc?.payment?.fees?.fee);
          const currentFee = feeToNumber(currentItem?.payment?.fees?.fee);

          return currentFee > accFee ? currentItem : acc;
        },
        tickets[0],
      );

      const productMaximumFee = feeToNumber(
        pickProductMaximumFee?.physicalSale?.fee,
      );

      const ticketMaximumFee = feeToNumber(pickTicketMaximumFee?.fee);

      const maximumFee =
        productMaximumFee > ticketMaximumFee
          ? pickProductMaximumFee.physicalSale
          : pickTicketMaximumFee.payment.fees;

      state.maximumFee = maximumFee ?? initialState.maximumFee;

      console.log(
        'state fees to maximum fee >>> ',
        JSON.stringify(state.maximumFee),
      );
    },
    removeFees(state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
});

export const { addFees, removeFees } = feesSlice.actions;

export default feesSlice.reducer;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useFees = (state: RootState) => state.fees;
