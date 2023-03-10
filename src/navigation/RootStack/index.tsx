import React, { ReactElement } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { NavigatorScreenParams } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import { IntroLoadingScreen, LoginScreen } from 'src/features/auth';
import {
  PaymentChoiceByInstallmentScreen,
  PaymentByCreditCardScreen,
  PaymentByDebitCardScreen,
} from 'src/features/cart';
import type { Installment } from 'src/features/cart/model/installmentDTO';
import { Colors } from 'src/styleguide/colors';
import { Header } from '../components/Header';
import { ROUTES } from '../constants/routes';
import { MainTabNavigator, MainTabParamList } from '../MainTabNavigator';
import { StyleSheet } from 'react-native';

interface PaymentByCreditCardStack {
  installment: Installment;
  uuid: string;
}

interface PaymentChoiceByInstallmentAmountStack {
  amount: number;
  uuid: string;
}

interface PaymentByDebitCardStack {
  amount: number;
  uuid: string;
}

const {
  Auth: AUTH_ROUTES,
  Payments: PAYMENTS_ROUTES,
  MainTab: MAIN_TAB_ROUTES,
} = ROUTES;

export type RootStackParamList = {
  [AUTH_ROUTES.IntroLoading]: undefined;
  [AUTH_ROUTES.Login]: undefined;
  [MAIN_TAB_ROUTES.Itself]: NavigatorScreenParams<MainTabParamList> | undefined;
  [PAYMENTS_ROUTES.PaymentChoiceByInstallment]: PaymentChoiceByInstallmentAmountStack;
  [PAYMENTS_ROUTES.PaymentByCreditCard]: PaymentByCreditCardStack;
  [PAYMENTS_ROUTES.PaymentByDebitCard]: PaymentByDebitCardStack;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export const RootStack: React.FC = () => {
  const { token } = useAuth();

  return (
    <GestureHandlerRootView style={styles.flex1}>
      <BottomSheetModalProvider>
        <Stack.Navigator
          screenOptions={{
            header: (props): ReactElement => <Header {...props} />,
            statusBarTranslucent: true,
            statusBarStyle: 'light',
            statusBarColor: Colors.transparent,
          }}>
          {token ? (
            <>
              <Stack.Screen
                name={MAIN_TAB_ROUTES.Itself}
                component={MainTabNavigator}
              />
              <Stack.Screen
                name={PAYMENTS_ROUTES.PaymentChoiceByInstallment}
                component={PaymentChoiceByInstallmentScreen}
                options={{ title: 'Crédito' }}
              />
              <Stack.Screen
                name={PAYMENTS_ROUTES.PaymentByCreditCard}
                component={PaymentByCreditCardScreen}
                options={{ title: 'Crédito' }}
              />
              <Stack.Screen
                name={PAYMENTS_ROUTES.PaymentByDebitCard}
                component={PaymentByDebitCardScreen}
                options={{ title: 'Débito' }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={AUTH_ROUTES.IntroLoading}
                component={IntroLoadingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={AUTH_ROUTES.Login}
                component={LoginScreen}
                options={{ headerShown: false, statusBarStyle: 'light' }}
              />
            </>
          )}
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
