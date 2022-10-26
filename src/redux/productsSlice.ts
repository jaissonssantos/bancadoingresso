import { createSlice } from '@reduxjs/toolkit';
import type { IEvent } from 'src/features/products/model/eventDTO';
import { mockDataProducts } from 'src/mocks/mockDataProducts';
import type { RootState } from './rootState';

export interface IProductsState extends IEvent {}

const initialState: IEvent[] = mockDataProducts;

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useProducts = (state: RootState) => state.products;
