import { createContext, ReactNode } from 'react';
import type { MessageBottomSheetContentProps } from './MessageBottomSheetContent';

export interface BottomSheetShowOptions {
  content: ReactNode;
}

export interface BottomSheetContextValue {
  show: (options: BottomSheetShowOptions) => void;
  showMessage: (options: Partial<MessageBottomSheetContentProps>) => void;
  hide: () => void;
}

export const BottomSheetContext = createContext<BottomSheetContextValue>({
  show: () => undefined,
  showMessage: () => undefined,
  hide: () => undefined,
});
