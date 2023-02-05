import React from 'react';
// import { useSelector } from 'react-redux';
// import { useCart } from 'src/redux/cartSlice';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import type { Installment } from 'src/features/cart/model/installmentDTO';
import { PaymentChoiceByInstallmentUI } from './ui';

type PaymentChoiceByInstallmentScreenProps =
  RootStackScreenProps<'Payments.PaymentChoiceByInstallment'>;

export const PaymentChoiceByInstallmentScreen: React.FC<
  PaymentChoiceByInstallmentScreenProps
> = ({ navigation }) => {
  // const cart = useSelector(useCart);
  const installments: Installment[] = [
    {
      quantity: 1,
      value: 1000,
      isInterest: false,
    },
    {
      quantity: 2,
      value: 500,
      isInterest: false,
    },
    {
      quantity: 3,
      value: 130,
      isInterest: true,
    },
  ];

  const handleOnInstallmentPress = (value: Installment): void => {
    navigation.navigate('Payments.PaymentByCreditCard', {
      installment: value,
    });
  };

  return (
    <PaymentChoiceByInstallmentUI
      installments={installments}
      onInstallmentPress={handleOnInstallmentPress}
    />
  );
};
