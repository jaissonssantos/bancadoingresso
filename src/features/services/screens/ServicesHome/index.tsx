import React, { useState } from 'react';
import { ROUTES } from 'src/navigation/constants/routes';
import type { MainTabScreenProps } from 'src/navigation/MainTabNavigator';
import { CategoriesHorizontalListItemType } from '../../components/CategoriesHorizontalListItem';
import type { Service, ServiceCategory } from '../../types';
import { ServicesHomeUI } from './ui';

type ServicesHomeScreenProps = MainTabScreenProps<'MainTab.ServicesHome'>;

export const ServicesHomeScreen: React.FC<ServicesHomeScreenProps> = ({
  navigation,
}) => {
  const [categories] = useState<ServiceCategory[]>([
    { id: CategoriesHorizontalListItemType.addCategory },
    { id: '1', image: 'https://picsum.photos/200/300', name: 'Cabelos' },
    { id: '2', name: 'Cabelos' },
    { id: '3', image: 'https://picsum.photos/200/300', name: 'Sobrancelhas' },
    { id: '4', image: 'https://picsum.photos/200/300', name: 'Massagem' },
    { id: '5', image: 'https://picsum.photos/200/300', name: 'Unhas' },
  ]);
  const [services] = useState<Service[]>([
    { id: '1', name: 'Cabelos curtos', price: 50 },
    { id: '2', name: 'Cabelos longos', price: 20 },
    { id: '3', name: 'Escova', price: 20 },
    { id: '4', name: 'Progressiva', price: 40 },
  ]);
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory | null>(null);

  const onPressCategory = (category: ServiceCategory): void => {
    if (category.id === CategoriesHorizontalListItemType.addCategory) {
      navigation.navigate(ROUTES.Services.NewServiceCategory);
      return;
    }

    setSelectedCategory(category);
  };

  const onPressService = (_: Service): void => {};

  const onPressAddService = (): void => {
    navigation.navigate(ROUTES.Services.NewService);
  };

  return (
    <ServicesHomeUI
      categories={categories}
      services={services}
      selectedCategory={selectedCategory}
      onPressCategory={onPressCategory}
      onPressService={onPressService}
      onPressAddService={onPressAddService}
    />
  );
};
