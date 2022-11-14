import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCart, removeAllItemFromCart } from 'src/redux/cartSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import { PaymentByPixUI, States } from './ui';

type PaymentByPixScreenProps = CartStackScreenProps<'CartTabHome.PaymentByPix'>;

export const PaymentByPixScreen: React.FC<PaymentByPixScreenProps> = ({
  navigation,
}) => {
  const cart = useSelector(useCart);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(States.loading);
  const dispatch = useDispatch();

  const handleOnPaymentFinish = (): void => {
    setVisible(true);

    new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
      setState(States.success);
    });
  };

  useEffect(() => {
    if (state === States.success) {
      new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
        setVisible(false);

        navigation.navigate('CartTabHome.itself');
        dispatch(removeAllItemFromCart());
      });
    }
  }, [state]);

  useEffect(() => {
    new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
      handleOnPaymentFinish();
    });
  }, []);

  return (
    <PaymentByPixUI
      cart={cart}
      state={state}
      visible={visible}
      onPaymentFinish={handleOnPaymentFinish}
    />
  );
};
