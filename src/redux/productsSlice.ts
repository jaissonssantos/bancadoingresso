import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IProduct } from 'src/model/productDTO';
import { getProduct } from 'src/features/products/services';
import type { RootState } from './rootState';
import type { store } from './store';

interface ISubGroupProduct {
  accessToken: string;
  event: string;
  subGroup: string;
}

export enum IProductStatusType {
  idle = 'idle',
  loading = 'loading',
  failed = 'failed',
}

export type IProductStatus = 'idle' | 'loading' | 'failed';

export interface IProductState {
  products: IProduct[];
  status: IProductStatus;
}

const initialState: IProductState = {
  products: [],
  status: 'idle',
};

export const fetchSubGroupProduct = createAsyncThunk<
  IProduct[],
  ISubGroupProduct
>(
  'events/fetch/sub-group/product',
  async ({ accessToken, event, subGroup }: ISubGroupProduct) => {
    const products = await getProduct(accessToken, event, subGroup).catch(
      () => [],
    );

    return products;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSubGroupProduct.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchSubGroupProduct.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.products = payload;
    });
    builder.addCase(fetchSubGroupProduct.rejected, state => {
      state.status = 'failed';
    });
  },
});

export default productsSlice.reducer;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useProducts = (state: RootState) => state.products;

export type AppDispatch = typeof store.dispatch;
