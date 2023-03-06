import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCart } from 'src/redux/cartSlice';
import { useFees, addFees } from 'src/redux/feesSlice';
import { useForm } from 'src/hooks/useForm';
import { toString, convertAmountToNumber } from 'src/util/currency';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import { calculateFees } from 'src/util/helpers';
import { feeToNumber } from 'src/util/formatters';
import { PaymentCartInputUI, PaymentCartInputFormData } from './ui';

type PaymentCartInputScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentCartInput'>;

export const PaymentCartInputScreen: React.FC<PaymentCartInputScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const cart = useSelector(useCart);
  const { maximumFee } = useSelector(useFees);
  const fee = calculateFees(
    feeToNumber(cart.totalAmount),
    feeToNumber(maximumFee?.administrateTax),
  );

  const { formData, formErrors, onChangeInput } =
    useForm<PaymentCartInputFormData>({
      initialData: { amount: toString(0) },
      formatters: { amount: toString },
    });

  const handleOnChangeAmount = (amount: string): void => {
    const amountNumber = convertAmountToNumber(amount) / 100;

    onChangeInput('amount', amountNumber);
  };

  const handleOnPaymentTypeChoice = (): void => {
    dispatch(addFees(cart.items));

    navigation.navigate('CartTabHome.PaymentTypeChoice', {
      amount: convertAmountToNumber(formData.amount),
    });
  };

  useEffect(() => {
    if (cart.totalAmount) {
      // handleOnChangeAmount(toString(cart.totalAmount));
      // handleOnChangeAmount(cart.totalAmount.toString());
    }
  }, [cart]);

  return (
    <PaymentCartInputUI
      cart={cart}
      fee={fee}
      formData={formData}
      formErrors={formErrors}
      onChangeAmount={handleOnChangeAmount}
      onPaymentTypeChoice={handleOnPaymentTypeChoice}
      submitDisabled={convertAmountToNumber(formData.amount) < cart.totalAmount}
    />
  );
};
