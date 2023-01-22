import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCart, removeAllItemFromCart } from 'src/redux/cartSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import { PaymentModule, startPayment } from 'src/core/native_modules/payment';
import {
  PaymentByCreditCardUI,
  PaymentByCreditCardEventListener,
  States,
} from './ui';
import { NativeEventEmitter } from 'react-native';
import { log } from 'src/util/log';

type PaymentByCreditCardScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentByCreditCard'>;

export const PaymentByCreditCardScreen: React.FC<
  PaymentByCreditCardScreenProps
> = ({ navigation, route }) => {
  const eventEmitter = new NativeEventEmitter(PaymentModule);

  const installment = route.params.installment;
  const cart = useSelector(useCart);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(States.loading);
  const statusPayment = useRef('Aproxime, insira ou passe o seu cartão');
  const dispatch = useDispatch();

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
    new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
      startPayment();
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

  const handleOnStatusPaymentEmitter = (
    data: PaymentByCreditCardEventListener,
  ): void => {
    if (data?.code) {
      statusPayment.current = 'banana';
      // statusPayment.current = data.message;
      log.i(`Status atual: ${JSON.stringify(data || {})}`);
    }
  };

  useEffect(() => {
    const eventListener = eventEmitter.addListener(
      'statusPayment',
      (data: PaymentByCreditCardEventListener): void =>
        handleOnStatusPaymentEmitter(data),
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
      statusPayment={statusPayment.current}
      onPaymentContinue={handleOnContinue}
      onCancel={handleOnCancel}
    />
  );
};
