import React from 'react';
import { useSelector } from 'react-redux';
import { useCart } from 'src/redux/cartSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import { ROUTES } from 'src/navigation/constants/routes';
import { PaymentTypeChoiceUI } from './ui';

type PaymentTypeChoiceScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentTypeChoice'>;

export const PaymentTypeChoiceScreen: React.FC<
  PaymentTypeChoiceScreenProps
> = ({ navigation, route }) => {
  const cart = useSelector(useCart);

  const amount = route.params.amount || 0;

  const handleOnMoneyPress = (): void =>
    navigation.navigate(ROUTES.CartTabHome.PaymentByCash, { amount });

  const handleOnPixPress = (): void =>
    navigation.navigate(ROUTES.CartTabHome.PaymentByPix);

  const handleOnDebitCardPress = (): void =>
    navigation.navigate(ROUTES.CartTabHome.PaymentByDebitCard);

  const handleOnCreditCardPress = (): void =>
    navigation.navigate(ROUTES.Payments.PaymentChoiceByInstallment, { amount });

  return (
    <PaymentTypeChoiceUI
      cart={cart}
      amount={amount / 100}
      onMoneyPress={handleOnMoneyPress}
      onPixPress={handleOnPixPress}
      onDebitCardPress={handleOnDebitCardPress}
      onCreditCardPress={handleOnCreditCardPress}
    />
  );
};
