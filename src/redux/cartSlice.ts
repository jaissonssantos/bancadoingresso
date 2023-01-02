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
      const newItem = payload;

      const existingItem = state.items.find(
        item =>
          item.id === newItem.id &&
          item.name === newItem.name &&
          item.isHalfPrice === newItem.isHalfPrice,
      );

      state.totalQuantity++;
      state.totalAmount += newItem?.value ?? 0;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          count: newItem.count,
          value: newItem.value,
          isHalfPrice: newItem.isHalfPrice ?? false,
          quantity: 1,
          totalPrice: newItem.value,
          payment: newItem.payment,
        });
      } else {
        const quantity = existingItem?.quantity ?? 1;
        const totalPrice = existingItem?.totalPrice ?? 0;
        const value = newItem?.value ?? 0;

        existingItem.quantity = quantity + 1;
        existingItem.totalPrice = totalPrice + value;
      }
    },
    removeItemFromCart(state, { payload }: PayloadAction<IProduct>) {
      const existingItem = state.items.find(
        item =>
          item.id === payload.id &&
          item.name === payload.name &&
          item.isHalfPrice === payload.isHalfPrice,
      );

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= payload.value;

        if (payload.quantity === 1) {
          state.items = state.items.filter(
            item =>
              item.id !== payload.id ||
              item.name !== payload.name ||
              item.isHalfPrice !== payload.isHalfPrice,
          );
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.value;
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
