import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement } from 'react';
import { HomeScreen } from 'src/features/home';
import { ScheduleHomeScreen } from 'src/features/schedule';
import { ServicesHomeScreen } from 'src/features/services';
import { MainTab } from '../components/MainTab';
import { ROUTES } from '../constants/routes';
import type { RootStackScreenProps } from '../RootStack';

const { MainTab: MAIN_TAB_ROUTES } = ROUTES;

export type MainTabParamList = {
  [MAIN_TAB_ROUTES.Home]: undefined;
  [MAIN_TAB_ROUTES.ServicesHome]: undefined;
  [MAIN_TAB_ROUTES.ScheduleHome]: undefined;
};

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MainTabParamList, T>,
    RootStackScreenProps<'MainTab.Itself'>
  >;

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC<
  RootStackScreenProps<'MainTab.Itself'>
> = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props): ReactElement => <MainTab {...props} />}>
    <Tab.Screen name={MAIN_TAB_ROUTES.Home} component={HomeScreen} />
    <Tab.Screen
      name={MAIN_TAB_ROUTES.ServicesHome}
      component={ServicesHomeScreen}
    />
    <Tab.Screen
      name={MAIN_TAB_ROUTES.ScheduleHome}
      component={ScheduleHomeScreen}
    />
  </Tab.Navigator>
);
