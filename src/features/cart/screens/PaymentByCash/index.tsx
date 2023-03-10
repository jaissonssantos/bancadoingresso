import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBackHandler } from '@react-native-community/hooks';
import { useCart, removeAllItemFromCart } from 'src/redux/cartSlice';
import { useFees } from 'src/redux/feesSlice';
import { usePinpad } from 'src/redux/pinpadSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import { calculateFees } from 'src/util/helpers';
import { feeToNumber } from 'src/util/formatters';
import { formatPaymentPayload } from 'src/features/cart/utils';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import type { OrderPayment } from 'src/features/cart/types';
import { saveOrder } from 'src/features/cart/services';
import { PaymentByCashUI, States } from './ui';

type PaymentByCashScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentByCash'>;

export const PaymentByCashScreen: React.FC<PaymentByCashScreenProps> = ({
  navigation,
  route,
}) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(States.loading);
  const dispatch = useDispatch();
  const cart = useSelector(useCart);
  const { maximumFee } = useSelector(useFees);
  const { terminalSerialNumber } = useSelector(usePinpad);
  const { token } = useAuth();

  console.log('terminalSerialNumber >>> ', terminalSerialNumber);

  const amount = route.params.amount || 0;

  const totalAmountFee = calculateFees(
    feeToNumber(cart.totalAmount),
    feeToNumber(maximumFee?.administrateTax),
  );

  const handleOnPaymentFinish = async (): Promise<void> => {
    try {
      setVisible(true);
      const orders: OrderPayment[] = [
        {
          paymentType: 0,
        },
      ];
      console.log(
        'payload >>> ',
        JSON.stringify(
          formatPaymentPayload(terminalSerialNumber, cart, orders),
        ),
      );
      await saveOrder(
        token,
        formatPaymentPayload(terminalSerialNumber, cart, orders),
      );
      setState(States.loading);
    } catch (error) {
      setState(States.error);
      console.log(error);
    }
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

  useBackHandler(() => {
    return true;
  });

  return (
    <PaymentByCashUI
      totalAmountFee={totalAmountFee}
      amount={amount / 100}
      state={state}
      visible={visible}
      onPaymentFinish={handleOnPaymentFinish}
      onClose={handleOnClose}
      onRetry={handleOnPaymentFinish}
    />
  );
};
