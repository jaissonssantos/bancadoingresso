import React, { ReactElement } from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import { HomeScreen, SectorScreen } from 'src/features/events';
import type { IEvent, ISections } from 'src/model/eventDTO';
import { Colors } from 'src/styleguide/colors';
import type { CartStackScreenProps } from '../CartStack';
import type { MainTabScreenProps } from '../MainTabNavigator';
import { Header } from '../components/Header';
import { ROUTES } from '../constants/routes';

const { EventsTabHome: EVENTS_TAB_HOME_ROUTES } = ROUTES;

export interface EventStackParam extends ISections {
  event?: IEvent;
}

export type EventsTabHomeParamList = {
  [EVENTS_TAB_HOME_ROUTES.itself]: undefined;
  [EVENTS_TAB_HOME_ROUTES.Sector]: EventStackParam;
};

export type EventStackScreenProps<T extends keyof EventsTabHomeParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<EventsTabHomeParamList, T>,
    MainTabScreenProps<'MainTab.Cart'>
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
