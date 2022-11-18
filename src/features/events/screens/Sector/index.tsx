import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  useCart,
  addItemToCart,
  removeItemFromCart,
} from 'src/redux/cartSlice';
import type { EventStackScreenProps } from 'src/navigation/EventStack';
import type { IProduct } from 'src/model/productDTO';
import { useForm } from 'src/hooks/useForm';
import { SectorUI, ISectorData, SearchFormData } from './ui';

type SectorScreenProps = EventStackScreenProps<'EventsTabHome.Sector'>;

export const SectorScreen: React.FC<SectorScreenProps> = ({
  navigation,
  route,
}) => {
  const sectorDataFromNavigation = route.params;
  const [sectorData, setSectorData] = useState<ISectorData>(
    sectorDataFromNavigation,
  );
  const [visible, setVisible] = useState(false);

  const cart = useSelector(useCart);
  const dispatch = useDispatch();

  const { formData, onChangeInput } = useForm<SearchFormData>({
    initialData: { query: '' },
  });

  const handleOnAddProduct = (product: IProduct): void => {
    dispatch(addItemToCart(product));
  };

  const handleOnSubtractProduct = (product: IProduct): void => {
    dispatch(removeItemFromCart(product));
  };

  const handleOnGoToCart = (): void => setVisible(!visible);

  const handleOnDismiss = (value: boolean): void => setVisible(value);

  const handleOnPaymentTypeChoice = (): void => {
    navigation.navigate('CartTabHome.PaymentCartInput');
  };

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      if (cart.items.length > 0) {
        const newSector = sectorDataFromNavigation.items.map(item => {
          const newItem = item;

          const cartItem = cart.items.find(product => product.id === item.id);

          newItem.quantity = cartItem?.quantity || 0;
          return newItem;
        });

        setSectorData({ ...sectorData, items: newSector });
      } else {
        const newSector = sectorDataFromNavigation.items.map(item => {
          const newItem = item;

          newItem.quantity = 0;
          return newItem;
        });
        setSectorData({ ...sectorDataFromNavigation, items: newSector });
      }
    }, [cart]),
  );

  return (
    <SectorUI
      cart={cart}
      visible={visible}
      sectorData={sectorData}
      formData={formData}
      onChangeInput={onChangeInput}
      onAddProduct={handleOnAddProduct}
      onSubtractProduct={handleOnSubtractProduct}
      onGoToCart={handleOnGoToCart}
      onDismiss={handleOnDismiss}
      onPaymentTypeChoice={handleOnPaymentTypeChoice}
    />
  );
};
