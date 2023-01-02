import React, { useEffect } from 'react';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import { ROUTES } from 'src/navigation/constants/routes';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import { waitFor } from 'src/util/helpers';
import { retrieveAuthState } from '../../util/storage';
import { IntroLoadingUI } from './ui';

type IntroLoadingScreenProps = RootStackScreenProps<'Auth.IntroLoading'>;

export const IntroLoadingScreen: React.FC<IntroLoadingScreenProps> = ({
  navigation,
}) => {
  const { updateAuthState } = useAuth();

  const handleAuthState = async (): Promise<void> => {
    const persistedState = await retrieveAuthState();

    // Little delay to avoid transitions bugs
    await waitFor(100);

    if (persistedState?.token) {
      // It'll navigate automatically
      updateAuthState(persistedState);
      return;
    }

    navigation.replace(ROUTES.Auth.Login);
  };

  useEffect(() => {
    handleAuthState();
  }, []);

  return <IntroLoadingUI />;
};
