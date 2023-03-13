import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IProduct } from 'src/model/productDTO';
import type { RootState } from './rootState';

export interface ICartState {
  items: IProduct[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: ICartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, { payload }: PayloadAction<IProduct>) {
      console.log('payload >>> ', payload);

      const existingItem = state.items.find(
        item =>
          item.id === payload.id &&
          item.name === payload.name &&
          item.isHalfPrice === payload.isHalfPrice,
      );

      const value = payload?.unitValue ?? payload?.value ?? 0;
      const newValue = Number(parseFloat(String(value)).toFixed(2));

      state.totalQuantity++;
      state.totalAmount += newValue ?? 0;

      if (!existingItem) {
        state.items.push({
          id: payload.id,
          name: payload.name,
          count: payload.count,
          value: newValue ?? 0,
          unitValue: newValue ?? 0,
          fee: payload.fee,
          isHalfPrice: payload.isHalfPrice ?? false,
          quantity: 1,
          totalPrice: newValue ?? 0,
          payment: payload.payment,
          physicalSale: payload?.physicalSale,
          eventId: payload?.eventId,
        });
      } else {
        const quantity = existingItem?.quantity ?? 1;
        const totalPrice = existingItem?.totalPrice ?? 0;

        existingItem.quantity = quantity + 1;
        existingItem.totalPrice = totalPrice + newValue;
      }

      console.log('state >>> ', JSON.stringify(state.items));
    },
    removeItemFromCart(state, { payload }: PayloadAction<IProduct>) {
      const existingItem = state.items.find(
        item =>
          item.id === payload.id &&
          item.name === payload.name &&
          item.isHalfPrice === payload.isHalfPrice,
      );

      const value = payload?.unitValue ?? payload?.value ?? 0;
      const newValue = Number(parseFloat(String(value)).toFixed(2));

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= newValue;

        if (payload.quantity === 1) {
          state.items = state.items.filter(
            item =>
              item.id !== payload.id ||
              item.name !== payload.name ||
              item.isHalfPrice !== payload.isHalfPrice,
          );
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= newValue;
        }
      }
    },
    removeAllItemFromCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, removeAllItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useCart = (state: RootState) => state.cart;
