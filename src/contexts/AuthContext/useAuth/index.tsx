import { useContext } from 'react';
import { AuthContext, AuthContextValue } from '..';

export const useAuth = (): AuthContextValue => useContext(AuthContext);
