import React, { ReactElement } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import type { ServiceCategory } from '../../types';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';
import { IconSizes, ImagePlaceholderIcon, PlusIcon } from 'src/assets/icons';

export enum CategoriesHorizontalListItemType {
  addCategory = 'addCategory',
}

export interface CategoriesHorizontalListItemProps {
  item: ServiceCategory;
  selected: boolean;
  onPress: (item: ServiceCategory) => void;
}

export const CategoriesHorizontalListItem: React.FC<
  CategoriesHorizontalListItemProps
> = ({ item, selected, onPress }) => {
  const isAddCategory =
    item.id === CategoriesHorizontalListItemType.addCategory;

  const renderImage = (): ReactElement => {
    if (isAddCategory) {
      return <PlusIcon fill={Colors.primary} size={IconSizes.xxxxmedium} />;
    }

    if (item.image) {
      return <FastImage source={{ uri: item.image }} style={styles.image} />;
    }

    return (
      <ImagePlaceholderIcon
        fill={selected ? Colors.white : Colors.primary}
        size={IconSizes.xxxmedium}
      />
    );
  };

  return (
    <PressableOpacity
      onPress={(): void => onPress(item)}
      style={styles.container}>
      <View
        style={[
          styles.square,
          selected ? styles.squareSelected : styles.squareUnselected,
        ]}>
        {renderImage()}
        {selected && <View style={styles.border} />}
      </View>
      <Text
        size={TextSizes.xxsmall}
        align={TextAligns.center}
        weight={selected ? TextWeights.bold : TextWeights.bold}
        color={selected ? Colors.primary : Colors.gray}
        style={styles.label}>
        {isAddCategory ? 'Adicionar categoria' : item.name}
      </Text>
    </PressableOpacity>
  );
};
