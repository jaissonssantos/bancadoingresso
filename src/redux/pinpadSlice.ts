import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './rootState';

export interface IPinPadState {
  id: string | null;
  terminalSerialNumber: string | null;
  enabled: boolean;
}

const initialState: IPinPadState = {
  id: null,
  terminalSerialNumber: null,
  enabled: false,
};

const pinpadSlice = createSlice({
  name: 'pinpad',
  initialState,
  reducers: {
    setPinPad(state, { payload }: PayloadAction<IPinPadState>) {
      state.id = payload.id;
      state.terminalSerialNumber = payload.terminalSerialNumber;
      state.enabled = payload.enabled;
    },
    clearPinpad(state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
});

export const { setPinPad, clearPinpad } = pinpadSlice.actions;

export default pinpadSlice.reducer;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const usePinpad = (state: RootState) => state.pinpad;
