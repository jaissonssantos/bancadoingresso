import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IconSizes, ImagePlaceholderIcon } from 'src/assets/icons';
import {
  ImagePickerResponse,
  useImagePicker,
  UseImagePickerOptions,
} from 'src/hooks/useImagePicker';
import { Colors } from 'src/styleguide/colors';
import { PressableOpacity } from '../PressableOpacity';
import { Text, TextAligns, TextSizes, TextWeights } from '../Text';
import { styles } from './styles';

interface ImagePickerProps extends UseImagePickerOptions {
  value: ImagePickerResponse | null;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  name,
  value,
  onChangeImage,
}) => {
  const imagePicker = useImagePicker({ name, onChangeImage });

  return (
    <PressableOpacity
      onPress={(): void => imagePicker.openPickerOptions()}
      style={styles.container}>
      <View style={styles.square}>
        {value?.path ? (
          <FastImage source={{ uri: value.path }} style={styles.image} />
        ) : (
          <ImagePlaceholderIcon size={IconSizes.xxmedium} fill={Colors.black} />
        )}
      </View>
      <Text
        color={Colors.primary}
        weight={TextWeights.bold}
        align={TextAligns.center}
        size={TextSizes.medium}>
        + {value?.path ? 'Alterar' : 'Adicionar'} imagem
      </Text>
    </PressableOpacity>
  );
};
