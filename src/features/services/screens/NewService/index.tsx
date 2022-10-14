import React from 'react';
import { useBottomSheet } from 'src/contexts/BottomSheetContext/useBottomSheet';
import { useForm } from 'src/hooks/useForm';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import * as validators from 'src/util/validators';
import * as servicesValidators from '../../utils/validators';
import { NewServiceUI } from './ui';

type NewServiceScreenProps = RootStackScreenProps<'Services.NewService'>;

export type NewServiceFormData = {
  category: string;
  name: string;
  description: string;
  duration: string;
  isPriceOnRequest: boolean;
  price: string;
  promotionalPrice: string;
};

export const NewServiceScreen: React.FC<NewServiceScreenProps> = ({
  navigation,
}) => {
  const bottomSheet = useBottomSheet();
  const { formData, formErrors, onChangeInput, isFormValid } =
    useForm<NewServiceFormData>({
      initialData: {
        category: '',
        name: '',
        description: '',
        duration: '',
        isPriceOnRequest: false,
        price: '',
        promotionalPrice: '',
      },
      validators: {
        name: [validators.required],
        category: [validators.required],
        duration: [validators.required],
        price: [servicesValidators.priceRequired],
      },
    });

  const handleOnSubmit = (): void => {
    if (!isFormValid()) {
      return;
    }

    bottomSheet.showMessage({
      title: 'Operação concluída',
      message: 'Serviço cadastrado com sucesso',
    });

    navigation.goBack();
  };

  return (
    <NewServiceUI
      formData={formData}
      formErrors={formErrors}
      onChangeInput={onChangeInput}
      onSubmit={handleOnSubmit}
    />
  );
};
