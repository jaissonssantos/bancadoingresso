import { createContext } from 'react';
import type { AuthState } from './AuthProvider';

export interface AuthContextValue extends AuthState {
  updateAuthState: (state: Partial<AuthState>) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  accessToken: '',
  updateAuthState: () => undefined,
});
