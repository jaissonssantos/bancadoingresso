import React from 'react';
import { useBottomSheet } from 'src/contexts/BottomSheetContext/useBottomSheet';
import { useForm } from 'src/hooks/useForm';
import type { ImagePickerResponse } from 'src/hooks/useImagePicker';
import type { RootStackScreenProps } from 'src/navigation/RootStack';
import * as validators from 'src/util/validators';
import { NewServiceCategoryUI } from './ui';

type NewServiceCategoryScreenProps =
  RootStackScreenProps<'Services.NewServiceCategory'>;

export type NewServiceCategoryFormData = {
  name: string;
  description: string;
  image: ImagePickerResponse | null;
};

export const NewServiceCategoryScreen: React.FC<
  NewServiceCategoryScreenProps
> = ({ navigation }) => {
  const bottomSheet = useBottomSheet();
  const { formData, formErrors, onChangeInput, isFormValid } =
    useForm<NewServiceCategoryFormData>({
      initialData: { name: '', description: '', image: null },
      validators: { name: [validators.required] },
    });

  const handleOnSubmit = (): void => {
    if (!isFormValid()) {
      return;
    }

    bottomSheet.showMessage({
      title: 'Operação concluída',
      message: 'Categoria cadastrada com sucesso',
    });

    navigation.goBack();
  };

  return (
    <NewServiceCategoryUI
      formData={formData}
      formErrors={formErrors}
      onChangeInput={onChangeInput}
      onSubmit={handleOnSubmit}
    />
  );
};
