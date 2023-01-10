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
import type { IEvent, ISections } from 'src/model/eventDTO';
import type { IGroup, ISubGroups } from 'src/model/groupDTO';
import type { CartStackScreenProps } from '../CartStack';
import { Colors } from 'src/styleguide/colors';
import { Header } from '../components/Header';
import { ROUTES } from '../constants/routes';

const { ProductsTabHome: PRODUCTS_TAB_HOME_ROUTES } = ROUTES;

export interface SectorStackParam extends ISections {
  event?: IEvent;
}

export interface SubGroupStackParam extends IGroup {
  event?: IEvent;
}

export interface ProductStackParam extends ISubGroups {
  event?: IEvent;
}

export type ProductsTabHomeParamList = {
  [PRODUCTS_TAB_HOME_ROUTES.itself]: undefined;
  [PRODUCTS_TAB_HOME_ROUTES.Sector]: SectorStackParam;
  [PRODUCTS_TAB_HOME_ROUTES.SubGroup]: SubGroupStackParam;
  [PRODUCTS_TAB_HOME_ROUTES.Product]: ProductStackParam;
};

export type ProductsStackScreenProps<T extends keyof ProductsTabHomeParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProductsTabHomeParamList, T>,
    CartStackScreenProps<'CartTabHome.itself'>
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
