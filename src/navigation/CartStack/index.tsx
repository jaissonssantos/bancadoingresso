import type { CompositeScreenProps } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { ReactElement } from 'react';
import {
  CartListScreen,
  PaymentTypeChoiceScreen,
  PaymentCartInputScreen,
  PaymentByCashScreen,
  PaymentByPixScreen,
  PaymentByDebitCardScreen,
} from 'src/features/cart';
import { Colors } from 'src/styleguide/colors';
import { Header } from '../components/Header';
import { ROUTES } from '../constants/routes';
import type { RootStackScreenProps } from '../RootStack';

const { CartTabHome: CART_TAB_HOME_ROUTES } = ROUTES;

interface CartStackAmount {
  amount: number;
}

export type CartTabHomeParamList = {
  [CART_TAB_HOME_ROUTES.itself]: undefined;
  [CART_TAB_HOME_ROUTES.PaymentCartInput]: undefined;
  [CART_TAB_HOME_ROUTES.PaymentTypeChoice]: CartStackAmount;
  [CART_TAB_HOME_ROUTES.PaymentByCash]: CartStackAmount;
  [CART_TAB_HOME_ROUTES.PaymentByPix]: undefined;
  [CART_TAB_HOME_ROUTES.PaymentByDebitCard]: undefined;
};

export type CartStackScreenProps<T extends keyof CartTabHomeParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CartTabHomeParamList, T>,
    RootStackScreenProps<'MainTab.Itself'>
  >;

const Stack = createNativeStackNavigator<CartTabHomeParamList>();

export const CartStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props): ReactElement => <Header {...props} />,
        statusBarTranslucent: true,
        statusBarStyle: 'light',
        statusBarColor: Colors.transparent,
      }}>
      <Stack.Screen
        name={CART_TAB_HOME_ROUTES.itself}
        component={CartListScreen}
      />
      <Stack.Screen
        name={CART_TAB_HOME_ROUTES.PaymentCartInput}
        component={PaymentCartInputScreen}
        options={{ title: 'Valor' }}
      />
      <Stack.Screen
        name={CART_TAB_HOME_ROUTES.PaymentTypeChoice}
        component={PaymentTypeChoiceScreen}
        options={{ title: 'Forma de pagamento' }}
      />
      <Stack.Screen
        name={CART_TAB_HOME_ROUTES.PaymentByCash}
        component={PaymentByCashScreen}
        options={{ title: 'Dinheiro' }}
      />
      <Stack.Screen
        name={CART_TAB_HOME_ROUTES.PaymentByPix}
        component={PaymentByPixScreen}
        options={{ title: 'PIX' }}
      />
      <Stack.Screen
        name={CART_TAB_HOME_ROUTES.PaymentByDebitCard}
        component={PaymentByDebitCardScreen}
        options={{ title: 'Débito à vista' }}
      />
    </Stack.Navigator>
  );
};
