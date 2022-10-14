import type { AuthState } from 'src/contexts/AuthContext/AuthProvider';
import { storage } from 'src/util/storage';

export const persistAuthState = async (
  data: Partial<AuthState>,
): Promise<void> =>
  storage.setItem(storage.keys.AUTH_STATE, JSON.stringify(data));

export const retrieveAuthState =
  async (): Promise<Partial<AuthState> | null> => {
    const authState = await storage.getItem(storage.keys.AUTH_STATE);

    if (authState) {
      return JSON.parse(authState) as AuthState;
    }

    return null;
  };
