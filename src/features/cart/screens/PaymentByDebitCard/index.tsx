import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCart, removeAllItemFromCart } from 'src/redux/cartSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import { PaymentByDebitCardUI, States } from './ui';

type PaymentByDebitCardScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentByDebitCard'>;

export const PaymentByDebitCardScreen: React.FC<
  PaymentByDebitCardScreenProps
> = ({ navigation }) => {
  const cart = useSelector(useCart);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(States.loading);
  const dispatch = useDispatch();

  const handleOnContinue = (): void => {
    setState(States.loading);
    setVisible(true);

    new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
      setState(States.success);
    });
  };

  const handleOnCancel = (): void => {
    navigation.navigate('CartTabHome.itself');
    dispatch(removeAllItemFromCart());
  };

  useEffect(() => {
    if (state === States.success) {
      new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
        setVisible(false);
        setState(States.finished);
      });
    }
  }, [state]);

  useEffect(() => {
    new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
      setState(States.password);
    });
  }, []);

  return (
    <PaymentByDebitCardUI
      cart={cart}
      state={state}
      visible={visible}
      onPaymentContinue={handleOnContinue}
      onCancel={handleOnCancel}
    />
  );
};
