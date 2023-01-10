import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import type { ProductsStackScreenProps } from 'src/navigation/ProductStack';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'src/hooks/useForm';
import { useEvents } from 'src/redux/eventsSlice';
import { useProducts, IProductStatusType } from 'src/redux/productsSlice';
import {
  useCart,
  addItemToCart,
  removeItemFromCart,
} from 'src/redux/cartSlice';
import { addProductBySubGroup } from 'src/redux/eventsSlice';
import type { IProduct } from 'src/model/productDTO';
import type { ISubGroups } from 'src/model/groupDTO';
import { ProductUI, SearchFormData } from './ui';

type ProductScreenProps = ProductsStackScreenProps<'ProductsTabHome.Product'>;

export const ProductScreen: React.FC<ProductScreenProps> = ({
  navigation,
  route,
}) => {
  const subGroupDataFromNavigation = route.params;
  const [subGroupData, setSubGroupData] = useState<ISubGroups>(
    subGroupDataFromNavigation,
  );
  const [visible, setVisible] = useState(false);

  const { events } = useSelector(useEvents);
  const { products, status } = useSelector(useProducts);
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

  const handleFetchCart = (): void => {
    if (cart.items.length > 0) {
      const newProducts = subGroupData?.products?.map(product => {
        const cartItem = cart.items.find(
          item =>
            item.id === product.id &&
            item.name === product.name &&
            item.isHalfPrice === product.isHalfPrice,
        );

        return {
          ...product,
          quantity: cartItem?.quantity ?? 0,
        };
      });

      setSubGroupData({ ...subGroupData, products: newProducts });
    } else {
      const newProducts = subGroupData?.products?.map(product => ({
        ...product,
        quantity: 0,
        totalPrice: 0,
        isHalfPrice: product.isHalfPrice,
        count: product.count,
        value: product.value,
        price: product.value,
      }));

      setSubGroupData({ ...subGroupData, products: newProducts });
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: route.params.productSubGroupName });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      handleFetchCart();
    }, [cart]),
  );

  useEffect(() => {
    if (status === IProductStatusType.idle) {
      dispatch(
        addProductBySubGroup({
          subGroup: subGroupDataFromNavigation.productSubGroupId,
          products,
        }),
      );
    }
  }, [status]);

  useEffect(() => {
    const event = events.find(
      eventItem => eventItem.id === subGroupDataFromNavigation.event?.id,
    );

    if (event?.id) {
      event.sections.map(section => ({
        ...section,
        group: section.group.map(groupItem => ({
          ...groupItem,
          subGroups: groupItem.subGroups.map(subGroupItem => {
            if (
              subGroupItem.productSubGroupId ===
              subGroupDataFromNavigation.productSubGroupId
            ) {
              setSubGroupData(subGroupItem);
            }

            return subGroupItem;
          }),
        })),
      }));
    }
  }, [events]);

  console.log('cart >>>', cart);

  return (
    <ProductUI
      status={status}
      cart={cart}
      visible={visible}
      subGroupData={subGroupData}
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
