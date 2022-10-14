import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'src/components/Button';
import { ImagePicker } from 'src/components/ImagePicker';
import { Input, InputType } from 'src/components/Input';
import { KeyboardAwareScrollView } from 'src/components/KeyboardAwareScrollView';
import type { UseFormReturn } from 'src/hooks/useForm';
import type { NewServiceCategoryFormData } from '..';
import { styles } from './styles';

interface NewServiceCategoryUIProps
  extends Pick<
    UseFormReturn<NewServiceCategoryFormData>,
    'formData' | 'formErrors' | 'onChangeInput'
  > {
  onSubmit: () => void;
}

export const NewServiceCategoryUI: React.FC<NewServiceCategoryUIProps> = ({
  formData,
  formErrors,
  onChangeInput,
  onSubmit,
}) => (
  <KeyboardAwareScrollView>
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ImagePicker
        name="image"
        value={formData.image}
        onChangeImage={onChangeInput}
      />
      <View style={styles.containerInputs}>
        <Input
          label="Nome"
          name="name"
          placeholder="Nome da categoria"
          value={formData.name}
          error={formErrors.name?.[0]}
          maxLength={40}
          onChangeText={onChangeInput}
        />
        <Input
          label="Descrição"
          name="description"
          type={InputType.textarea}
          placeholder="Breve descrição da categoria"
          value={formData.description}
          error={formErrors.description?.[0]}
          maxLength={200}
          onChangeText={onChangeInput}
        />
      </View>
      <Button title="Salvar" onPress={onSubmit} />
    </SafeAreaView>
  </KeyboardAwareScrollView>
);
