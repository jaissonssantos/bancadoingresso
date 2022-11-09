import React, { useEffect } from 'react';
import type { ProductsStackScreenProps } from 'src/navigation/ProductStack';
import type { ISubGroup } from 'src/features/products/model/subgroupDTO';
import { useForm } from 'src/hooks/useForm';
import { SubGroupUI, SearchFormData } from './ui';

type SubGroupScreenProps = ProductsStackScreenProps<'ProductsTabHome.SubGroup'>;

export const SubGroupScreen: React.FC<SubGroupScreenProps> = ({
  navigation,
  route,
}) => {
  const subGroupDataFromNavigation = route.params;

  const { formData, onChangeInput } = useForm<SearchFormData>({
    initialData: { query: '' },
  });

  const handleOnGoToProduct = (subgroup: ISubGroup): void =>
    navigation.navigate('ProductsTabHome.Product', {
      ...subgroup,
    });

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [navigation]);

  return (
    <SubGroupUI
      groupData={subGroupDataFromNavigation}
      formData={formData}
      onChangeInput={onChangeInput}
      onGoToProduct={handleOnGoToProduct}
    />
  );
};
