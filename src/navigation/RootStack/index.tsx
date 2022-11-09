import type { NavigatorScreenParams } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { ReactElement } from 'react';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import { IntroLoadingScreen, LoginScreen } from 'src/features/auth';
import {
  NewServiceCategoryScreen,
  NewServiceScreen,
} from 'src/features/services';
import { Colors } from 'src/styleguide/colors';
import { Header } from '../components/Header';
import { ROUTES } from '../constants/routes';
import { MainTabNavigator, MainTabParamList } from '../MainTabNavigator';

const {
  Auth: AUTH_ROUTES,
  Services: SERVICES_ROUTES,
  MainTab: MAIN_TAB_ROUTES,
} = ROUTES;

export type RootStackParamList = {
  [AUTH_ROUTES.IntroLoading]: undefined;
  [AUTH_ROUTES.Login]: undefined;
  [MAIN_TAB_ROUTES.Itself]: NavigatorScreenParams<MainTabParamList> | undefined;
  [SERVICES_ROUTES.NewService]: undefined;
  [SERVICES_ROUTES.NewServiceCategory]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack: React.FC = () => {
  const { accessToken } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props): ReactElement => <Header {...props} />,
        statusBarTranslucent: true,
        statusBarStyle: 'light',
        statusBarColor: Colors.transparent,
      }}>
      {accessToken ? (
        <>
          <Stack.Screen
            name={MAIN_TAB_ROUTES.Itself}
            component={MainTabNavigator}
          />
          <Stack.Screen
            name={SERVICES_ROUTES.NewService}
            component={NewServiceScreen}
            options={{ title: 'Adicionar serviço' }}
          />
          <Stack.Screen
            name={SERVICES_ROUTES.NewServiceCategory}
            component={NewServiceCategoryScreen}
            options={{ title: 'Adicionar categoria' }}
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
  );
};
