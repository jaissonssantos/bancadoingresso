import { useContext } from 'react';
import { BottomSheetContext, BottomSheetContextValue } from '..';

export const useBottomSheet = (): BottomSheetContextValue =>
  useContext(BottomSheetContext);
