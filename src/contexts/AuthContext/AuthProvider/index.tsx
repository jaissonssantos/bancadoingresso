import React, { PropsWithChildren, useState } from 'react';
import { persistAuthState } from 'src/features/auth';
import type { LoginResponse } from 'src/features/auth/services';
import { AuthContext } from '..';

export interface AuthState extends Partial<LoginResponse> {
  token: string;
  refresh_token: string;
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: '',
    refresh_token: '',
  });

  const updateAuthState = (state: Partial<AuthState>): void => {
    const newState = { ...authState, ...state };

    setAuthState(newState);
    persistAuthState(newState);
  };

  const clearAuthState = (): void => {
    setAuthState({ token: '', refresh_token: '', user: undefined });
    persistAuthState({ token: '', refresh_token: '', user: undefined });
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, updateAuthState, clearAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
