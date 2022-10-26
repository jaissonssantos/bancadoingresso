import React, { ReactElement } from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import {
  HomeScreen,
  ProductScreen,
  SectorScreen,
  SubGroupScreen,
} from 'src/features/products';
import type { IEvent } from 'src/features/products/model/eventDTO';
import type { ISector } from 'src/features/products/model/sectorDTO';
import type { IGroup } from 'src/features/products/model/groupDTO';
import type { ISubGroup } from 'src/features/products/model/subgroupDTO';
import { Colors } from 'src/styleguide/colors';
import { Header } from '../components/Header';
import { ROUTES } from '../constants/routes';
import type { MainTabScreenProps } from '../MainTabNavigator';

const { ProductsTabHome: PRODUCTS_TAB_HOME_ROUTES } = ROUTES;

export interface SectorStackParam extends ISector {
  event?: IEvent;
}

export type ProductsTabHomeParamList = {
  [PRODUCTS_TAB_HOME_ROUTES.itself]: undefined;
  [PRODUCTS_TAB_HOME_ROUTES.Sector]: SectorStackParam;
  [PRODUCTS_TAB_HOME_ROUTES.SubGroup]: IGroup;
  [PRODUCTS_TAB_HOME_ROUTES.Product]: ISubGroup;
};

export type ProductsStackScreenProps<T extends keyof ProductsTabHomeParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProductsTabHomeParamList, T>,
    MainTabScreenProps<'MainTab.Home'>
  >;

const Stack = createNativeStackNavigator<ProductsTabHomeParamList>();

export const ProductsStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props): ReactElement => <Header {...props} />,
        statusBarTranslucent: true,
        statusBarStyle: 'light',
        statusBarColor: Colors.transparent,
      }}>
      <Stack.Screen
        name={PRODUCTS_TAB_HOME_ROUTES.itself}
        component={HomeScreen}
      />
      <Stack.Screen
        name={PRODUCTS_TAB_HOME_ROUTES.Sector}
        component={SectorScreen}
      />
      <Stack.Screen
        name={PRODUCTS_TAB_HOME_ROUTES.SubGroup}
        component={SubGroupScreen}
      />
      <Stack.Screen
        name={PRODUCTS_TAB_HOME_ROUTES.Product}
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
};
