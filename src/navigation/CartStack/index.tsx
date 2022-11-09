import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { ReactElement } from 'react';
import { CartListScreen } from 'src/features/cart';
import { Colors } from 'src/styleguide/colors';
import { Header } from '../components/Header';
import { ROUTES } from '../constants/routes';

const { CartTabHome: CART_TAB_HOME_ROUTES } = ROUTES;

export type CartTabHomeParamList = {
  [CART_TAB_HOME_ROUTES.itself]: undefined;
};

export type CartStackScreenProps<T extends keyof CartTabHomeParamList> =
  NativeStackScreenProps<CartTabHomeParamList, T>;

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
    </Stack.Navigator>
  );
};
