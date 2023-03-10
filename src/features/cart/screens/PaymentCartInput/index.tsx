import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useCart } from 'src/redux/cartSlice';
import { useFees, addFees } from 'src/redux/feesSlice';
import { usePayments, addPayment } from 'src/redux/paymentsSlice';
import { useForm } from 'src/hooks/useForm';
import { toString, convertAmountToNumber } from 'src/util/currency';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import { calculateFees } from 'src/util/helpers';
import { feeToNumber } from 'src/util/formatters';
import { IPaymentStatus } from 'src/model/paymentDTO';
import { PaymentCartInputUI, PaymentCartInputFormData } from './ui';

type PaymentCartInputScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentCartInput'>;

export const PaymentCartInputScreen: React.FC<PaymentCartInputScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const cart = useSelector(useCart);
  const { items } = useSelector(usePayments);
  const { maximumFee } = useSelector(useFees);
  const fee = calculateFees(
    feeToNumber(cart.totalAmount),
    feeToNumber(maximumFee?.administrateTax),
  );

  const mustClearInputAmount = route.params?.mustClearInputAmount ?? false;

  console.log('mustClearInputAmount >>> ', mustClearInputAmount);
  console.log('items >>> ', items);
  console.log('fee >>> ', fee);

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
    const uuid = uuidv4();
    const amount = convertAmountToNumber(formData.amount);

    dispatch(addFees(cart.items));
    dispatch(
      addPayment({
        hash: uuid,
        amount,
        status: IPaymentStatus.WAITING_PAYMENT,
      }),
    );

    navigation.navigate('CartTabHome.PaymentTypeChoice', {
      amount,
      uuid,
    });
  };

  const handleOnBack = (): void => navigation.goBack();

  useEffect(() => {
    if (mustClearInputAmount) {
      onChangeInput('amount', convertAmountToNumber('0'));
    }
  }, [mustClearInputAmount]);

  // TODO: remove this after v1
  useEffect(() => {
    if (fee) {
      onChangeInput('amount', fee);
    }
  }, [fee]);

  return (
    <PaymentCartInputUI
      fee={fee}
      formData={formData}
      formErrors={formErrors}
      onBack={handleOnBack}
      onChangeAmount={handleOnChangeAmount}
      onPaymentTypeChoice={handleOnPaymentTypeChoice}
      submitDisabled={convertAmountToNumber(formData.amount) < cart.totalAmount}
    />
  );
};
