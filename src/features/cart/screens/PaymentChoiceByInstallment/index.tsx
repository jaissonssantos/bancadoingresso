import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFees } from 'src/redux/feesSlice';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import type { Installment } from 'src/features/cart/model/installmentDTO';
import { getInstallments } from 'src/features/cart/utils';
import { feeToNumber } from 'src/util/formatters';
import { PaymentChoiceByInstallmentUI, States } from './ui';

type PaymentChoiceByInstallmentScreenProps =
  RootStackScreenProps<'Payments.PaymentChoiceByInstallment'>;

export const PaymentChoiceByInstallmentScreen: React.FC<
  PaymentChoiceByInstallmentScreenProps
> = ({ navigation, route }) => {
  const { maximumFee } = useSelector(useFees);

  const amount = route.params.amount ?? 0;
  const uuid = route.params.uuid ?? null;

  const [state, setState] = React.useState<States>(States.loading);
  const [installments, setInstallments] = React.useState<Installment[]>([]);

  const handleOnInstallmentPress = (value: Installment): void => {
    navigation.navigate('Payments.PaymentByCreditCard', {
      installment: value,
      uuid,
    });
  };

  const handleOnFetchInstallments = (): void => {
    const getAvailableInstallments = getInstallments(
      amount,
      feeToNumber(maximumFee?.fee),
      maximumFee?.installments,
    );

    setInstallments(getAvailableInstallments);

    setState(States.default);
  };

  useEffect(() => {
    handleOnFetchInstallments();
  }, []);

  return (
    <PaymentChoiceByInstallmentUI
      state={state}
      installments={installments}
      onInstallmentPress={handleOnInstallmentPress}
    />
  );
};
