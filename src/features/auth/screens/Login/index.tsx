import React, { useState } from 'react';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import { useBottomSheet } from 'src/contexts/BottomSheetContext/useBottomSheet';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import { getErrorMessage } from 'src/services/request/errors';
import { useForm } from 'src/hooks/useForm';
import * as validators from 'src/util/validators';
import * as cpf from 'src/util/cpf';
import { LoginUI, LoginUIStates, LoginFormData } from './ui';

type LoginScreenProps = RootStackScreenProps<'Auth.Login'>;

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [state, setState] = useState(LoginUIStates.default);
  const [isShouldPassword, setIsShouldPassword] = useState(false);

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

      await Promise.resolve();

      // It'll navigate automatically
      updateAuthState({ accessToken: '92834o23j4lk2jkjh2kjh34k2jh347823jk' });
    } catch (error) {
      bottomSheet.showMessage({
        title: 'Erro',
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
