import React from 'react';
import { View } from 'react-native';
import FadeBackground from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {
  IconSizes,
  BdiLogoIcon,
  EyeVisibilityIcon,
  EyeVisibilityOffIcon,
} from 'src/assets/icons';
import { Button, ButtonType } from 'src/components/Button';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Input } from 'src/components/Input';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { KeyboardAwareScrollView } from 'src/components/KeyboardAwareScrollView';
import loginBg from 'src/features/auth/assets/images/bg_login.png';
import { Colors } from 'src/styleguide/colors';
import type { UseFormReturn } from 'src/hooks/useForm';
import { styles } from './styles';

export enum LoginUIStates {
  default = 'default',
  loading = 'loading',
  networkError = 'networkError',
  genericError = 'genericError',
}

export type LoginFormData = {
  document: string;
  password: string;
};

interface LoginUIProps
  extends Pick<
    UseFormReturn<LoginFormData>,
    'formErrors' | 'onChangeInput' | 'formData'
  > {
  state: LoginUIStates;
  isShouldPassword: boolean;
  onChangeShouldPassword: () => void;
  onLoginPress: () => void;
}

export const LoginUI: React.FC<LoginUIProps> = ({
  state,
  formData,
  formErrors,
  isShouldPassword,
  onChangeShouldPassword,
  onChangeInput,
  onLoginPress,
}) => (
  <View style={styles.safeArea}>
    <FastImage source={loginBg} style={styles.image} />

    <FadeBackground
      colors={[
        Colors.overlay,
        Colors.overlay,
        Colors.overlay,
        Colors.overlay,
        Colors.overlayMedium,
        Colors.black,
        Colors.black,
        Colors.black,
        Colors.black,
        Colors.black,
        Colors.black,
        Colors.black,
        Colors.black,
      ]}
      style={styles.fade}>
      <KeyboardAwareScrollView style={styles.flex1}>
        <SafeAreaView style={styles.content}>
          <View style={styles.alignSelf}>
            <BdiLogoIcon size={IconSizes.medium} />
          </View>

          <Text
            size={TextSizes.xxlarge}
            align={TextAligns.center}
            color={Colors.white}
            weight={TextWeights.medium}
            style={styles.title}>
            Entre com a sua conta
          </Text>

          <Input
            label="CPF"
            name="document"
            placeholder="000.000.000-00"
            value={formData.document}
            error={formErrors.document?.[0]}
            maxLength={14}
            returnKeyType="done"
            keyboardType="numeric"
            onChangeText={onChangeInput}
          />

          <Input
            label="Senha"
            name="password"
            placeholder="********"
            secureTextEntry={!isShouldPassword}
            value={formData.password}
            error={formErrors.password?.[0]}
            maxLength={20}
            onChangeText={onChangeInput}
            renderForward={(): React.ReactNode => (
              <PressableOpacity
                onPress={onChangeShouldPassword}
                style={styles.eyePassword}>
                {isShouldPassword ? (
                  <EyeVisibilityOffIcon
                    color={Colors.white}
                    size={IconSizes.xxxxmedium}
                  />
                ) : (
                  <EyeVisibilityIcon
                    color={Colors.white}
                    size={IconSizes.xxxxmedium}
                  />
                )}
              </PressableOpacity>
            )}
          />

          <Button
            type={ButtonType.text}
            onPress={onLoginPress}
            title="Esqueceu a sua senha?"
            titleStyle={styles.buttonTitle}
            style={styles.button}
          />

          <View style={styles.flex1} />
          <Button
            type={ButtonType.primary}
            onPress={onLoginPress}
            disabled={state === LoginUIStates.loading}
            loading={state === LoginUIStates.loading}
            title="Entrar"
          />
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </FadeBackground>
  </View>
);
