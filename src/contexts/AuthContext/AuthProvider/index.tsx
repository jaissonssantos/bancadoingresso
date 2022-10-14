import React, { PropsWithChildren, useState } from 'react';
import { persistAuthState } from 'src/features/auth';
import { AuthContext } from '..';

export interface AuthState {
  accessToken: string;
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({ accessToken: '' });

  const updateAuthState = (state: Partial<AuthState>): void => {
    const newState = { ...authState, ...state };

    setAuthState(newState);
    persistAuthState(newState);
  };

  return (
    <AuthContext.Provider value={{ ...authState, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
