import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CartIcon,
  EventsIcon,
  ProductIcon,
  NoteIcon,
  GearIcon,
} from 'src/assets/icons';
import { ROUTES } from 'src/navigation/constants/routes';
import type { MainTabParamList } from '../../MainTabNavigator';
import { MainTabItem } from '../MainTabItem';
import { PADDING_VERTICAL, styles } from './styles';

export const MainTab: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const safeAreaInsets = useSafeAreaInsets();

  const isRouteActive = (routeName: keyof MainTabParamList): boolean =>
    state.routes.findIndex(route => route.name === routeName) === state.index;

  const onNavigateToRoute = (routeName: keyof MainTabParamList) => (): void =>
    navigation.navigate(routeName);

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: safeAreaInsets.bottom || PADDING_VERTICAL,
        },
      ]}>
      <MainTabItem
        label="Eventos"
        Icon={EventsIcon}
        active={isRouteActive(ROUTES.MainTab.Home)}
        onPress={onNavigateToRoute(ROUTES.MainTab.Home)}
      />
      <MainTabItem
        label="Produtos"
        Icon={ProductIcon}
        active={isRouteActive(ROUTES.MainTab.ProductsHome)}
        onPress={onNavigateToRoute(ROUTES.MainTab.ProductsHome)}
      />
      <MainTabItem
        label="Carrinho"
        Icon={CartIcon}
        active={isRouteActive(ROUTES.MainTab.Cart)}
        onPress={onNavigateToRoute(ROUTES.MainTab.Cart)}
      />
      {/* <MainTabItem
        label="Relatórios"
        Icon={NoteIcon}
        active={isRouteActive(ROUTES.MainTab.ScheduleHome)}
        onPress={onNavigateToRoute(ROUTES.MainTab.ScheduleHome)}
      />
      <MainTabItem
        label="Admin"
        Icon={GearIcon}
        active={isRouteActive(ROUTES.MainTab.ScheduleHome)}
        onPress={onNavigateToRoute(ROUTES.MainTab.ScheduleHome)}
      /> */}
    </View>
  );
};
