import React from 'react';
// import { useSelector } from 'react-redux';
// import { useCart } from 'src/redux/cartSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import type { Installment } from 'src/features/cart/model/installmentDTO';
import { PaymentChoiceByInstallmentUI } from './ui';

type PaymentChoiceByInstallmentScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentChoiceByInstallment'>;

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
    navigation.navigate('CartTabHome.PaymentByCreditCard', {
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
