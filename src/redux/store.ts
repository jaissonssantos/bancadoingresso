import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

const createDebugger = require('redux-flipper').default;

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    events: eventsReducer,
    products: productsReducer,
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
