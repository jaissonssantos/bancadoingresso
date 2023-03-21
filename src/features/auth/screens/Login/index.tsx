import React, { useState } from 'react';
import base64 from 'react-native-base64';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import { useBottomSheet } from 'src/contexts/BottomSheetContext/useBottomSheet';
import { useSelector } from 'react-redux';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import { getErrorMessage } from 'src/services/request/errors';
import { useForm } from 'src/hooks/useForm';
import * as validators from 'src/util/validators';
import * as cpf from 'src/util/cpf';
import { requestLogin } from 'src/features/auth/services';
import { usePinpad } from 'src/redux/pinpadSlice';
import { LoginUI, LoginUIStates, LoginFormData } from './ui';

type LoginScreenProps = RootStackScreenProps<'Auth.Login'>;

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [state, setState] = useState(LoginUIStates.default);
  const [isShouldPassword, setIsShouldPassword] = useState(false);
  const { terminalSerialNumber } = useSelector(usePinpad);

  const bottomSheet = useBottomSheet();
  const { updateAuthState } = useAuth();

  const { formData, formErrors, onChangeInput, isFormValid } =
    useForm<LoginFormData>({
      initialData: { document: '', password: '' },
      validators: {
        document: [validators.required],
        password: [
          validators.required,
          validators.hasPasswordOnlyNumberCharacteres,
        ],
      },
      formatters: { document: cpf.updateMask },
    });

  const handleOnLoginPress = async (): Promise<void> => {
    try {
      setState(LoginUIStates.loading);

      if (!isFormValid()) {
        return;
      }

      const authHeader = `Basic ${base64.encode(
        `${formData.document}:${formData.password}`,
      )}`;

      const serial = terminalSerialNumber || '1170217545';

      const response = await requestLogin({
        grant_type: 'client_credentials',
        auth_header: authHeader,
        serial,
      });

      // It'll navigate automatically
      updateAuthState(response);
    } catch (error) {
      bottomSheet.showMessage({
        title: 'Autenticação',
        message: getErrorMessage(error),
      });
    } finally {
      setState(LoginUIStates.default);
    }
  };

  return (
    <LoginUI
      state={state}
      formData={formData}
      formErrors={formErrors}
      isShouldPassword={isShouldPassword}
      onChangeShouldPassword={(): void =>
        setIsShouldPassword(!isShouldPassword)
      }
      onChangeInput={onChangeInput}
      onLoginPress={handleOnLoginPress}
    />
  );
};
