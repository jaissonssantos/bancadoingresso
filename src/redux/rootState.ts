import type { ICartState } from 'src/redux/cartSlice';
import type { IEventsState } from 'src/redux/eventsSlice';
import type { IProductState } from 'src/redux/productsSlice';

export interface RootState {
  cart: ICartState;
  events: IEventsState;
  products: IProductState;
}
