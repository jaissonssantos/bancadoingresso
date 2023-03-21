import React, { useEffect, useState } from 'react';
import { Env } from 'src/constants/env';
import { useDispatch } from 'react-redux';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import { ROUTES } from 'src/navigation/constants/routes';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import { setPinPad } from 'src/redux/pinpadSlice';
import { waitFor } from 'src/util/helpers';
import {
  isAuthenticated,
  initializeAndActivatePinPad,
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
  const dispatch = useDispatch();
  const { updateAuthState, clearAuthState } = useAuth();
  const [message, setMessage] = useState('Carregando...');

  const handleAuthState = async (): Promise<void> => {
    try {
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
    } catch (error) {
      clearAuthState();
    }
  };

  const handleAuthPagSeguro = async (): Promise<void> => {
    setMessage('Habilitando terminal, aguarde...');
    const { id, enabled, terminalSerialNumber } = await isAuthenticated();

    if (enabled) {
      log.i('initialized pinpad');
      log.i(`terminal serial number: ${terminalSerialNumber}`);
      log.i(`código id: ${id}`);

      dispatch(
        setPinPad({
          id,
          terminalSerialNumber,
          enabled,
        }),
      );

      await handleAuthState();
    } else {
      try {
        await initializeAndActivatePinPad(Env.ACTIVATION_CODE);
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
    if (Env.ENABLE_PINPAD === 'true') {
      handleAuthPagSeguro();
    } else {
      handleAuthState();
    }
  }, []);

  return <IntroLoadingUI message={message} />;
};
