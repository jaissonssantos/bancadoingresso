import React, { ReactElement } from 'react';
import { FlatList, View } from 'react-native';
import {
  MyStoreIcon,
  QrCodeIcon,
  SeeStoreIcon,
  SendLinkIcon,
  SignOutIcon,
  WhatsappIcon,
} from 'src/assets/icons';
import type { GetItemLayoutReturn } from 'src/types/flatList';
import { HorizontalButton, HorizontalButtonProps } from '../HorizontalButton';
import { HORIZONTAL_BUTTON_WIDTH } from '../HorizontalButton/styles';
import { ITEM_SEPARATOR_WIDTH, styles } from './styles';

export interface HorizontalButtonsProps {
  onMyStorePress: () => void;
}

const getItemLayout = (
  _: HorizontalButtonProps[] | null | undefined,
  index: number,
): GetItemLayoutReturn => {
  const totalWidth = HORIZONTAL_BUTTON_WIDTH + ITEM_SEPARATOR_WIDTH;

  return {
    length: totalWidth,
    offset: totalWidth * index,
    index,
  };
};

export const HorizontalButtons: React.FC<HorizontalButtonsProps> = ({
  onMyStorePress,
}) => {
  const horizontalButtons = [
    {
      Icon: MyStoreIcon,
      label: 'Minha\nloja',
      onPress: onMyStorePress,
    },
    {
      Icon: QrCodeIcon,
      label: 'QR\nCode',
      onPress: () => undefined,
    },
    {
      Icon: SendLinkIcon,
      label: 'Envie\nseu link',
      onPress: () => undefined,
    },
    {
      Icon: SeeStoreIcon,
      label: 'Visualizar\nloja',
      onPress: () => undefined,
    },
    {
      Icon: WhatsappIcon,
      label: 'Precisa\nde ajuda?',
      onPress: () => undefined,
    },
    {
      Icon: SignOutIcon,
      label: 'Sair',
      onPress: () => undefined,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        contentContainerStyle={styles.flatListContent}
        data={horizontalButtons}
        getItemLayout={getItemLayout}
        renderItem={({ item }): ReactElement => <HorizontalButton {...item} />}
        ItemSeparatorComponent={(): ReactElement => (
          <View style={styles.separator} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
