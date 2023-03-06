import type { ICartState } from 'src/redux/cartSlice';
import type { IEventsState } from 'src/redux/eventsSlice';
import type { IProductState } from 'src/redux/productsSlice';
import type { IFeesState } from 'src/redux/feesSlice';

export interface RootState {
  cart: ICartState;
  events: IEventsState;
  products: IProductState;
  fees: IFeesState;
}
