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
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      state.totalAmount += newItem.price;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, { payload }: PayloadAction<IProduct>) {
      const existingItem = state.items.find(item => item.id === payload.id);
      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== existingItem.id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
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
