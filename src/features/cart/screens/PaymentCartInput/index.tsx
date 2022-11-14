import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCart } from 'src/redux/cartSlice';
import { useForm } from 'src/hooks/useForm';
import { toString, convertAmountToNumber } from 'src/util/currency';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import { MAX_AMOUNT } from 'src/constants';
import { PaymentCartInputUI, PaymentCartInputFormData } from './ui';

type PaymentCartInputScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentCartInput'>;

export const PaymentCartInputScreen: React.FC<PaymentCartInputScreenProps> = ({
  navigation,
}) => {
  const cart = useSelector(useCart);

  const { formData, formErrors, onChangeInput } =
    useForm<PaymentCartInputFormData>({
      initialData: { amount: toString(0) },
      formatters: { amount: toString },
    });

  const handleOnChangeAmount = (amount: string): void => {
    const amountNumber = convertAmountToNumber(amount);

    if (amountNumber > MAX_AMOUNT) {
      return;
    }

    onChangeInput('amount', amount);
  };

  const handleOnPaymentTypeChoice = (): void => {
    navigation.navigate('CartTabHome.PaymentTypeChoice', {
      amount: convertAmountToNumber(formData.amount),
    });
  };

  useEffect(() => {
    if (cart.totalAmount) {
      handleOnChangeAmount(toString(cart.totalAmount));
    }
  }, [cart]);

  return (
    <PaymentCartInputUI
      cart={cart}
      formData={formData}
      formErrors={formErrors}
      onChangeAmount={handleOnChangeAmount}
      onPaymentTypeChoice={handleOnPaymentTypeChoice}
      submitDisabled={convertAmountToNumber(formData.amount) < cart.totalAmount}
    />
  );
};
