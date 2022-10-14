import React, { useEffect } from 'react';
import ImagePicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';
import { OptionsBottomSheetContent } from 'src/contexts/BottomSheetContext/OptionsBottomSheetContent';
import { useBottomSheet } from 'src/contexts/BottomSheetContext/useBottomSheet';
import type { UseFormReturn } from '../useForm';

interface UseImagePickerReturn {
  openCamera: () => void;
  openPicker: () => void;
  openPickerOptions: () => void;
}

export type ImagePickerResponse = ImageOrVideo;

export interface UseImagePickerOptions {
  name: string;
  onChangeImage: UseFormReturn['onChangeInput'];
}

const defaultOptions: Options = {
  width: 1200,
  compressImageQuality: 0.8,
  cropping: false,
  multiple: false,
  mediaType: 'photo',
};

const errorsToIgnore = ['User cancelled image selection'];

export const useImagePicker = ({
  name,
  onChangeImage,
}: UseImagePickerOptions): UseImagePickerReturn => {
  const bottomSheet = useBottomSheet();

  const handleOnError = (error: unknown): void => {
    if (error instanceof Error && errorsToIgnore.includes(error.message)) {
      return;
    }

    bottomSheet.showMessage({
      title: 'Erro',
      message:
        error instanceof Error
          ? error.message
          : 'Não foi possível escolher uma imagem, tente novamente',
    });
  };

  const openCamera = async (options?: Options): Promise<void> => {
    bottomSheet.hide();

    try {
      const response = await ImagePicker.openCamera({
        ...defaultOptions,
        ...options,
      });

      onChangeImage(name, response);
    } catch (error) {
      handleOnError(error);
    }
  };

  const openPicker = async (options?: Options): Promise<void> => {
    bottomSheet.hide();

    try {
      const response = await ImagePicker.openPicker({
        ...defaultOptions,
        ...options,
      });

      onChangeImage(name, response);
    } catch (error) {
      handleOnError(error);
    }
  };

  const openPickerOptions = (options?: Options): void => {
    bottomSheet.show({
      content: (
        <OptionsBottomSheetContent
          actions={[
            {
              title: 'Tirar foto',
              onPress: (): Promise<void> => openCamera(options),
            },
            {
              title: 'Escolher da galeria',
              onPress: (): Promise<void> => openPicker(options),
            },
          ]}
        />
      ),
    });
  };

  const cleanUpTempImages = (): void => {
    try {
      ImagePicker.clean();
    } catch (error) {
      // ignore error for whatever reason to not block ui
    }
  };

  useEffect(() => {
    return () => cleanUpTempImages();
  }, []);

  return { openCamera, openPicker, openPickerOptions };
};
