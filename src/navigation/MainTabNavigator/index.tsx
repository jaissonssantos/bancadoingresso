import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement } from 'react';
import { ScheduleHomeScreen } from 'src/features/schedule';
import { ServicesHomeScreen } from 'src/features/services';
import { MainTab } from '../components/MainTab';
import { ROUTES } from '../constants/routes';
import { EventStack } from '../EventStack';
import { ProductsStack } from '../ProductStack';
import { CartStack } from '../CartStack';
import type { RootStackScreenProps } from '../RootStack';

const { MainTab: MAIN_TAB_ROUTES } = ROUTES;

export type MainTabParamList = {
  [MAIN_TAB_ROUTES.Home]: undefined;
  [MAIN_TAB_ROUTES.Cart]: undefined;
  [MAIN_TAB_ROUTES.ProductsHome]: undefined;
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
    <Tab.Screen name={MAIN_TAB_ROUTES.Home} component={EventStack} />
    <Tab.Screen name={MAIN_TAB_ROUTES.Cart} component={CartStack} />
    <Tab.Screen name={MAIN_TAB_ROUTES.ProductsHome} component={ProductsStack} />
    <Tab.Screen
      name={MAIN_TAB_ROUTES.ScheduleHome}
      component={ScheduleHomeScreen}
    />
  </Tab.Navigator>
);
