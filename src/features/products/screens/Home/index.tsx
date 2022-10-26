import React from 'react';
import { useSelector } from 'react-redux';
import type { ProductsStackScreenProps } from 'src/navigation/ProductStack';
import type { IEvent } from 'src/features/products/model/eventDTO';
import type { ISector } from 'src/features/products/model/sectorDTO';
import { useForm } from 'src/hooks/useForm';
import { useProducts } from 'src/redux/productsSlice';
import { HomeUI, SearchFormData } from './ui';

type HomeScreenProps = ProductsStackScreenProps<'ProductsTabHome.itself'>;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const events = useSelector(useProducts);

  const { formData, onChangeInput } = useForm<SearchFormData>({
    initialData: { query: '' },
  });

  const handleOnPressItem = ({
    itemSelected,
    itemExtra,
  }: {
    itemSelected: ISector;
    itemExtra?: IEvent;
  }): void => {
    const section = itemExtra?.section.find(item =>
      item.items.find(subItem => subItem.id === itemSelected.id),
    );

    const event = {
      ...itemExtra,
      date: section?.date,
    } as IEvent;

    navigation.push('ProductsTabHome.Sector', {
      ...itemSelected,
      event,
    });
  };

  return (
    <HomeUI
      events={events}
      formData={formData}
      onChangeInput={onChangeInput}
      onPressItem={handleOnPressItem}
    />
  );
};
