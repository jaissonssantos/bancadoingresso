import React, { useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
// import { useSelector } from 'react-redux';
// import { useCart } from 'src/redux/cartSlice';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import type { Installment } from 'src/features/cart/model/installmentDTO';
import {
  getAvailableInstallments,
  PaymentModule,
} from 'src/core/native_modules/payment';
import { formatInstallments } from 'src/features/cart/utils';
import {
  PaymentChoiceByInstallmentUI,
  EventCodeGetAvailableInstallmentsListener,
  States,
} from './ui';

type PaymentChoiceByInstallmentScreenProps =
  RootStackScreenProps<'Payments.PaymentChoiceByInstallment'>;

export const PaymentChoiceByInstallmentScreen: React.FC<
  PaymentChoiceByInstallmentScreenProps
> = ({ navigation, route }) => {
  const eventEmitter = new NativeEventEmitter(PaymentModule);

  const amount = route.params.amount || 0;

  const [state, setState] = React.useState<States>(States.loading);
  const [installments, setInstallments] = React.useState<Installment[]>([]);

  const handleOnInstallmentPress = (value: Installment): void => {
    navigation.navigate('Payments.PaymentByCreditCard', {
      installment: value,
    });
  };

  const handleOnFetchInstallments = (): void => {
    new Promise(resolve => setTimeout(resolve, 100)).then(() => {
      getAvailableInstallments(amount);
    });
  };

  useEffect(() => {
    handleOnFetchInstallments();
  }, []);

  useEffect(() => {
    const eventCodeGetAvailableInstallmentsListener = eventEmitter.addListener(
      'eventCodeGetAvailableInstallments',
      ({
        installments: installmentsData,
      }: EventCodeGetAvailableInstallmentsListener): void => {
        const data: number[] = JSON.parse(installmentsData);

        if (data.length > 0) {
          setInstallments(formatInstallments(data));

          setState(States.default);
        }
      },
    );

    return (): void => {
      eventCodeGetAvailableInstallmentsListener.remove();
      eventEmitter.removeAllListeners('eventCodeGetAvailableInstallments');
    };
  }, []);

  return (
    <PaymentChoiceByInstallmentUI
      state={state}
      installments={installments}
      onInstallmentPress={handleOnInstallmentPress}
    />
  );
};
