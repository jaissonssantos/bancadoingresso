import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { useBackHandler } from '@react-native-community/hooks';
import { useCart, removeAllItemFromCart } from 'src/redux/cartSlice';
import { useFees } from 'src/redux/feesSlice';
import { usePinpad } from 'src/redux/pinpadSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import { calculateFees } from 'src/util/helpers';
import { feeToNumber } from 'src/util/formatters';
import {
  formatPaymentPayload,
  formatPrintTicket,
} from 'src/features/cart/utils';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import type { Order, OrderPayment, PrintTicket } from 'src/features/cart/types';
import { saveOrder } from 'src/features/cart/services';
import { PaymentByCashUI, States } from './ui';
import { ROUTES } from 'src/navigation/constants/routes';
import { NativeEventEmitter } from 'react-native';
import { PrintModule, startPrint } from 'src/core/native_modules/print';
import { log } from 'src/util/log';

export interface EventPrintListener {
  errorCode: string;
  message: string;
  result: number;
  steps: number;
  sequence: number;
}

type PaymentByCashScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentByCash'>;

export const PaymentByCashScreen: React.FC<PaymentByCashScreenProps> = ({
  navigation,
  route,
}) => {
  const amount = route.params.amount || 0;
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(States.loading);
  const [order, setOrder] = useState<Order>();
  const [printTickets, setPrintTickets] = useState<PrintTicket[]>([]);

  const cart = useSelector(useCart);
  const { maximumFee } = useSelector(useFees);
  const { terminalSerialNumber } = useSelector(usePinpad);
  const { token } = useAuth();

  const eventEmitter = new NativeEventEmitter(PrintModule);

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
          transactionCode: v4(),
        },
      ];

      const formatPayload = formatPaymentPayload(
        terminalSerialNumber,
        cart,
        orders,
        totalAmountFee,
        totalAmountFee,
      );

      const formattedPrintTicket = formatPrintTicket(cart, orders);

      setOrder(formatPayload);
      setPrintTickets(formattedPrintTicket);
      await startPrint(formattedPrintTicket, 1);
    } catch (error) {
      setState(States.error);
      log.e(`Error start payment: ${JSON.stringify(error)}`);
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

  useEffect(() => {
    const eventSuccessPrintListener = eventEmitter.addListener(
      'eventSuccessPrint',
      async (eventPrintListener: EventPrintListener): Promise<void> => {
        log.i(`Success do print: ${JSON.stringify(eventPrintListener)}`);
        log.i(`printTickets: ${printTickets.length}`);

        if (eventPrintListener.sequence === printTickets.length) {
          await saveOrder(token, order as Order);
          setState(States.success);
        }
      },
    );

    const eventErrorPrintListener = eventEmitter.addListener(
      'eventErrorPrint',
      async (eventPrintListener: EventPrintListener): Promise<void> => {
        log.e(`Error do print: ${JSON.stringify(eventPrintListener)}`);
        log.e(`printTickets: ${JSON.stringify(printTickets.length)}`);

        await startPrint(
          printTickets as PrintTicket[],
          eventPrintListener.steps,
        );
      },
    );

    return (): void => {
      eventEmitter.removeAllListeners('eventSuccessPrint');
      eventEmitter.removeAllListeners('eventErrorPrint');
      eventSuccessPrintListener.remove();
      eventErrorPrintListener.remove();
    };
  }, [printTickets]);

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
      // onClose={handleOnClose}
      onDismiss={(): void => setVisible(!visible)}
      onRetry={handleOnPaymentFinish}
    />
  );
};
