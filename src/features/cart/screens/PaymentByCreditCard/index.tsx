import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeEventEmitter } from 'react-native';
import { log } from 'src/util/log';
import { useCart, removeAllItemFromCart } from 'src/redux/cartSlice';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import { PaymentModule, startPayment } from 'src/core/native_modules/payment';
import { IEventCode, IEventMessage } from '../../types';
import {
  PaymentByCreditCardUI,
  PaymentByCreditCardEventListener,
  States,
} from './ui';

type PaymentByCreditCardScreenProps =
  RootStackScreenProps<'Payments.PaymentByCreditCard'>;

export const PaymentByCreditCardScreen: React.FC<
  PaymentByCreditCardScreenProps
> = ({ navigation, route }) => {
  const installmentFromNavigation = route.params.installment;

  const cart = useSelector(useCart);
  const [state, setState] = useState(States.awaiting_credit_card);

  const [statusPayment, setStatusPayment] = useState<string | null>(
    'AGUARDE...',
  );
  const [successPayment, setSuccessPayment] = useState<string | null>(null);
  const [errorPayment, setErrorPayment] = useState<string | null>(null);
  const [passwordToPayment, setPasswordToPayment] = useState<string | null>(
    null,
  );
  const dispatch = useDispatch();
  const eventEmitter = new NativeEventEmitter(PaymentModule);

  // const handleOnContinue = (): void => {
  //   setState(States.loading);
  //   setVisible(true);

  //   // new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
  //   //   setState(States.success);
  //   // });
  // };

  const handleOnCancel = (): void => {
    // navigation.navigate('CartTabHome.itself');
    dispatch(removeAllItemFromCart());
  };

  // useEffect(() => {
  // if (state === States.success) {
  // new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
  //   setVisible(false);
  //   setState(States.finished);
  // });
  // }
  // }, [state]);

  useEffect(() => {
    new Promise(resolve => setTimeout(resolve, 500)).then(async () => {
      const response = await startPayment(1000, 1);

      log.i(`Response do payment: ${JSON.stringify(response || {})}`);
    });
    // startPayment();
    // new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
    //   setState(States.password);
    // });
  }, []);

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
      'statusPayment',
      ({ code, message }: PaymentByCreditCardEventListener): void => {
        if (code) {
          log.i(
            `Status da operação: ${JSON.stringify({ code, message } || {})}`,
          );
          if (
            (code === IEventCode.EVENT_CODE_CUSTOM_MESSAGE &&
              message === IEventMessage.EVENT_PASSWORD_LOCKED) ||
            code === IEventCode.EVENT_CODE_INSERTED_CARD
          ) {
            new Promise(resolve => setTimeout(resolve, 700)).then(() => {
              setState(States.requires_password);
            });
          }

          if (
            code === IEventCode.EVENT_CODE_CUSTOM_MESSAGE &&
            message === IEventMessage.EVENT_UPDATING_TABLES
          ) {
            setState(States.updating_tables);
          }

          if (code === IEventCode.EVENT_CODE_WAITING_CARD) {
            setState(States.awaiting_credit_card);
          }

          if (
            code === IEventCode.EVENT_CODE_PIN_OK ||
            code === IEventCode.EVENT_CODE_AUTHORIZING
          ) {
            setState(States.processing);
          }

          setStatusPayment(message);
        }
      },
    );

    const eventPaymentSuccessListener = eventEmitter.addListener(
      'successPayment',
      (data: PaymentByCreditCardEventListener): void => {
        if (data.code) {
          // log.i(`Status da operação: ${JSON.stringify(data || {})}`);
          setPasswordToPayment(null);
          setSuccessPayment(data.message);
        }
      },
    );

    const eventPaymentErrorListener = eventEmitter.addListener(
      'errorPayment',
      (data: PaymentByCreditCardEventListener): void => {
        if (data.code) {
          setPasswordToPayment(null);
          setState(States.error);
          setErrorPayment(data.message);
        }
      },
    );

    const eventPasswordToListener = eventEmitter.addListener(
      'passwordToPayment',
      (data: PaymentByCreditCardEventListener): void => {
        if (data.code) {
          setPasswordToPayment(data.message);
        }
      },
    );

    return (): void => {
      eventEmitter.removeAllListeners('statusPayment');
      eventEmitter.removeAllListeners('successPayment');
      eventEmitter.removeAllListeners('errorPayment');
      eventEmitter.removeAllListeners('passwordToPayment');
      eventPaymentStatusListener.remove();
      eventPaymentSuccessListener.remove();
      eventPaymentErrorListener.remove();
      eventPasswordToListener.remove();
    };
  }, []);

  return (
    <PaymentByCreditCardUI
      state={state}
      cart={cart}
      installment={installmentFromNavigation}
      statusPayment={statusPayment}
      successPayment={successPayment}
      errorPayment={errorPayment}
      passwordToPayment={passwordToPayment}
      onCancel={handleOnCancel}
    />
  );
};
