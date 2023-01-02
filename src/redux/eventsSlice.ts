import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IEvent } from 'src/model/eventDTO';
import { getEventsHome } from 'src/features/events/services';
import type { RootState } from './rootState';
import type { store } from './store';

export interface IEventsState {
  events: IEvent[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IEventsState = {
  events: [],
  status: 'idle',
};

export const fetchEvents = createAsyncThunk<IEvent[], string, {}>(
  'events/fetch',
  async (accessToken: string) => {
    const events = await getEventsHome(accessToken);
    return events;
  },
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEvents.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.events = payload;
    });
    builder.addCase(fetchEvents.rejected, state => {
      state.status = 'failed';
    });
  },
});

export default eventsSlice.reducer;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useEvents = (state: RootState) => state.events;

export type AppDispatch = typeof store.dispatch;
