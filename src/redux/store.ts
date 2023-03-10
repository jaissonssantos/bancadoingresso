import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import feesReducer from './feesSlice';
import paymentsReducer from './paymentsSlice';
import pinpadReducer from './pinpadSlice';

const createDebugger = require('redux-flipper').default;

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    events: eventsReducer,
    products: productsReducer,
    fees: feesReducer,
    payments: paymentsReducer,
    pinpad: pinpadReducer,
  },
  middleware: getDefaultMiddleware =>
    __DEV__
      ? getDefaultMiddleware({ serializableCheck: false }).concat(
          createDebugger(),
        )
      : getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
