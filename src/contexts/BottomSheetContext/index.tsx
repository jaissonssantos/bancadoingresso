import { createContext, ReactNode } from 'react';
import type { MessageBottomSheetContenProps } from './MessageBottomSheetContent';

export interface BottomSheetShowOptions {
  content: ReactNode;
}

export interface BottomSheetContextValue {
  show: (options: BottomSheetShowOptions) => void;
  showMessage: (options: Partial<MessageBottomSheetContenProps>) => void;
  hide: () => void;
}

export const BottomSheetContext = createContext<BottomSheetContextValue>({
  show: () => undefined,
  showMessage: () => undefined,
  hide: () => undefined,
});
