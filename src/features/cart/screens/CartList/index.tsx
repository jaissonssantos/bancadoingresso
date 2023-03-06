import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useCart,
  addItemToCart,
  removeItemFromCart,
  removeAllItemFromCart,
} from 'src/redux/cartSlice';
import { useFees } from 'src/redux/feesSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import type { IProduct } from 'src/model/productDTO';
import { calculateFees } from 'src/util/helpers';
import { feeToNumber } from 'src/util/formatters';
import { CartListUI } from './ui';

type CartListScreenProps = CartStackScreenProps<'CartTabHome.itself'>;

export const CartListScreen: React.FC<CartListScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const cart = useSelector(useCart);
  const { maximumFee } = useSelector(useFees);
  const fee = calculateFees(
    feeToNumber(cart.totalAmount),
    feeToNumber(maximumFee?.administrateTax),
  );

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
      fee={fee}
      onAddProduct={handleOnAddProduct}
      onSubtractProduct={handleOnSubtractProduct}
      onRemoveAllProduct={handleOnRemoveAllProduct}
      onPaymentTypeChoice={handleOnPaymentTypeChoice}
    />
  );
};
