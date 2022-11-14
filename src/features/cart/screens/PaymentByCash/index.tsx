import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCart, removeAllItemFromCart } from 'src/redux/cartSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import { PaymentByCashUI, States } from './ui';

type PaymentByCashScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentByCash'>;

export const PaymentByCashScreen: React.FC<PaymentByCashScreenProps> = ({
  navigation,
  route,
}) => {
  const cart = useSelector(useCart);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(States.loading);
  const dispatch = useDispatch();

  const amount = route.params.amount || 0;

  const handleOnPaymentFinish = (): void => {
    setVisible(true);

    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      setState(States.success);
    });
  };

  const handleOnClose = (): void => {
    navigation.navigate('CartTabHome.itself');
    dispatch(removeAllItemFromCart());
  };

  useEffect(() => {
    if (state === States.success) {
      new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        setVisible(false);
        setState(States.finished);
      });
    }
  }, [state]);

  return (
    <PaymentByCashUI
      cart={cart}
      amount={amount}
      state={state}
      visible={visible}
      onPaymentFinish={handleOnPaymentFinish}
      onClose={handleOnClose}
    />
  );
};
