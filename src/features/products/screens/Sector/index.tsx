import React, { useEffect } from 'react';
import { useForm } from 'src/hooks/useForm';
import type { ProductsStackScreenProps } from 'src/navigation/ProductStack';
import type { IGroup } from 'src/model/groupDTO';
import { SectorUI, SearchFormData } from './ui';

type SectorScreenProps = ProductsStackScreenProps<'ProductsTabHome.Sector'>;

export const SectorScreen: React.FC<SectorScreenProps> = ({
  navigation,
  route,
}) => {
  const sectorDataFromNavigation = route.params;

  const { formData, onChangeInput } = useForm<SearchFormData>({
    initialData: { query: '' },
  });

  const handleOnGoToSubGroup = (group: IGroup): void => {
    navigation.navigate('ProductsTabHome.SubGroup', {
      ...group,
      event: sectorDataFromNavigation.event,
    });
  };

  useEffect(() => {
    navigation.setOptions({ title: sectorDataFromNavigation.event?.name });
  }, [navigation]);

  return (
    <SectorUI
      sectorData={sectorDataFromNavigation}
      formData={formData}
      onChangeInput={onChangeInput}
      onGoToSubGroup={handleOnGoToSubGroup}
    />
  );
};
