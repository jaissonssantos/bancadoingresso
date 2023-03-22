import React, { useEffect, useState } from 'react';
import { NativeEventEmitter } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useBackHandler } from '@react-native-community/hooks';
import { log } from 'src/util/log';
import { useCart, removeAllItemFromCart } from 'src/redux/cartSlice';
import {
  usePayments,
  removePayments,
  // updatePaymentStatusPaid
} from 'src/redux/paymentsSlice';
import { useFees } from 'src/redux/feesSlice';
import { usePinpad } from 'src/redux/pinpadSlice';
// import { PaymentType } from 'src/model/paymentDTO';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import {
  PaymentModule,
  startPayment,
  abortPayment,
} from 'src/core/native_modules/payment';
import { startPrint } from 'src/core/native_modules/print';
// import { useSnackbar } from 'src/hooks/useSnackbar';
import {
  PAYMENT_TYPES,
  OrderPayment,
  PrintTicket,
} from 'src/features/cart/types';
import { ROUTES } from 'src/navigation/constants/routes';
import { calculateFees } from 'src/util/helpers';
import { feeToNumber } from 'src/util/formatters';
import { saveOrder } from 'src/features/cart/services';
import {
  formatPaymentPayload,
  formatPrintTicket,
} from 'src/features/cart/utils';
import { getErrorMessage } from 'src/services/request/errors';
import {
  States,
  PaymentByCreditCardUI,
  PaymentByCreditCardEventListener,
  PinCodePinRequestedEventListener,
  AbortPaymentEventListener,
  // PrintSuccessEventListener,
  // PrintErrorEventListener,
  EventPrintListener,
} from './ui';

type PaymentByCreditCardScreenProps =
  RootStackScreenProps<'Payments.PaymentByCreditCard'>;

export const PaymentByCreditCardScreen: React.FC<
  PaymentByCreditCardScreenProps
> = ({ navigation, route }) => {
  const installmentFromNavigation = route.params.installment;
  // const uuid = route.params.uuid ?? null;

  const dispatch = useDispatch();
  // const snackbar = useSnackbar();
  const cart = useSelector(useCart);
  const splitPayments = useSelector(usePayments);
  const { maximumFee } = useSelector(useFees);
  const { terminalSerialNumber } = useSelector(usePinpad);
  const { token } = useAuth();

  const totalAmountFee = calculateFees(
    feeToNumber(cart.totalAmount),
    feeToNumber(maximumFee?.administrateTax),
  );

  const [state, setState] = useState(States.awaiting_credit_card);
  const [statusPayment, setStatusPayment] = useState<string | null>(
    'AGUARDE...',
  );
  const [isAvailableAbort, setIsAvailableAbort] = useState(false);
  const [errorPayment, setErrorPayment] = useState<string | null>(null);
  const [ordersPayment, setOrdersPayment] = useState<OrderPayment[]>([]);
  const [errorOrderSave, setErrorOrderSave] = useState<string | null>(null);
  const [codePin, setCodePin] = useState<string | null>(null);
  const [printTickets, setPrintTickets] = useState<PrintTicket[]>([]);
  const eventEmitter = new NativeEventEmitter(PaymentModule);

  const handleOnSubmitOrder = async (orders: OrderPayment[]): Promise<void> => {
    setState(States.order_save_loading);
    setStatusPayment('AGUARDE...FINALIZANDO SUA COMPRA');
    setErrorOrderSave(null);

    try {
      await saveOrder(
        token,
        formatPaymentPayload(
          terminalSerialNumber,
          cart,
          orders,
          totalAmountFee,
          installmentFromNavigation.value * 100,
        ),
      );

      const tickets = formatPrintTicket(cart, orders);
      setPrintTickets(tickets);
      await startPrint(tickets, 1);
    } catch (error) {
      setErrorOrderSave(getErrorMessage(error));
      setState(States.order_save_error);
    }
  };

  const handleOnStartPayment = async (): Promise<void> => {
    const response = await startPayment(
      installmentFromNavigation.value * 100,
      installmentFromNavigation.quantity,
      PAYMENT_TYPES.TYPE_CREDITO,
    );

    log.i(`Response do payment: ${JSON.stringify(response || {})}`);
  };

  const handleOnRetryPayment = (): void => {
    setState(States.awaiting_credit_card);
    setStatusPayment('AGUARDE...');
    setErrorPayment(null);
    setCodePin(null);
    setErrorOrderSave(null);
    setPrintTickets([]);

    handleOnStartPayment();
  };

  const handleOnGoToPaymentTypeChoice = (): void => {
    // call on action to decrement the quantity and value of the item
    navigation.navigate(ROUTES.CartTabHome.PaymentCartInput as any, {
      mustClearInputAmount: true,
    });
  };

  const handleOnGoToHome = (): void => {
    dispatch(removeAllItemFromCart());
    dispatch(removePayments());

    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.MainTab.Itself }],
    });
  };

  const handleOnCancel = (): void => {
    abortPayment();
  };

  useEffect(() => {
    new Promise(resolve => setTimeout(resolve, 500)).then(async () => {
      handleOnStartPayment();
    });
  }, []);

  useEffect(() => {
    if (state === States.finished) {
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [state]);

  useEffect(() => {
    navigation.setOptions({
      title: `Crédito ${
        route.params.installment.quantity === 1
          ? 'à vista'
          : `em ${route.params.installment.quantity}x`
      }`,
    });
  }, [navigation]);

  useEffect(() => {
    const eventPaymentStatusListener = eventEmitter.addListener(
      'eventStatusPayment',
      ({ code, message }: PaymentByCreditCardEventListener): void => {
        if (message) {
          setStatusPayment(message);

          if (code === null) {
            setState(States.generic_error);
          }
        }
      },
    );

    const eventPaymentSuccessListener = eventEmitter.addListener(
      'eventSuccessPayment',
      (orderPayment: PaymentByCreditCardEventListener): void => {
        log.i(
          `Success do payment: ${orderPayment.transactionId} | ${orderPayment.message}`,
        );

        if (orderPayment.transactionCode) {
          setCodePin(null);
          setIsAvailableAbort(false);
          // dispatch(
          //   updatePaymentStatusPaid({
          //     hash: uuid,
          //     amountPaid: installmentFromNavigation.value * 100,
          //     type: PaymentType.CREDIT_CARD,
          //   }),
          // );
          const payload = [
            {
              ...orderPayment,
              installments: `${installmentFromNavigation.quantity}`,
            },
          ];

          setOrdersPayment(payload);
          handleOnSubmitOrder(payload);
        }
      },
    );

    const eventPaymentErrorListener = eventEmitter.addListener(
      'eventErrorPayment',
      ({ code, message }: PaymentByCreditCardEventListener): void => {
        if (code === null) {
          setState(States.generic_error);
        }

        setCodePin(null);
        setIsAvailableAbort(false);
        setErrorPayment(message!);
      },
    );

    const eventPasswordToListener = eventEmitter.addListener(
      'eventPasswordToPayment',
      ({ code, message }: PaymentByCreditCardEventListener): void => {
        if (code) {
          setCodePin(message!);
        }
      },
    );

    const eventCodePinRequestedListener = eventEmitter.addListener(
      'eventCodePinRequested',
      ({ isPinRequested }: PinCodePinRequestedEventListener): void => {
        if (isPinRequested) {
          setState(States.requires_code_pin);
        } else {
          setState(States.processing);
        }
      },
    );

    const eventCodeAvailableListener = eventEmitter.addListener(
      'eventCodeAvailableAbort',
      ({ isAvailableAbort: isAbort }: AbortPaymentEventListener): void => {
        setIsAvailableAbort(isAbort);
      },
    );

    // const eventCodePrintSuccessListener = eventEmitter.addListener(
    //   'eventPrintSuccess',
    //   ({ message }: PrintSuccessEventListener): void => {
    //     snackbar.show({
    //       message: message!,
    //       type: 'success',
    //     });
    //   },
    // );

    // const eventCodePrintErrorListener = eventEmitter.addListener(
    //   'eventPrintError',
    //   ({ message }: PrintErrorEventListener): void => {
    //     snackbar.show({
    //       message: message!,
    //       type: 'danger',
    //     });
    //   },
    // );

    return (): void => {
      eventEmitter.removeAllListeners('eventStatusPayment');
      eventEmitter.removeAllListeners('eventSuccessPayment');
      eventEmitter.removeAllListeners('eventErrorPayment');
      eventEmitter.removeAllListeners('eventPasswordToPayment');
      eventEmitter.removeAllListeners('eventCodePinRequested');
      eventEmitter.removeAllListeners('eventCodeAvailableAbort');
      // eventEmitter.removeAllListeners('eventPrintSuccess');
      // eventEmitter.removeAllListeners('eventPrintError');
      eventPaymentStatusListener.remove();
      eventPaymentSuccessListener.remove();
      eventPaymentErrorListener.remove();
      eventPasswordToListener.remove();
      eventCodePinRequestedListener.remove();
      eventCodeAvailableListener.remove();
      // eventCodePrintSuccessListener.remove();
      // eventCodePrintErrorListener.remove();
    };
  }, []);

  useEffect(() => {
    const eventSuccessPrintListener = eventEmitter.addListener(
      'eventSuccessPrint',
      async (eventPrintListener: EventPrintListener): Promise<void> => {
        log.i(`Success do print: ${JSON.stringify(eventPrintListener)}`);
        log.i(`printTickets: ${printTickets.length}`);

        if (eventPrintListener.sequence === printTickets.length) {
          setState(States.finished);
        }
      },
    );

    const eventErrorPrintListener = eventEmitter.addListener(
      'eventErrorPrint',
      async (eventPrintListener: EventPrintListener): Promise<void> => {
        log.e(`Error do print: ${JSON.stringify(eventPrintListener)}`);
        log.e(`printTickets: ${JSON.stringify(printTickets.length)}`);

        await startPrint(printTickets, eventPrintListener.steps);
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
    if (isAvailableAbort) {
      handleOnCancel();
    }

    return true;
  });

  return (
    <PaymentByCreditCardUI
      state={state}
      totalAmountFromSplitPayment={splitPayments.totalAmount / 100}
      totalAmountFee={totalAmountFee}
      installment={installmentFromNavigation}
      statusPayment={statusPayment}
      errorPayment={errorPayment}
      codePin={codePin}
      isAvailableAbort={isAvailableAbort}
      errorOrderSave={errorOrderSave}
      onRetryPayment={handleOnRetryPayment}
      onGoToHome={handleOnGoToHome}
      onCancel={handleOnCancel}
      onGoToPaymentTypeChoice={handleOnGoToPaymentTypeChoice}
      onRetryOrderSave={(): Promise<void> => handleOnSubmitOrder(ordersPayment)}
    />
  );
};
