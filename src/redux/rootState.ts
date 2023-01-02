import type { ICartState } from 'src/redux/cartSlice';
import type { IEventsState } from 'src/redux/eventsSlice';
import type { IProductsState } from 'src/redux/productsSlice';

export interface RootState {
  cart: ICartState;
  events: IEventsState;
  products: IProductsState[];
}
