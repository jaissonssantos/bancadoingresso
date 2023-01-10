import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { ProductsStackScreenProps } from 'src/navigation/ProductStack';
import type { ISubGroups } from 'src/model/groupDTO';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import { AppDispatch, fetchSubGroupProduct } from 'src/redux/productsSlice';
import { useForm } from 'src/hooks/useForm';
import { SubGroupUI, SearchFormData } from './ui';

type SubGroupScreenProps = ProductsStackScreenProps<'ProductsTabHome.SubGroup'>;

export const SubGroupScreen: React.FC<SubGroupScreenProps> = ({
  navigation,
  route,
}) => {
  const subGroupDataFromNavigation = route.params;

  const dispatch: AppDispatch = useDispatch();

  const { token } = useAuth();

  const { formData, onChangeInput } = useForm<SearchFormData>({
    initialData: { query: '' },
  });

  const handleOnGoToProduct = (subgroup: ISubGroups): void => {
    dispatch(
      fetchSubGroupProduct({
        accessToken: token,
        event: subGroupDataFromNavigation?.event?.id!,
        subGroup: subgroup.productSubGroupId,
      }),
    );

    navigation.navigate('ProductsTabHome.Product', {
      ...subgroup,
      event: subGroupDataFromNavigation.event,
    });
  };

  useEffect(() => {
    navigation.setOptions({ title: route.params.categoryGroupName });
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
