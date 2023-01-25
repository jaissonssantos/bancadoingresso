import React, { useEffect, useState } from 'react';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import { ROUTES } from 'src/navigation/constants/routes';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import { waitFor } from 'src/util/helpers';
import {
  isAuthenticated,
  initializeAndActivatePinpad,
} from 'src/core/native_modules/authentication';
import { log } from 'src/util/log';
import { useSnackbar } from 'src/hooks/useSnackbar';
import { retrieveAuthState } from '../../util/storage';
import { IntroLoadingUI } from './ui';

type IntroLoadingScreenProps = RootStackScreenProps<'Auth.IntroLoading'>;

export const IntroLoadingScreen: React.FC<IntroLoadingScreenProps> = ({
  navigation,
}) => {
  const snackbar = useSnackbar();
  const { updateAuthState } = useAuth();
  const [message, setMessage] = useState('Carregando...');

  const handleAuthState = async (): Promise<void> => {
    setMessage('Verificando autenticação...');
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

  const handleAuthPagSeguro = async (): Promise<void> => {
    setMessage('Habilitando terminal, aguarde...');
    const isActive = await isAuthenticated();

    if (isActive) {
      log.i('initialized pinpad');
      await handleAuthState();
    } else {
      try {
        await initializeAndActivatePinpad('403938');
        await handleAuthState();
      } catch (error) {
        const parseError = error as Error;

        log.i(
          `Error initializing pinpad: ${error} - ${JSON.stringify(parseError)}`,
        );
        snackbar.show({
          message: parseError.message,
          type: 'danger',
        });

        await handleAuthState();
      }
    }
  };

  useEffect(() => {
    handleAuthPagSeguro();
  }, []);

  return <IntroLoadingUI message={message} />;
};
