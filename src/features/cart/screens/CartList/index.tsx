import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useCart,
  addItemToCart,
  removeItemFromCart,
  removeAllItemFromCart,
} from 'src/redux/cartSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import type { IProduct } from 'src/model/productDTO';
import { CartListUI } from './ui';

type CartListScreenProps = CartStackScreenProps<'CartTabHome.itself'>;

export const CartListScreen: React.FC<CartListScreenProps> = ({
  navigation,
}) => {
  const cart = useSelector(useCart);
  const dispatch = useDispatch();

  const handleOnAddProduct = (product: IProduct): void => {
    dispatch(addItemToCart(product));
  };

  const handleOnSubtractProduct = (product: IProduct): void => {
    dispatch(removeItemFromCart(product));
  };

  const handleOnRemoveAllProduct = (): void => {
    dispatch(removeAllItemFromCart());
  };

  const handleOnPaymentTypeChoice = (): void => {
    navigation.navigate('CartTabHome.PaymentCartInput');
  };

  return (
    <CartListUI
      cart={cart}
      onAddProduct={handleOnAddProduct}
      onSubtractProduct={handleOnSubtractProduct}
      onRemoveAllProduct={handleOnRemoveAllProduct}
      onPaymentTypeChoice={handleOnPaymentTypeChoice}
    />
  );
};
