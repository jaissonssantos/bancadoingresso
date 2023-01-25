import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeEventEmitter } from 'react-native';
import { log } from 'src/util/log';
import { useCart, removeAllItemFromCart } from 'src/redux/cartSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import {
  PaymentModule,
  startPaymentEventListener,
  startPayment,
} from 'src/core/native_modules/payment';
import {
  PaymentByCreditCardUI,
  PaymentByCreditCardEventListener,
  States,
} from './ui';

type PaymentByCreditCardScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentByCreditCard'>;

export const PaymentByCreditCardScreen: React.FC<
  PaymentByCreditCardScreenProps
> = ({ navigation, route }) => {
  const installment = route.params.installment;
  const cart = useSelector(useCart);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(States.loading);
  const [statusPayment, setStatusPayment] = useState(
    'Aproxime, insira ou passe o seu cartão',
  );
  const dispatch = useDispatch();
  const eventEmitter = new NativeEventEmitter(PaymentModule);

  const handleOnContinue = (): void => {
    setState(States.loading);
    setVisible(true);

    // new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
    //   setState(States.success);
    // });
  };

  const handleOnCancel = (): void => {
    navigation.navigate('CartTabHome.itself');
    dispatch(removeAllItemFromCart());
  };

  useEffect(() => {
    if (state === States.success) {
      // new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
      //   setVisible(false);
      //   setState(States.finished);
      // });
    }
  }, [state]);

  useEffect(() => {
    new Promise(resolve => setTimeout(resolve, 1000)).then(async () => {
      startPaymentEventListener();

      const response = await startPayment();
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
    const eventListener = eventEmitter.addListener(
      'statusPayment',
      (data: PaymentByCreditCardEventListener): void => {
        if (data.code) {
          log.i(`Status da operação: ${JSON.stringify(data || {})}`);
          setStatusPayment(data.message);
        }
      },
    );

    return (): void => {
      eventEmitter.removeAllListeners('statusPayment');
      eventListener.remove();
    };
  }, []);

  return (
    <PaymentByCreditCardUI
      cart={cart}
      installment={installment}
      state={state}
      visible={visible}
      statusPayment={statusPayment}
      onPaymentContinue={handleOnContinue}
      onCancel={handleOnCancel}
    />
  );
};
