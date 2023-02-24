import React, { useEffect, useState } from 'react';
import { NativeEventEmitter } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useBackHandler } from '@react-native-community/hooks';
import { useCart, removeAllItemFromCart } from 'src/redux/cartSlice';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import {
  PaymentModule,
  startPayment,
  abortPayment,
} from 'src/core/native_modules/payment';
import { log } from 'src/util/log';
import { useSnackbar } from 'src/hooks/useSnackbar';
import { PAYMENT_TYPES } from 'src/features/cart/types';
import { ROUTES } from 'src/navigation/constants/routes';
import {
  PaymentByDebitCardUI,
  States,
  PaymentByDebitCardEventListener,
  AbortPaymentEventListener,
  PinCodePinRequestedEventListener,
  PrintSuccessEventListener,
  PrintErrorEventListener,
} from './ui';

type PaymentByDebitCardScreenProps =
  RootStackScreenProps<'Payments.PaymentByDebitCard'>;

export const PaymentByDebitCardScreen: React.FC<
  PaymentByDebitCardScreenProps
> = ({ navigation, route }) => {
  const amount = route.params.amount;

  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  const cart = useSelector(useCart);
  const [state, setState] = useState(States.awaiting_credit_card);
  const [statusPayment, setStatusPayment] = useState<string | null>(
    'AGUARDE...',
  );
  const [isAvailableAbort, setIsAvailableAbort] = useState(false);
  const [errorPayment, setErrorPayment] = useState<string | null>(null);
  const [codePin, setCodePin] = useState<string | null>(null);
  const eventEmitter = new NativeEventEmitter(PaymentModule);

  const handleOnStartPayment = async (): Promise<void> => {
    const response = await startPayment(amount, 1, PAYMENT_TYPES.TYPE_DEBITO);

    log.i(`Response do payment: ${JSON.stringify(response || {})}`);
  };

  const handleOnRetryPayment = (): void => {
    setState(States.awaiting_credit_card);
    setStatusPayment('AGUARDE...');
    setErrorPayment(null);
    setCodePin(null);

    handleOnStartPayment();
  };

  const handleOnGoToPaymentTypeChoice = (): void => {
    // call on action to decrement the quantity and value of the item
    navigation.popToTop();
  };

  const handleOnGoToHome = (): void => {
    dispatch(removeAllItemFromCart());

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
    const eventPaymentStatusListener = eventEmitter.addListener(
      'eventStatusPayment',
      ({ code, message }: PaymentByDebitCardEventListener): void => {
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
      ({ code, message }: PaymentByDebitCardEventListener): void => {
        log.i(`Success do payment: ${code} | ${message}`);

        if (code) {
          setCodePin(null);
          setIsAvailableAbort(false);
          setState(States.finished);
        }
      },
    );

    const eventPaymentErrorListener = eventEmitter.addListener(
      'eventErrorPayment',
      ({ code, message }: PaymentByDebitCardEventListener): void => {
        if (code === null) {
          setState(States.generic_error);
        }

        setCodePin(null);
        setIsAvailableAbort(false);
        setErrorPayment(message);
      },
    );

    const eventPasswordToListener = eventEmitter.addListener(
      'eventPasswordToPayment',
      ({ code, message }: PaymentByDebitCardEventListener): void => {
        if (code) {
          setCodePin(message);
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

    const eventCodePrintSuccessListener = eventEmitter.addListener(
      'eventPrintSuccess',
      ({ message }: PrintSuccessEventListener): void => {
        snackbar.show({
          message,
          type: 'success',
        });
      },
    );

    const eventCodePrintErrorListener = eventEmitter.addListener(
      'eventPrintError',
      ({ message }: PrintErrorEventListener): void => {
        snackbar.show({
          message,
          type: 'danger',
        });
      },
    );

    return (): void => {
      eventEmitter.removeAllListeners('eventStatusPayment');
      eventEmitter.removeAllListeners('eventSuccessPayment');
      eventEmitter.removeAllListeners('eventErrorPayment');
      eventEmitter.removeAllListeners('eventPasswordToPayment');
      eventEmitter.removeAllListeners('eventCodePinRequested');
      eventEmitter.removeAllListeners('eventCodeAvailableAbort');
      eventEmitter.removeAllListeners('eventPrintSuccess');
      eventEmitter.removeAllListeners('eventPrintError');
      eventPaymentStatusListener.remove();
      eventPaymentSuccessListener.remove();
      eventPaymentErrorListener.remove();
      eventPasswordToListener.remove();
      eventCodePinRequestedListener.remove();
      eventCodeAvailableListener.remove();
      eventCodePrintSuccessListener.remove();
      eventCodePrintErrorListener.remove();
    };
  }, []);

  useBackHandler(() => {
    if (isAvailableAbort) {
      handleOnCancel();
    }

    return true;
  });

  return (
    <PaymentByDebitCardUI
      state={state}
      cart={cart}
      amount={amount / 100}
      statusPayment={statusPayment}
      errorPayment={errorPayment}
      codePin={codePin}
      isAvailableAbort={isAvailableAbort}
      onRetryPayment={handleOnRetryPayment}
      onGoToHome={handleOnGoToHome}
      onCancel={handleOnCancel}
      onGoToPaymentTypeChoice={handleOnGoToPaymentTypeChoice}
    />
  );
};
