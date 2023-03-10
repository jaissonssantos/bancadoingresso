import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBackHandler } from '@react-native-community/hooks';
import { useFees } from 'src/redux/feesSlice';
import { useCart } from 'src/redux/cartSlice';
import { removePaymentItem } from 'src/redux/paymentsSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import { ROUTES } from 'src/navigation/constants/routes';
import { calculateFees } from 'src/util/helpers';
import { feeToNumber } from 'src/util/formatters';
import { PaymentTypeChoiceUI } from './ui';

type PaymentTypeChoiceScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentTypeChoice'>;

export const PaymentTypeChoiceScreen: React.FC<
  PaymentTypeChoiceScreenProps
> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const cart = useSelector(useCart);
  const { maximumFee } = useSelector(useFees);

  const amount = route.params.amount ?? 0;
  const uuid = route.params.uuid ?? null;

  const totalAmountFee = calculateFees(
    feeToNumber(cart.totalAmount),
    feeToNumber(maximumFee?.administrateTax),
  );

  const creditCardPercentageFee =
    feeToNumber(maximumFee?.administrateTax) + feeToNumber(maximumFee?.credit);
  const debitCardPercentageFee =
    feeToNumber(maximumFee?.administrateTax) + feeToNumber(maximumFee?.debit);
  const pixPercentageFee =
    feeToNumber(maximumFee?.administrateTax) + feeToNumber(maximumFee?.pix);

  const creditCardFee = calculateFees(amount, creditCardPercentageFee);
  const debitCardFee = calculateFees(amount, debitCardPercentageFee);
  const pixFee = calculateFees(amount, pixPercentageFee);
  console.log('pixFee >>> ', pixFee - amount);
  console.log('totalAmountFee >>> ', totalAmountFee);

  const handleOnMoneyPress = (): void =>
    navigation.navigate(ROUTES.CartTabHome.PaymentByCash, {
      amount,
      uuid,
    });

  const handleOnPixPress = (): void => undefined;
  // navigation.navigate(ROUTES.CartTabHome.PaymentByPix);

  const handleOnDebitCardPress = (): void =>
    navigation.navigate(ROUTES.Payments.PaymentByDebitCard, {
      amount: totalAmountFee,
      uuid,
    });

  const handleOnCreditCardPress = (): void =>
    navigation.navigate(ROUTES.Payments.PaymentChoiceByInstallment, {
      amount: creditCardFee,
      uuid,
    });

  useBackHandler(() => {
    return true;
  });

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (e.data.action.type === 'GO_BACK') {
        dispatch(removePaymentItem(uuid));
      }
    });
  }, []);

  return (
    <PaymentTypeChoiceUI
      // cart={cart}
      amount={amount / 100}
      totalAmountFee={totalAmountFee}
      cashFee={amount / 100}
      debitCardFee={debitCardFee / 100}
      creditCardFee={creditCardFee / 100}
      pixFee={pixFee / 100}
      onMoneyPress={handleOnMoneyPress}
      onPixPress={handleOnPixPress}
      onDebitCardPress={handleOnDebitCardPress}
      onCreditCardPress={handleOnCreditCardPress}
    />
  );
};
