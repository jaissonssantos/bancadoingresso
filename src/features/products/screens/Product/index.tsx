import React, { useCallback, useEffect, useState } from 'react';
import type { ProductsStackScreenProps } from 'src/navigation/ProductStack';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'src/hooks/useForm';
import {
  useCart,
  addItemToCart,
  removeItemFromCart,
} from 'src/redux/cartSlice';
import type { IProduct } from 'src/model/productDTO';
import type { ISubGroup } from 'src/features/products/model/subgroupDTO';
import { ProductUI, SearchFormData } from './ui';
import { useFocusEffect } from '@react-navigation/native';

type ProductScreenProps = ProductsStackScreenProps<'ProductsTabHome.Product'>;

export const ProductScreen: React.FC<ProductScreenProps> = ({
  navigation,
  route,
}) => {
  const subGroupDataFromNavigation = route.params;
  const [subGroupData, setSubGroupData] = useState<ISubGroup>(
    subGroupDataFromNavigation,
  );
  const [visible, setVisible] = useState(false);

  const cart = useSelector(useCart);
  const dispatch = useDispatch();

  const { formData, onChangeInput } = useForm<SearchFormData>({
    initialData: { query: '' },
  });

  const handleOnGoToCart = (): void => setVisible(!visible);

  const handleOnAddProduct = (product: IProduct): void => {
    dispatch(addItemToCart(product));
  };

  const handleOnSubtractProduct = (product: IProduct): void => {
    dispatch(removeItemFromCart(product));
  };

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
        const newProduct = subGroupDataFromNavigation.items.map(item => {
          const newItem = item;

          const cartItem = cart.items.find(product => product.id === item.id);

          newItem.quantity = cartItem?.quantity || 0;
          return newItem;
        });

        setSubGroupData({ ...subGroupData, items: newProduct });
      } else {
        const newSector = subGroupDataFromNavigation.items?.map(item => {
          const newItem = item;

          newItem.quantity = 0;
          return newItem;
        });
        setSubGroupData({
          ...subGroupDataFromNavigation,
          items: newSector ?? [],
        });
      }
    }, [cart]),
  );

  return (
    <ProductUI
      cart={cart}
      visible={visible}
      subGroupData={subGroupDataFromNavigation}
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
