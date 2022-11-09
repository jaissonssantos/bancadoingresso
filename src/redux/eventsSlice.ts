import { createSlice } from '@reduxjs/toolkit';
import type { IEvent } from 'src/model/eventDTO';
import { mockDataEvents } from 'src/mocks/mockDataEvents';
import type { RootState } from './rootState';

export interface IEventsState extends IEvent {}

const initialState: IEvent[] = mockDataEvents;

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
});

export default eventsSlice.reducer;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useEvents = (state: RootState) => state.events;
