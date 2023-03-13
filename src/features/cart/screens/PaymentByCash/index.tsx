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
import { ROUTES } from 'src/navigation/constants/routes';

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
          formatPaymentPayload(
            terminalSerialNumber,
            cart,
            orders,
            totalAmountFee,
            totalAmountFee,
          ),
        ),
      );
      await saveOrder(
        token,
        formatPaymentPayload(
          terminalSerialNumber,
          cart,
          orders,
          totalAmountFee,
          totalAmountFee,
        ),
      );
      setState(States.success);
    } catch (error) {
      setState(States.error);
      console.log(error);
    }
  };

  const handleOnClose = (): void => {
    dispatch(removeAllItemFromCart());

    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.MainTab.Itself as any }],
    });
  };

  useEffect(() => {
    if (state === States.success) {
      new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
        setVisible(false);
        handleOnClose();
        // setState(States.finished);
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
      onDismiss={(): void => setVisible(!visible)}
      onRetry={handleOnPaymentFinish}
    />
  );
};
