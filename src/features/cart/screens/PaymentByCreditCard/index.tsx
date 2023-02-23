import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeEventEmitter } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';
import { log } from 'src/util/log';
import { useCart, removeAllItemFromCart } from 'src/redux/cartSlice';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import {
  PaymentModule,
  startPayment,
  abortPayment,
} from 'src/core/native_modules/payment';
import {
  States,
  PaymentByCreditCardUI,
  PaymentByCreditCardEventListener,
  PinCodePinRequestedEventListener,
  AbortPaymentEventListener,
} from './ui';
import { ROUTES } from 'src/navigation/constants/routes';

type PaymentByCreditCardScreenProps =
  RootStackScreenProps<'Payments.PaymentByCreditCard'>;

export const PaymentByCreditCardScreen: React.FC<
  PaymentByCreditCardScreenProps
> = ({ navigation, route }) => {
  const installmentFromNavigation = route.params.installment;
  log.i(
    `installmentFromNavigation >>> ${JSON.stringify(
      installmentFromNavigation,
    )}`,
  );

  const cart = useSelector(useCart);
  const [state, setState] = useState(States.awaiting_credit_card);

  const [statusPayment, setStatusPayment] = useState<string | null>(
    'AGUARDE...',
  );
  const [isAvailableAbort, setIsAvailableAbort] = useState(false);
  const [errorPayment, setErrorPayment] = useState<string | null>(null);
  const [codePin, setCodePin] = useState<string | null>(null);
  const dispatch = useDispatch();
  const eventEmitter = new NativeEventEmitter(PaymentModule);

  const handleOnInitialState = (): void => {
    setState(States.awaiting_credit_card);
    setStatusPayment('AGUARDE...');
    setErrorPayment(null);
    setCodePin(null);
  };

  const handleOnStartPayment = async (): Promise<void> => {
    handleOnInitialState();
    const response = await startPayment(
      installmentFromNavigation.value * 100,
      installmentFromNavigation.quantity,
    );

    log.i(`Response do payment: ${JSON.stringify(response || {})}`);
  };

  // const handleOnContinue = (): void => {
  //   setState(States.loading);
  //   setVisible(true);

  //   // new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
  //   //   setState(States.success);
  //   // });
  // };

  const handleOnGoToHome = (): void => {
    navigation.navigate(ROUTES.MainTab.Itself, {
      screen: ROUTES.MainTab.Home,
    });
  };

  const handleOnCancel = (): void => {
    abortPayment();
    // navigation.navigate('CartTabHome.itself');
    // dispatch(removeAllItemFromCart());
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
      ({ code, message }: PaymentByCreditCardEventListener): void => {
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
      ({ code, message }: PaymentByCreditCardEventListener): void => {
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
      ({ code, message }: PaymentByCreditCardEventListener): void => {
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

    return (): void => {
      eventEmitter.removeAllListeners('eventStatusPayment');
      eventEmitter.removeAllListeners('eventSuccessPayment');
      eventEmitter.removeAllListeners('eventErrorPayment');
      eventEmitter.removeAllListeners('eventPasswordToPayment');
      eventEmitter.removeAllListeners('eventCodePinRequested');
      eventEmitter.removeAllListeners('eventCodeAvailableAbort');
      eventPaymentStatusListener.remove();
      eventPaymentSuccessListener.remove();
      eventPaymentErrorListener.remove();
      eventPasswordToListener.remove();
      eventCodePinRequestedListener.remove();
      eventCodeAvailableListener.remove();
    };
  }, []);

  useBackHandler(() => {
    if (isAvailableAbort) {
      handleOnCancel();
    }

    return true;
  });

  return (
    <PaymentByCreditCardUI
      state={state}
      cart={cart}
      installment={installmentFromNavigation}
      statusPayment={statusPayment}
      errorPayment={errorPayment}
      codePin={codePin}
      isAvailableAbort={isAvailableAbort}
      onRetryPayment={handleOnStartPayment}
      onGoToHome={handleOnGoToHome}
      onCancel={handleOnCancel}
    />
  );
};
