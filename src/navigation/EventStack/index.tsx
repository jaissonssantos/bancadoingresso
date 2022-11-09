import React, { ReactElement } from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import { HomeScreen, SectorScreen } from 'src/features/events';
import type { IEvent } from 'src/model/eventDTO';
import type { ISector } from 'src/model/sectorDTO';
import { Colors } from 'src/styleguide/colors';
import { Header } from '../components/Header';
import { ROUTES } from '../constants/routes';
import type { MainTabScreenProps } from '../MainTabNavigator';

const { EventsTabHome: EVENTS_TAB_HOME_ROUTES } = ROUTES;

export interface EventStackParam extends ISector {
  event?: IEvent;
}

export type EventsTabHomeParamList = {
  [EVENTS_TAB_HOME_ROUTES.itself]: undefined;
  [EVENTS_TAB_HOME_ROUTES.Sector]: EventStackParam;
};

export type EventStackScreenProps<T extends keyof EventsTabHomeParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<EventsTabHomeParamList, T>,
    MainTabScreenProps<'MainTab.Home'>
  >;

const Stack = createNativeStackNavigator<EventsTabHomeParamList>();

export const EventStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props): ReactElement => <Header {...props} />,
        statusBarTranslucent: true,
        statusBarStyle: 'light',
        statusBarColor: Colors.transparent,
      }}>
      <Stack.Screen
        name={EVENTS_TAB_HOME_ROUTES.itself}
        component={HomeScreen}
      />
      <Stack.Screen
        name={EVENTS_TAB_HOME_ROUTES.Sector}
        component={SectorScreen}
      />
    </Stack.Navigator>
  );
};
