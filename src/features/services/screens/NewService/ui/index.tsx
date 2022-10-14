import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'src/components/Button';
import { Input, InputType } from 'src/components/Input';
import { KeyboardAwareScrollView } from 'src/components/KeyboardAwareScrollView';
import { Select } from 'src/components/Select';
import type { UseFormReturn } from 'src/hooks/useForm';
import type { NewServiceFormData } from '..';
import { styles } from './styles';

interface NewServiceUIProps
  extends Pick<
    UseFormReturn<NewServiceFormData>,
    'formData' | 'formErrors' | 'onChangeInput'
  > {
  onSubmit: () => void;
}

export const NewServiceUI: React.FC<NewServiceUIProps> = ({
  formData,
  formErrors,
  onChangeInput,
  onSubmit,
}) => (
  <KeyboardAwareScrollView>
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.containerInputs}>
        <Select
          label="Categoria"
          name="category"
          placeholder="Selecione uma categoria"
          title="Selecione uma categoria"
          value={formData.category}
          items={[]}
          onChangeItem={onChangeInput}
        />
        <Input
          label="Nome"
          name="name"
          placeholder="Nome do serviço"
          value={formData.name}
          error={formErrors.name?.[0]}
          maxLength={40}
          onChangeText={onChangeInput}
        />
        <Input
          label="Descrição"
          name="description"
          type={InputType.textarea}
          placeholder="Breve descrição do serviço"
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
