import React, { ReactElement } from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { AdminHomeScreen } from 'src/features/admin';
import { Colors } from 'src/styleguide/colors';
import { Header } from '../components/Header';
import { ROUTES } from '../constants/routes';

const { AdminTabHome: ADMIN_TAB_HOME_ROUTES } = ROUTES;

export type AdminTabHomeParamList = {
  [ADMIN_TAB_HOME_ROUTES.Home]: undefined;
};

export type AdminStackScreenProps<T extends keyof AdminTabHomeParamList> =
  NativeStackScreenProps<AdminTabHomeParamList, T>;

const Stack = createNativeStackNavigator<AdminTabHomeParamList>();

export const AdminStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props): ReactElement => <Header {...props} />,
        statusBarTranslucent: true,
        statusBarStyle: 'light',
        statusBarColor: Colors.transparent,
      }}>
      <Stack.Screen
        name={ADMIN_TAB_HOME_ROUTES.Home}
        component={AdminHomeScreen}
      />
    </Stack.Navigator>
  );
};
