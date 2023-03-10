import type { ICartState } from 'src/redux/cartSlice';
import type { IEventsState } from 'src/redux/eventsSlice';
import type { IProductState } from 'src/redux/productsSlice';
import type { IFeesState } from 'src/redux/feesSlice';
import type { IPaymentsState } from 'src/redux/paymentsSlice';
import type { IPinPadState } from 'src/redux/pinpadSlice';

export interface RootState {
  cart: ICartState;
  events: IEventsState;
  products: IProductState;
  fees: IFeesState;
  payments: IPaymentsState;
  pinpad: IPinPadState;
}
